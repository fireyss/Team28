import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { LogOutIcon } from "lucide-react"

import { useAuth } from "@/context/AuthContext"

export function SiteHeader() {
  const location = useLocation()
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return ""
      case "/dashboard":
        return "Dashboard"
      case (location.pathname.startsWith("/dashboard/forum") && location.pathname):
        return "Forums"
      case (location.pathname.startsWith("/dashboard/todo") && location.pathname):
        return "To-do List"
      default:
        return ""
    }
  }
  const { logout } = useAuth();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getTitle()}</h1>

        <Button variant="outline" size="icon" className="ml-auto" onClick={logout}>
          <LogOutIcon />
        </Button>
      </div>
    </header>
  )
}
