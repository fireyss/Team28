import * as React from "react"

import {
  LucideHome,
  LucideText,
  LucideClipboardList,
  LucideFolders,
  Hammer,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import "@/components/sidebar.css"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { useAuth } from "@/context/AuthContext"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = useAuth();

  const data = {
    user: {
      id: user?.id || -1,
      name: user?.name || "Guest",
      email: user?.email || "guest@make-it-all.co.uk",
      avatar: user?.avatar || "/avatars/default.jpg",
      permission: user?.permission || "Employee",
    },
    navMain: [
      { title: "Dashboard", url: "/dashboard", icon: LucideHome },
      { title: "Forums", url: "/dashboard/forum", icon: LucideText },
      { title: "To-do List", url: "/dashboard/todo", icon: LucideClipboardList },
      
    ],
  };
  if(data.user.permission !== "Employee"){
    data.navMain.push({ title: "Projects", url: "/dashboard/projects", icon: LucideFolders })
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-6 ">
        <div className="flex items-center space-x-2 logo font-[500] text-[24px] flex h-[25px] w-60">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Hammer className="size-4" />
          </div>
          <h1 className='headerfont font ml-[2px] mr-[2px] mb-0 text-center' style={{ fontSize: "1.1em", fontFamily: "Zodiak-Variable" }}>Make it all.</h1>
          {/* <img src="/assets/hardwareicon.png" className='w-6 h-6 mb-0' /> */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>

  )
}
