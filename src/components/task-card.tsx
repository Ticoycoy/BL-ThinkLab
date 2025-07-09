"use client";

import type { Task, TaskStatus } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit, CheckCircle2, XCircle } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const statusConfig: Record<TaskStatus, { color: "green" | "blue" | "yellow", label: string }> = {
    done: { color: "green", label: "Done" },
    'in-progress': { color: "blue", label: "In Progress" },
    todo: { color: "yellow", label: "To Do" },
};


export function TaskCard({ task, onUpdate, onDelete, onEdit }: TaskCardProps) {
  const handleStatusChange = (status: TaskStatus) => {
    onUpdate({ ...task, status });
  };
  
  const isOverdue = !task.deadline ? false : new Date() > task.deadline && task.status !== 'done';
  const config = statusConfig[task.status];
  
  return (
    <Card className={cn(
        "transition-all", 
        task.status === 'done' ? 'bg-muted/60 opacity-80' : 'bg-card'
    )}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className={cn(
            "text-base font-medium leading-snug transition-all",
            task.status === 'done' && 'line-through text-muted-foreground'
          )}>
          {task.name}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center text-sm">
            <div className={cn(
                "flex items-center text-muted-foreground",
                 isOverdue && "text-destructive font-medium"
            )}>
              <p>{format(task.deadline, 'MMM d, yyyy')}</p>
              <span className="mx-1.5">•</span>
              <p>({formatDistanceToNow(task.deadline, { addSuffix: true })})</p>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
            <Badge variant={task.status === 'done' ? 'secondary' : task.status === 'in-progress' ? 'default' : 'outline'}>
                {statusConfig[task.status].label}
            </Badge>

            <div>
                {task.status !== 'done' ? (
                     <Button size="sm" variant="ghost" onClick={() => handleStatusChange('done')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                        <CheckCircle2 className="h-4 w-4 mr-1"/> Mark as Done
                    </Button>
                ) : (
                    <Button size="sm" variant="ghost" onClick={() => handleStatusChange('todo')} className="text-muted-foreground hover:text-foreground">
                        <XCircle className="h-4 w-4 mr-1"/> Mark as To-do
                    </Button>
                )}
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
