import {
  LucideText,
  LucideClipboardList,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DashboardTaskCard from "@/components/todolistdashboardver"
import "@/components/todolistdashboardver.css"
import RecentForums from "@/components/recentforumposts"
import { ChartBarMultiple } from "@/components/training-bar-chart"
import { ProjectCharts } from "@/components/charts"
import { DashboardTaskDivisionCard } from "@/components/task-division"
import { useAuth } from "@/context/AuthContext"

export function SectionCards() {
  const user = useAuth().user!
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">

        <Card className="@container/card">
          <CardHeader className="flex pb-0">
            <Badge variant="outline" className="px-0 py-0.5 text-xs [&>svg]:size-7 border-none">
              <LucideClipboardList />
            </Badge>
            <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-2xl">
              Your current tasks
            </CardTitle>
          </CardHeader>
          <hr className="w-[calc(100%-20px)] mx-auto" />
          <div className="tasktodolist overflow-y-auto max-h-[350px] items-center">
            <DashboardTaskCard />
          </div>
          <hr className="w-[calc(100%-20px)] mx-auto" />
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              <Link to="/dashboard/todo">
                View or manage all tasks
              </Link>
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="flex">
            <Badge variant="outline" className="px-0 py-0.5 text-xs [&>svg]:size-7 border-none">
              <LucideText />
            </Badge>
            <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-2xl">
              Recent Forum posts
            </CardTitle>
          </CardHeader>
          <hr className="w-[calc(100%-20px)] mx-auto" />
          <div className="tasktodolist overflow-y-auto max-h-[350px] items-center">
            <RecentForums />
          </div>
          <hr className="w-[calc(100%-20px)] mx-auto" />
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              <Link to="/dashboard/forum">
                See all forum posts
              </Link>
            </div>
          </CardFooter>
        </Card>

        {user.permission == "Manager" && <Card className="@container/card mb-auto">
          <CardHeader className="flex">
            <Badge variant="outline" className="px-0 py-0.5 text-xs [&>svg]:size-7 border-none">
              <LucideText />
            </Badge>
            <div>
              <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-2xl">
                Areas for training
              </CardTitle>

              <CardDescription>
                Based on proportion of forum posts marked as "Q&A"
              </CardDescription>
            </div>
          </CardHeader>

          <div className="tasktodolis items-center w-full">
            <ChartBarMultiple />
          </div>
          <CardFooter className=" items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              <Link to="/dashboard/forum">
                See all forum posts
              </Link>
            </div>
          </CardFooter>
        </Card>}

        <ProjectCharts />
      </div>
    </>
  )
}
