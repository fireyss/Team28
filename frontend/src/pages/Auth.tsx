import { Hammer } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex justify-between items-center w-full">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <Hammer className="size-4" />
              </div>
              <h1 className='headerfont font ml-[2px] mr-[2px] mb-0 text-center' style={{fontSize: "1.5em", fontFamily: "Zodiak-Variable"}}>Make it all.</h1>
              
            </a>

            <ModeToggle />
          </div>

        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="/assets/Make-It-All.png"
          alt="Make It All background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </div>
  );
}
