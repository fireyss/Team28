import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useLocation, Link } from "react-router-dom"
import { Button } from "./ui/button"
import { LogOutIcon } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { useAuth } from "@/context/AuthContext"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb"

export function SiteHeader() {
  const location = useLocation()
  const { logout } = useAuth()

  const pathnames = location.pathname.split("/").filter((x) => x)

  const getTitle = (segment: string) => {
    switch (segment) {
      case "dashboard":
        return "Dashboard"
      case "forum":
        return "Forum"
      case "todo":
        return "To-do List"
      default:
        return segment.charAt(0).toUpperCase() + segment.slice(1)
    }
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>

            {pathnames.map((name, index) => {
              const routeTo = "/" + pathnames.slice(0, index + 1).join("/")
              const isLast = index === pathnames.length - 1
              return (
                <BreadcrumbItem key={routeTo}>
                  {isLast ? (
                    <BreadcrumbPage>{getTitle(name)}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link to={routeTo}>{getTitle(name)}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={logout}>
            <LogOutIcon />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
