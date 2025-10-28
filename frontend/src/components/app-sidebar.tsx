import * as React from "react"
import {
  IconHome,
<<<<<<< HEAD
  IconListDetails,
=======
>>>>>>> main
  IconBubbleText,
  IconClipboardData,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import "@/components/sidebar.css"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

<<<<<<< HEAD
const data = {
  user: {
    name: "adam",
    email: "a-jones@make-it-all.co.uk",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconHome,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Forums",
      url: "#",
      icon: IconBubbleText,
    },
    {title: "To-do List",
      url: "#",
      icon: IconClipboardData,
    }
  ],
}
=======
import { useAuth } from "@/context/AuthContext"
>>>>>>> main

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = useAuth();
  
  const data = {
    user: {
      id : user?.id || -1,
      name: user?.name || "Guest",
      email: user?.email || "guest@make-it-all.co.uk",
      avatar: user?.avatar || "/avatars/default.jpg",
      permission : user?.permission || "Employee",
    },
    navMain: [
      { title: "Dashboard", url: "/dashboard", icon: IconHome },
      { title: "Forums", url: "/dashboard/forum", icon: IconBubbleText },
      { title: "To-do List", url: "/dashboard/todo", icon: IconClipboardData },
    ],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-6 ">
        <div className="flex items-center logo font-[500] text-[24px] flex h-[20px] w-60">
          <img src="/assets/hardwareicon.png" className='w-6 h-6 mb-0' />
          <h1 className='headerfont font ml-[2px] mr-[2px] mb-0 text-center'>Make-It-All</h1>
<<<<<<< HEAD
          <img src="/assets/hardwareicon.png" className='w-6 h-6 mb-0'/>
=======
          <img src="/assets/hardwareicon.png" className='w-6 h-6 mb-0' />
>>>>>>> main
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
