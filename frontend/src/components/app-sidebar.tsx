import * as React from "react"
import {
  IconHome,
  IconHelp,
  IconListDetails,
  IconBubbleText,
  IconClipboardData,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
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
    {
      title: "To-do List",
      url: "#",
      icon: IconClipboardData,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-6 flex items-center">
        <div className="logo font-[500] text-[30px] flex justify-center border-b-4 border-black h-[40px] w-60">
          <img src="src/assets/hardwareicon.png" className='w-10 h-10 mb-0' />
          <h1 className='font-roboto ml-[0.5px] mr-[0.5px] mb-0 text-center'>Make-It-All</h1>
          <img src="src/assets/hardwareicon.png" className='w-10 h-10 mb-0' />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div>
          <hr />
          <div id="help" className='ml-1 mb-2 mt-5 flex items-center optiontransition'>
            <IconHelp className='w-7 h-7' />
            <h1 className='text-[16px] ml-2'>Help</h1>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>

  )
}
