
import {
  BarChart,
  Bar,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  ReferenceDot,
  LabelList,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useState } from "react";

import { ArrowDown, ChartLine } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },

} satisfies ChartConfig

import projectData from "@/data/projectData.json";
import taskData from "@/data/taskData.json";
import { useAuth } from "@/context/AuthContext";



export function ProjectCharts() {

  const account = useAuth().user;
  let projectsAllowed = [];
  if (account?.permission == "Manager") {
    projectsAllowed = projectData;
  }
  else if (account?.permission == "Leader") {
    projectsAllowed = projectData.filter((project) => project.leader === account.id);
  }
  else {
    return (null);
  }
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(projectsAllowed[0])

  //User validation here

  //sorting data to get required info for graphs
  let project = projectsAllowed.find((project) => project.id === value.id); //And user is part of the project

  let projectTasks = taskData.filter((task) => task?.project === project?.id);
  let chartData = projectTasks.map((task) => {
    return {
      title: task.title,
      assignee: task.assignee,
      status: task.status,
      urgency: task.urgency,
      completed: task.completed
    }
  });


  //Line chart data
  let completedTasks = chartData.filter((task) => task.completed != null).map((task) => {
    return {
      date: task.completed!,
      completedCount: 1
    }
  });
  let lineArray = [
    { date: project?.posted, completedCount: 0 },
    { date: project?.deadline, completedCount: null },
  ];

  let completedColour = "#0000ff";
  let indexSub = 1;

  if (project?.completed !== null) {
    lineArray.splice(1, 0, { date: project?.completed!, completedCount: chartData.length });
    lineArray.find((task) => task.date === project?.deadline)!.completedCount = chartData.length
    indexSub = 2;
    completedColour = "#00ff00";
  }


  for (let i = 0; i < completedTasks.length; i++) {
    lineArray.splice(lineArray.length - indexSub, 0, completedTasks[i]);
    lineArray[lineArray.length - (indexSub + 1)].completedCount! = lineArray[lineArray.length - (indexSub + 1)].completedCount! + lineArray[lineArray.length - (indexSub + 2)].completedCount!;
  };


  //bar chart data
  let urgencyList = [
    { label: "Low", urgencyCount: 0 },
    { label: "Medium", urgencyCount: 0 },
    { label: "High", urgencyCount: 0 },
  ];

  for (let i = 0; i < chartData.length; i++) {
    let tempObject = urgencyList.find((level) => level.label === chartData[i].urgency);
    let listIndex = urgencyList.indexOf(tempObject!);
    urgencyList[listIndex].urgencyCount += 1;
  }

  return (
    <Card className="autoitems-centre @container/card">
      <CardHeader className="flex items-center justify-between gap-4">
        <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-2xl flex items-center gap-2">
          <Badge
            variant="outline"
            className="px-0 py-0.5 text-xs [&>svg]:size-7 border-none"
          >
            <ChartLine />
          </Badge>
          Current project: {project?.title}
        </CardTitle>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between max-w-full w-fit whitespace-normal break-words"
            >
              {projectsAllowed.find((project) => project.id === value.id)?.title!}
              <ArrowDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search projects..." className="h-9" />
              <CommandList>
                <CommandEmpty>No project found.</CommandEmpty>
                <CommandGroup>
                  {projectsAllowed.map((project) => (
                    <CommandItem
                      key={project.id}
                      value={project.title}
                      onSelect={() => {
                        setValue(project)
                        setOpen(false)
                      }}
                    >
                      {project.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent>
        <CardDescription>{project?.completed !== null ? "This project has been completed." :
          "This project is in progress."}</CardDescription>
        <CardDescription>{project?.posted} - {project?.deadline}</CardDescription>
        {/* <Card className="@container/card"> */}
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={lineArray}
            margin={{
              top: 25,
              bottom: 25,
              left: 25,
              right: 25,
            }}
          >
            <CartesianGrid vertical={false} />
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
              fill="#00ff00"
              stroke="none"
            />
          </LineChart>
        </ChartContainer>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={urgencyList}
            margin={{
              top: 25,
              bottom: 25,
              left: 25,
              right: 25,
            }}
          >
            <XAxis
              dataKey="label"
              label={{ value: "Urgency level", position: "insideBottom", offset: -5 }}
              tickMargin={5}
              tickLine={false}
              axisLine={true}
              tickFormatter={(value) => value}
            />
            <Bar
              dataKey="urgencyCount"
              fill="#33ff00e8"
            >
              <LabelList dataKey="urgencyCount" position="top" fontSize={18} />
            </Bar>
          </BarChart>
        </ChartContainer>
        {/* </Card> */}
      </CardContent>

    </Card>
  )
}
