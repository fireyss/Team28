
import {BarChart, 
  Bar, 
  CartesianGrid, 
  Line, 
  LineChart, 
  ReferenceLine, 
  XAxis, 
  YAxis,
  ReferenceDot, 
  LabelList} from "recharts"

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


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  
} satisfies ChartConfig

import projectData from "@/data/projectData.json";
import taskData from "@/data/taskData.json";
import { useState } from "react";

export function ChartLineDefault() {
  

  //User validation here

  //sorting data to get required info for graphs
  let project = projectData.find((data) => data.id === 5); //And user is part of the project

  let projectTasks = taskData.filter((task) => task?.project === project?.id);
  let chartData = projectTasks.map((task) => {return {title: task.title, 
              assignee: task.assignee, 
              status: task.status, 
              urgency: task.urgency,
              completed: task.completed}} );


  //Line chart data
  let completedTasks = chartData.filter((task) => task.completed != null).map((task) => {return {date: task.completed!, 
                                completedCount: 1}});
  let lineArray = [
    {date: project?.posted, completedCount: 0},
    {date: project?.deadline, completedCount: null},
  ];

  let completedColour = "#0000ff";
  let indexSub = 1;

  if(project?.completed !== null){
      lineArray.splice(1, 0, {date: project?.completed!, completedCount: chartData.length});
      lineArray.find((task) => task.date === project?.deadline)!.completedCount = chartData.length
      indexSub = 2;
      completedColour = "#00ff00";
  }


  for(let i = 0; i<completedTasks.length; i++){
    lineArray.splice(lineArray.length - indexSub, 0, completedTasks[i]);
    lineArray[lineArray.length - (indexSub+1)].completedCount! =  lineArray[lineArray.length - (indexSub+1)].completedCount! + lineArray[lineArray.length - (indexSub + 2)].completedCount!;
  };
  console.log(3);
  console.log(completedTasks.length)
  console.log(completedTasks);
  console.log(lineArray);


  //bar chart data
  let urgencyList = [
    {label: "Low", urgencyCount: 0},
    {label: "Medium", urgencyCount: 0},
    {label: "High", urgencyCount: 0},
  ];
  
  for(let i = 0; i < chartData.length; i++){
    let tempObject = urgencyList.find((level) => level.label === chartData[i].urgency);
    let listIndex = urgencyList.indexOf(tempObject!);
    urgencyList[listIndex].urgencyCount += 1;
  }
  console.log(urgencyList)


  return (
    <Card className="mb-5 @container/card">
      <CardHeader>
        <CardTitle>Project: {project?.title}</CardTitle>
        <CardDescription>{project?.posted} - {project?.deadline}</CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="max-w-2xl">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={lineArray}
            margin={{
              left: 25,
              right: 15,
            }}
            
          >
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              type="number"
              hide={true}
              domain={[0, chartData.length + 1]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              label="Completed tasks"
              dataKey="completedCount"
              type="bump"
              stroke={completedColour}
              strokeWidth={2}
              dot={false}
            />
            <ReferenceLine 
            x={lineArray[lineArray.length - 1].date!}
            strokeWidth={2}
            stroke="#ff000080"
            />
            <ReferenceDot 
              x={lineArray[lineArray.length - 1].date!} 
              y={chartData.length} 
              r={5} 
              fill="#00ff0080" 
              stroke="none"
              />
            </LineChart>
        </ChartContainer>
        </Card>
        <Card className="max-w-2xl">
        <ChartContainer config={chartConfig} className="max-w-xl"   >
          <BarChart
          accessibilityLayer
          data={urgencyList}
          margin={{
            top: 25,
            left: 15,
            bottom: 10}}
          >
            <XAxis
              dataKey="label"
              label={{value: "Urgency level", position: "insideBottom", offset:-5}}
              tickMargin={5}
              tickLine={false}
              axisLine={true}
              tickFormatter={(value) => value}
            />
            {/* <YAxis
              type="number"
              hide={true}
              domain={[0, barYAxisMax+1]} 
            />*/}
            <Bar
            dataKey="urgencyCount"
            fill="#00ff00"
            >
              <LabelList dataKey="urgencyCount" position="top" fontSize={18}/>
            </Bar>
          </BarChart>
        </ChartContainer>
        </Card>
      </CardContent>
      <CardFooter>
          <CardDescription>{project?.completed !== null ? "This project has been completed." :
           "This project is in progress."}</CardDescription>
      </CardFooter>
    </Card>
  )
}
