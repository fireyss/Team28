"use client"
import { Badge } from "@/components/ui/badge"
import { IconBubbleText } from "@tabler/icons-react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import FourmData from "@/data/forumData.json"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
    <div className="m-2">
      <Card className="overflow-x-auto w-full">
        <CardContent className="min-w-full">
          <div className="min-w-[800px]">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                width={Math.max(chartData.length * 80, 800)}
                height={300}
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
                <Bar dataKey="Informational" fill="var(--color-Informational)" radius={2} />
                <Bar dataKey="QA" fill="var(--color-QA)" radius={2} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
