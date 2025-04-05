import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { VersionSwitcher } from "@/components/version-switcher";

type DataType = {
  versions: string[];
  navMain: {
    title: string;
    url: string;
    items: {
      title: string;
      url: string;
      isActive?: boolean;
    }[];
  }[];
};

// This is sample data.
const data: DataType = {
  versions: [
    "gemini-2.0-flash-001",
    "gemini-2.0-flash-lite-001",
    "gemini-flash-1.5-8b",
    "gemini-pro-1.5",
  ],
  navMain: [
    {
      title: "Основное",
      url: "/",
      items: [
        {
          title: "Главная",
          url: "/",
        },
        {
          title: "Войти",
          url: "/auth/sign-in",
        },
      ],
    },
    {
      title: "Начало работы",
      url: "/dashboard/getting-started",
      items: [
        {
          title: "Что такое НПА?",
          url: "/dashboard/getting-started#npa",
        },
        {
          title: "Как пользоваться сервисом?",
          url: "/dashboard/getting-started#usage",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]!}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item?.isActive!}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
