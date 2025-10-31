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

function DashboardTaskCard() {
  const { user } = useAuth()

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
    (task) => task.assignee === user?.id && task.status !== "Done"
  );

  if (currentusertasks.length === 0) {
    return <div>You currently have no assigned tasks.</div>;
  }
  return (
    <div className="space-y-4">
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

export default DashboardTaskCard;
