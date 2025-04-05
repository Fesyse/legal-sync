"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiGeminiFill } from "react-icons/ri";
import { DashboardNavUser } from "./nav-user";
import { useSidebarNav } from "./sidebar";

export function AppMainSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { navMain } = useSidebarNav();
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <RiGeminiFill className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Legal Sync</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu className="flex flex-col gap-7">
              {navMain.map((block) => {
                return (
                  <div key={block.title} className="flex flex-col">
                    <SidebarGroupLabel>{block.title}</SidebarGroupLabel>
                    <ul className="flex flex-col gap-2">
                      {!!block.items?.length
                        ? block.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton
                                asChild
                                tooltip={{
                                  children: item.title,
                                  hidden: false,
                                }}
                                isActive={pathname === item.url}
                                className="px-2.5 md:px-2"
                              >
                                <Link href={item.url}>
                                  <item.icon />
                                  <span>{item.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))
                        : open && (
                            <span className="text-foreground/50 px-2 text-xs">
                              Нет доступных пунктов
                            </span>
                          )}
                    </ul>
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardNavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
