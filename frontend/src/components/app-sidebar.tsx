import * as React from "react"
import {
  IconHome,
<<<<<<< HEAD
  IconHelp,
=======
>>>>>>> 3167e2596d9b3a55bcb7278c48c97fa42910182c
  IconListDetails,
  IconBubbleText,
  IconClipboardData,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
<<<<<<< HEAD
=======
import { NavUser } from "@/components/nav-user"
import "@/components/sidebar.css"
>>>>>>> 3167e2596d9b3a55bcb7278c48c97fa42910182c
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
<<<<<<< HEAD
=======
  user: {
    name: "adam",
    email: "a-jones@make-it-all.co.uk",
    avatar: "/avatars/shadcn.jpg",
  },
>>>>>>> 3167e2596d9b3a55bcb7278c48c97fa42910182c
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
<<<<<<< HEAD
      <SidebarHeader className="p-6 flex items-center">
        <div className="logo font-[500] text-[30px] flex justify-center border-b-4 border-black h-[40px] w-60">
          <img src="/assets/hardwareicon.png" className='w-10 h-10 mb-0'/>
          <h1 className='font-roboto ml-[0.5px] mr-[0.5px] mb-0 text-center'>Make-It-All</h1>
          <img src="/assets/hardwareicon.png" className='w-10 h-10 mb-0'/>
=======
      <SidebarHeader className="p-6 ">
        <div className="flex items-center logo font-[500] text-[24px] flex h-[20px] w-60">
          <img src="/assets/hardwareicon.png" className='w-6 h-6 mb-0'/>
          <h1 className='headerfont font ml-[2px] mr-[2px] mb-0 text-center'>Make-It-All</h1>
          <img src="/assets/hardwareicon.png" className='w-6 h-6 mb-0'/>
>>>>>>> 3167e2596d9b3a55bcb7278c48c97fa42910182c
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div>
          <hr />
          <div id="help" className='ml-1 mb-2 mt-5 flex items-center optiontransition'>
            <IconHelp className='w-7 h-7'/>
            <h1 className='text-[16px] ml-2'>Help</h1>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>

  )
}
