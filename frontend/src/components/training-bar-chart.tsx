"use client"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"
import FourmData from "@/data/forumData.json"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"
const chartData = FourmData.topics.map(t => ({ topic: t, QA: FourmData.posts.filter(p => p.topic === t && p.type == "Q&A").length, Informational: FourmData.posts.filter(p => p.topic === t && p.type === "Informational").length }))



const chartConfig = {
  Informational: {
    label: "Informational",
    color: "var(--chart-1)",
  },
  QA: {
    label: "QA",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarMultiple() {
  return (
    <div className="m-2 h-full">
      <Card className="overflow-x-auto w-full h-full">
        <CardContent className=" h-full">
          <div className=" h-full">
            <ChartContainer config={chartConfig} className=" h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  width={Math.max(chartData.length * 80, 800)}
                  height={100}
                  margin={{ top: 20, right: 30, left: 50, bottom: 60 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="topic"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="Informational" fill="var(--color-Informational)" radius={5} />
                  <Bar dataKey="QA" fill="var(--color-QA)" radius={5} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
