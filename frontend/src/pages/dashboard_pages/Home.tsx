import { SectionCards } from "@/components/section-cards";
import { ChartPieSimple } from "@/components/training-pie-chart";

import {
  IconHome,
  IconBubbleText,
  IconClipboardData,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { useAuth } from "@/context/AuthContext"

export default function Home() {
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
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="flex gap-6 m-6 items-center">
      <Avatar className="h-16 w-16 radius-20 grayscale">
        <AvatarImage src={data.user.avatar} alt={data.user.name} />
        <AvatarFallback className="radius-20">{data.user.name.toUpperCase().substring(0,2)}</AvatarFallback>
      </Avatar>
        <h1 className="text-[24px]">Welcome back {data.user.name}. We've got some work to do</h1>
      </div>
      <SectionCards />
      <ChartPieSimple />
    </div>
  );  
}
