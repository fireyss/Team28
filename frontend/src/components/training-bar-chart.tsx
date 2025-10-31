"use client"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"
import ForumData from "@/data/forumData.json"
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
let chartData = ForumData.topics.map(
  t => ({
    topic: t, QA: ForumData.posts.filter(
      p => p.topic === t && p.type == "Q&A"
    ).length, Informational: ForumData.posts.filter(
      p => p.topic === t && p.type === "Informational"
    ).length
  })
)

chartData.sort((a, b) => {
  const aKey = a.Informational > 0
    ? a.QA / a.Informational
    : a.QA;
  const bKey = b.Informational > 0
    ? b.QA / b.Informational
    : b.QA;

  return bKey - aKey;
})

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
