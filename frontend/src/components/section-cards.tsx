import {
  IconClipboardData,
  IconBubbleText,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DashboardTaskCard from "@/components/todolistdashboardver"
import "@/components/todolistdashboardver.css"
import RecentForums from "@/components/recentforumposts"
import { ChartBarMultiple } from "@/components/training-bar-chart"
export function SectionCards() {
  return (
    <>
      <div className="m-4">
        <Card className="@container/card">
          <CardHeader className="flex">
            <Badge variant="outline" className="px-0 py-0.5 text-xs [&>svg]:size-10 border-none">
              <IconBubbleText />
            </Badge>
            <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-2xl">
              Forum activity overview
            </CardTitle>
          </CardHeader>
          <hr className="w-[calc(100%-20px)] mx-auto" />
          <div className="tasktodolist max-h-[350px] h-[350px] items-center">
            <ChartBarMultiple />
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
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 w-full px-4">
        <Card className="@container/card">
          <CardHeader className="flex pb-0">
            <Badge variant="outline" className="px-0 py-0.5 text-xs [&>svg]:size-10 border-none">
              <IconClipboardData />
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
            <Badge variant="outline" className="px-0 py-0.5 text-xs [&>svg]:size-10 border-none">
              <IconBubbleText />
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


      </div>

    </>

  )
}
