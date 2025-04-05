import {
  File,
  History,
  Home,
  HomeIcon,
  LayoutDashboard,
  Pointer,
  SquareDashedBottom,
} from "lucide-react";

export const sidebarNav = {
  navMain: [
    {
      title: "Панель управления",
      icon: LayoutDashboard,
      items: [
        {
          title: "Домашняя",
          url: "/dashboard",
          icon: SquareDashedBottom,
          isActive: true,
        },
        // Страница на которой отображается ваше ТЗ и НПА-шки
        {
          title: "История",
          url: "/dashboard/history",
          icon: History,
        },
      ],
    },
    {
      title: "Основное",
      icon: HomeIcon,
      items: [
        {
          title: "Главная",

          url: "/",
          icon: Home,
          isActive: true,
        },
        {
          title: "Что такое НПА?",
          url: "/dashboard/getting-started#npa",
          icon: File,
        },
        {
          title: "Как пользоваться сервисом?",
          url: "/dashboard/getting-started#usage",
          icon: Pointer,
        },
      ],
    },
  ],
};
