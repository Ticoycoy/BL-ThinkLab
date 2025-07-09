"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/task-card";
import { TaskForm } from "@/components/task-form";
import { TaskPrioritizer } from "@/components/task-prioritizer";
import type { Task, TaskStatus, Team } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const statusDisplay: Record<TaskStatus, string> = {
  Pending: "Pending",
  Working: "Working",
  QA: "QA",
  Done: "Done",
};

const TEAMS: Team[] = ["Research Team", "Connection Team", "Special task team"];
const STATUS_ORDER: TaskStatus[] = ["Pending", "Working", "QA", "Done"];


export function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  
  const [isPrioritizerOpen, setPrioritizerOpen] = useState(false);
  const [activeTeam, setActiveTeam] = useState<Team>(TEAMS[0]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          assignee: data.assignee,
          deadline: (data.deadline as Timestamp).toDate(),
          status: data.status,
          team: data.team,
          currentCount: data.currentCount,
          expectedCount: data.expectedCount,
        } as Task;
      });
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async (task: Omit<Task, 'id' | 'status'>) => {
    try {
      await addDoc(collection(db, "tasks"), {
        ...task,
        status: 'Pending',
      });
    } catch (error) {
        console.error("Error adding task: ", error);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    const { id, ...taskData } = updatedTask;
    try {
      await updateDoc(doc(db, "tasks", id), taskData);
    } catch (error) {
        console.error("Error updating task: ", error);
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
        console.error("Error deleting task: ", error);
    }
  };
  
  const openEditForm = (task: Task) => {
    setTaskToEdit(task);
    setFormOpen(true);
  };
  
  const openNewForm = () => {
    setTaskToEdit(undefined);
    setFormOpen(true);
  }

  const columns = useMemo(() => {
    const cols: Record<TaskStatus, Task[]> = {
      Pending: [],
      Working: [],
      QA: [],
      Done: [],
    };
    tasks.filter(t => t.team === activeTeam).forEach((task) => {
       if (cols[task.status]) {
        cols[task.status].push(task);
      }
    });
    return cols;
  }, [tasks, activeTeam]);

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex gap-2">
            <Button onClick={openNewForm}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Task
            </Button>
            <Button variant="outline" onClick={() => setPrioritizerOpen(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              Prioritize
            </Button>
          </div>
        </div>

        <Tabs defaultValue={TEAMS[0]} onValueChange={(value) => setActiveTeam(value as Team)} className="mb-6">
            <TabsList>
                {TEAMS.map(team => <TabsTrigger value={team} key={team}>{team}</TabsTrigger>)}
            </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {STATUS_ORDER.map((status) => (
            <div key={status} className="bg-muted/50 rounded-lg p-4 h-full">
              <h3 className="font-semibold mb-4 text-lg">{statusDisplay[status]} ({columns[status].length})</h3>
              <div className="space-y-4">
                {columns[status].length > 0 ? (
                  columns[status]
                    .sort((a,b) => a.deadline.getTime() - b.deadline.getTime())
                    .map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                        onEdit={openEditForm}
                      />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No tasks here.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <TaskForm
        isOpen={isFormOpen}
        setIsOpen={setFormOpen}
        onSubmit={taskToEdit ? handleUpdateTask : handleAddTask}
        taskToEdit={taskToEdit}
      />
      
      <TaskPrioritizer
        isOpen={isPrioritizerOpen}
        setIsOpen={setPrioritizerOpen}
        tasks={tasks}
      />

    </main>
  );
}
