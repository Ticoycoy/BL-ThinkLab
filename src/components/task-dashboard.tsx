"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/task-card";
import { TaskForm } from "@/components/task-form";
import { TaskPrioritizer } from "@/components/task-prioritizer";
import type { Task, TaskStatus } from "@/types";

const statusDisplay: Record<TaskStatus, string> = {
  todo: "To Do",
  'in-progress': "In Progress",
  done: "Done",
};

export function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  
  const [isPrioritizerOpen, setPrioritizerOpen] = useState(false);

  useEffect(() => {
    const initialTasks: Task[] = [
      { id: '1', name: 'Design homepage mockups', deadline: new Date(new Date().setDate(new Date().getDate() + 5)), status: 'in-progress', dependencies: [] },
      { id: '2', name: 'Develop API for user authentication', deadline: new Date(new Date().setDate(new Date().getDate() + 7)), status: 'todo', dependencies: ['1'] },
      { id: '3', name: 'Setup database schema', deadline: new Date(new Date().setDate(new Date().getDate() + 3)), status: 'in-progress', dependencies: [] },
      { id: '4', name: 'Implement frontend login page', deadline: new Date(new Date().setDate(new Date().getDate() + 10)), status: 'todo', dependencies: ['2'] },
      { id: '5', name: 'Write documentation for API', deadline: new Date(new Date().setDate(new Date().getDate() + 14)), status: 'done', dependencies: ['2'] },
      { id: '6', name: 'Deploy application to staging', deadline: new Date(new Date().setDate(new Date().getDate() + 20)), status: 'todo', dependencies: ['4', '5'] },
    ];
    setTasks(initialTasks);
  }, []);

  const handleAddTask = (task: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      status: 'todo',
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
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
      todo: [],
      'in-progress': [],
      done: [],
    };
    tasks.forEach((task) => {
      cols[task.status].push(task);
    });
    return cols;
  }, [tasks]);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {(Object.keys(columns) as TaskStatus[]).map((status) => (
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
        allTasks={tasks}
      />
      
      <TaskPrioritizer
        isOpen={isPrioritizerOpen}
        setIsOpen={setPrioritizerOpen}
        tasks={tasks}
      />

    </main>
  );
}
