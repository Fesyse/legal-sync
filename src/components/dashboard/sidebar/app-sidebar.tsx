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
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardNavUser } from "./nav-user";
import { useSidebarNav } from "@/lib/sidebar";
import { Icons } from "@/components/ui/icons";

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
                <Icons.logo className="ml-2" />
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
                      {block.isLoading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <SidebarMenuItem key={i}>
                              <SidebarMenuSkeleton showIcon />
                            </SidebarMenuItem>
                          ))
                        : block.items?.length
                          ? block.items.map((item) => (
                              <SidebarMenuItem key={item.url}>
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
