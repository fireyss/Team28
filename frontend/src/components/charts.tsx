

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"; 

export const description = "A line chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

import projectData from "@/data/projectData.json";
import taskData from "@/data/taskData.json";
import { useState } from "react";
import { int } from "zod";

export function ChartLineDefault() {
  //sorting data to get required info for graphs

  //User validation here


  let project = projectData.find((data) => data.id === 5); //And user is part of the project
  console.log(project);

  let taskList = taskData.filter((task) => task?.project === project?.id);
  let graphData = taskList.map((task) => {return {title: task.title, 
              assignee: task.assignee, 
              status: task.status, 
              urgency: task.urgency,
              completed: task.completed}} );
  ///
  let completedTasks = graphData.filter((data) => data.completed != null);
  let tasksArray = [
    {date: project?.posted, completedCount: 0},
    {date: project?.deadline, completedCount: null},
  ];

  let completedColour = "#0000ff";
  let indexSub = 1;
  if(project?.completed != null){
      tasksArray.splice(1, 0, {date: project?.completed!, completedCount: graphData.length});
      tasksArray.find((task) => task.date === project?.deadline)!.completedCount = graphData.length
      indexSub = 2;
      completedColour = "#00ff00";
  }
  let hi = "11/02/25";
  let bello = hi.slice(3, 6) + hi.slice(0, 3) + hi.slice(6);
  console.log(tasksArray);
  //console.log(bello);
  //let hello = project?.completed!.slice(3, 6) + project?.completed!.slice(0, 3)! + project?.completed!.slice(6);
  //console.log(project?.completed!)
  //console.log(hello)

  console.log(tasksArray);

  let thisTest = [
    {
      date: project?.deadline, total: taskList.length
    },
    // {
    //   date: project?.deadline, total: taskList.length
    // }
  ]
  //tasksArray.push({date: completedTasks[0].completed!, completedCount: 1});
  //for loop here
  // for (let i = 0; i < completedTasks.length; i++){
  //   if 
  // }
  let tempArray = completedTasks.map((task) => {return {date: task.completed!, 
                                completedCount: 1}});
  //console.log(tempArray);
                        
  for(let i = 0; i<tempArray.length; i++){
    tasksArray.splice(tasksArray.length - indexSub, 0, tempArray[i]);
    tasksArray[tasksArray.length - indexSub].completedCount! =  tasksArray[tasksArray.length-indexSub].completedCount! + tasksArray[tasksArray.length-(indexSub + 1)].completedCount!;
  };
  //const test = tasksArray.concat(hello);
  //completedTasks.push({})
  //console.log(completedTasks);
  //console.log(tasksArray);
  //console.log(completedTasks.map((task) => {return {date: task.completed, completedCount: completedNo + 1}}));
  //console.log(hello);
  //console.log(taskList);
  //console.log(taskList.map((task) => {return {taskTitle: task.title, taskAssignee: task.assignee}} ));

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Project: {project?.title}</CardTitle>
        <CardDescription>{project?.posted} - {project?.deadline}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={tasksArray}
            margin={{
              left: 25,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            {/* <Line
              data={thisTest}
              dataKey="total"
              type="linear"
              connectNulls={true}
              dot={false}
            /> */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            {/* <YAxis 
              tickMargin={8}
              tickLine={false} 
              axisLine={false} 
              domain={[0, taskList.length + 1]} /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              label="Completed tasks"
              dataKey="completedCount"
              type="bump"
              stroke={completedColour}
              color= {completedColour}
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
            <ReferenceLine 
            x={thisTest[0].date!}
            stroke="#6f1e1eff"
            strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
          <CardDescription>{project?.completed !== null ? "This project has been completed." : "This project is in progress."}</CardDescription>
      </CardFooter>
    </Card>
  )
}
