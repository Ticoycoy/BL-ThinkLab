"use client";

import * as React from "react";
import type { Task, TaskStatus } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit, CheckSquare, User } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const statusConfig: Record<TaskStatus, { variant: "default" | "secondary" | "outline", label: string }> = {
    "Pending": { variant: "outline", label: "Pending" },
    "Working": { variant: "default", label: "Working" },
    "QA": { variant: "secondary", label: "QA" },
    "Done": { variant: "secondary", label: "Done" },
};

const ALL_STATUSES: TaskStatus[] = ["Pending", "Working", "QA", "Done"];

export function TaskCard({ task, onUpdate, onDelete, onEdit }: TaskCardProps) {
  const [isOverdue, setIsOverdue] = React.useState(false);
  const [relativeDeadline, setRelativeDeadline] = React.useState("");

  React.useEffect(() => {
    // This ensures time-sensitive calculations only run on the client, avoiding hydration mismatches.
    if (task.deadline) {
      setIsOverdue(new Date() > task.deadline && task.status !== 'Done');
      setRelativeDeadline(formatDistanceToNow(task.deadline, { addSuffix: true }));
    }
  }, [task.deadline, task.status]);
  
  const handleStatusChange = (status: TaskStatus) => {
    onUpdate({ ...task, status });
  };
  
  const progress = task.expectedCount > 0 ? (task.currentCount / task.expectedCount) * 100 : 0;
  
  return (
    <Card className={cn(
        "transition-all", 
        task.status === 'Done' ? 'bg-muted/60 opacity-80' : 'bg-card'
    )}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className={cn(
            "text-base font-medium leading-snug transition-all",
            task.status === 'Done' && 'line-through text-muted-foreground'
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
             <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <CheckSquare className="mr-2 h-4 w-4" />
                <span>Change Status</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {ALL_STATUSES.map(status => (
                    <DropdownMenuItem 
                      key={status} 
                      onClick={() => handleStatusChange(status)}
                      disabled={task.status === status}
                    >
                      {statusConfig[status].label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-4 space-y-3">
        <p className="text-sm text-muted-foreground break-words">{task.description}</p>
        <div className="flex items-center text-sm">
            <div className={cn(
                "flex items-center text-muted-foreground",
                 isOverdue && "text-destructive font-medium"
            )}>
              {task.deadline && <p>{format(task.deadline, 'MMM d, yyyy')}</p>}
              {relativeDeadline && <span className="mx-1.5">•</span>}
              {relativeDeadline ? <p>({relativeDeadline})</p> : null}
            </div>
        </div>
        <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{task.currentCount} / {task.expectedCount}</span>
            </div>
            <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-3 p-4 pt-0">
        <div className="flex justify-between items-center w-full">
            <Badge variant={statusConfig[task.status].variant}>
                {statusConfig[task.status].label}
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">{task.team}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{task.assignee}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
