"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiGeminiFill } from "react-icons/ri";
import { NavUser } from "./nav-user";
import { useSidebarNav } from "./sidebar";

export function AppMainSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { navMain } = useSidebarNav();
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
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
                  <div key={block.title} className="flex flex-col gap-5">
                    <SidebarMenuItem
                      className="text-foreground/70 font-medium"
                      key={block.title}
                    >
                      <SidebarMenuButton className="px-2.5 text-xs md:px-2">
                        <block.icon />
                        {block.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <ul className="flex flex-col gap-3">
                      {!!block.items?.length ? (
                        block.items.map((item) => (
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
                      ) : (
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
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
