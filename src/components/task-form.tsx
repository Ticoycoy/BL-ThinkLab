"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import type { Task, Team } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TEAMS: Team[] = ['Research Team', 'Connection Team', 'Special task team'];

const taskSchema = z.object({
  name: z.string().min(3, "Task name must be at least 3 characters long."),
  deadline: z.date({ required_error: "A deadline is required." }),
  dependencies: z.array(z.string()).optional(),
  team: z.enum(TEAMS, { required_error: "A team is required." }),
  currentCount: z.coerce.number().min(0, "Current count cannot be negative.").default(0),
  expectedCount: z.coerce.number().min(1, "Expected count must be at least 1."),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: Omit<Task, 'id' | 'status'> | Task) => void;
  taskToEdit?: Task;
  allTasks: Task[];
}

export function TaskForm({ isOpen, setIsOpen, onSubmit, taskToEdit, allTasks }: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      dependencies: [],
      currentCount: 0,
      expectedCount: 1,
    },
  });

  useEffect(() => {
    if (taskToEdit) {
      form.reset({
        name: taskToEdit.name,
        deadline: taskToEdit.deadline,
        dependencies: taskToEdit.dependencies,
        team: taskToEdit.team,
        currentCount: taskToEdit.currentCount,
        expectedCount: taskToEdit.expectedCount,
      });
    } else {
      form.reset({
        name: "",
        deadline: undefined,
        dependencies: [],
        team: undefined,
        currentCount: 0,
        expectedCount: 1,
      });
    }
  }, [taskToEdit, isOpen, form]);

  const handleSubmit = (data: TaskFormValues) => {
    if (taskToEdit) {
      onSubmit({ ...taskToEdit, ...data });
    } else {
      onSubmit(data as Omit<Task, 'id' | 'status'>);
    }
    setIsOpen(false);
  };
  
  const availableDependencies = allTasks.filter(task => task.id !== taskToEdit?.id);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{taskToEdit ? "Edit Task" : "Create Task"}</DialogTitle>
          <DialogDescription>
            {taskToEdit ? "Update the details of your task." : "Fill in the details for your new task."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Deploy to production" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TEAMS.map(team => (
                        <SelectItem key={team} value={team}>{team}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Count</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Count</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dependencies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dependencies</FormLabel>
                   <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="w-full justify-between font-normal">
                          {field.value && field.value.length > 0 ? `${field.value.length} selected` : "Select dependencies"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[375px] p-0">
                        <Command>
                          <CommandInput placeholder="Search tasks..." />
                          <CommandList>
                            <CommandEmpty>No tasks found.</CommandEmpty>
                            <CommandGroup>
                              {availableDependencies.map((task) => (
                                <CommandItem
                                  key={task.id}
                                  onSelect={() => {
                                    const selected = field.value || [];
                                    const newSelected = selected.includes(task.id)
                                      ? selected.filter((id) => id !== task.id)
                                      : [...selected, task.id];
                                    field.onChange(newSelected);
                                  }}
                                >
                                  <Checkbox checked={field.value?.includes(task.id)} className="mr-2" />
                                  <span>{task.name}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit">{taskToEdit ? "Save Changes" : "Create Task"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
