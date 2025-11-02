import { type Task } from "@/types/Task"
import taskData from "@/data/taskData.json"
import { type Project } from "@/types/Project"
import projectData from "@/data/projectData.json"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ArrowDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"

export function DashboardTaskDivisionCard() {
    
  const account = useAuth().user;
  let projectsAllowed = [];
  if (account?.permission == "Manager"){
    projectsAllowed = projectData;
  }
  else if(account?.permission == "Leader"){
    projectsAllowed = projectData.filter((project) => project.leader === account.id);
  }
  else{
    return(null);
  }
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(projectsAllowed[0])

  const taskmapping = projectData.reduce((map, project) => {
    map[project.id] = project;
    return map;
  }, {} as Record<number, Project>);

  const getstatus = (status: string) => {
    switch (status) {
      case "Done": return "default";
      case "In Process": return "secondary";
      case "In Review": return "outline";
      case "Todo": return "destructive";
      default: return "default";
    }
  };


  const geturgency = (urgency: string) => {
    switch(urgency) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "default";
    }
  }

  const currentusertasks = (taskData as Task[]).filter(
    (task) => task.assignee === account?.id && task.status !== "Done"
  );

  if (currentusertasks.length === 0) {
    return <div>You currently have no assigned tasks.</div>;
  }
  return (
    <div className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {projectsAllowed.find((project) => project.id === value.id)?.title!}
            <ArrowDown/>
          </Button>
        </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." className="h-9" />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projectsAllowed.map((projectsAllowed) => (
                <CommandItem
                  key={projectsAllowed.id}
                  value={projectsAllowed.title}
                  onSelect={(currentValue) => {
                    setValue(projectsAllowed)
                    setOpen(false)
                  }}
                > 
                  {projectsAllowed.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
      {currentusertasks.map((task) => {
        const project = taskmapping[task.project];
        return (
          <Card key={task.id} className="@container/card ml-[10px] w-[calc(100%-20px)]">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 ">
              <div className="space-y-1">
                {project && (
                  <CardDescription className="text-sm text-muted-foreground">
                    {project.title}
                  </CardDescription>
                )}
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-2 px-5 pt-0">
              <Badge variant={getstatus(task.status)}>
                Status: {task.status}
              </Badge>
              <Badge variant={geturgency(task.urgency)}>
                Urgency: {task.urgency}
              </Badge>
              <div className="text-xs text-muted-foreground ml-auto">
                Due: <span className="font-bold">{task.deadline}</span> 
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  );
}

