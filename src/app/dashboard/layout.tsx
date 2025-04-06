import { AppMainSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";
import { TaskTitle } from "./task/[id]/task-title";
import { CommandMenu } from "@/components/command-menu";
import { api, HydrateClient } from "@/trpc/server";

export default function DashboardLayout({ children }: PropsWithChildren) {
  void api.technicalSpecification.getAll.prefetch();

  return (
    <HydrateClient>
      <SidebarProvider>
        <AppMainSidebar />
        <SidebarInset className="bg-noise">
          <header className="bg-background/50 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
            <TaskTitle />
            <div className="w-12"></div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <CommandMenu />
    </HydrateClient>
  );
}
