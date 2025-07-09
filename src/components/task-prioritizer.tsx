"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getTaskSuggestions } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Sparkles } from 'lucide-react';
import type { Task } from '@/types';
import type { SuggestTaskPrioritizationOutput } from '@/ai/flows/suggest-task-prioritization';

interface TaskPrioritizerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  tasks: Task[];
}

export function TaskPrioritizer({ isOpen, setIsOpen, tasks }: TaskPrioritizerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestTaskPrioritizationOutput['prioritizedTasks'] | null>(null);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions(null);

    const tasksForAI = tasks
      .filter(t => t.status !== 'Done')
      .map(task => ({
        name: task.name,
        deadline: task.deadline.toISOString(),
    }));

    if (tasksForAI.length === 0) {
        toast({
            title: "No tasks to prioritize",
            description: "You have no active tasks to prioritize.",
            variant: "default",
        });
        setIsLoading(false);
        return;
    }

    const result = await getTaskSuggestions(tasksForAI);

    if (result.success) {
      setSuggestions(result.data);
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  
  React.useEffect(() => {
    if(isOpen) {
      handleGetSuggestions();
    } else {
        // Reset state when closed
        setSuggestions(null);
        setIsLoading(false);
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="text-primary"/>
            AI Task Prioritization
          </DialogTitle>
          <DialogDescription>
            Here's a suggested order for your tasks based on their deadlines.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Analyzing your tasks...</p>
            </div>
          ) : suggestions ? (
            <div className="max-h-[50vh] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Priority</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggestions.map((suggestion, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-bold text-lg text-center">{suggestion.priority}</TableCell>
                      <TableCell className="font-medium">{suggestion.name}</TableCell>
                      <TableCell className="text-muted-foreground">{suggestion.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center h-40 flex items-center justify-center">
              <p>Could not load suggestions. Please try again.</p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            <Button onClick={handleGetSuggestions} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                Regenerate
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
