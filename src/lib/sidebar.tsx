"use client";

import { api } from "@/trpc/react";
import {
  ClipboardCheck,
  File,
  History,
  HomeIcon,
  Keyboard,
  LayoutDashboard,
  Pointer,
  SquareDashedBottom,
} from "lucide-react";
import { RiQuestionLine, RiTaskLine } from "react-icons/ri";

export const useSidebarNav = () => {
  const { data: technicalSpecifications, isLoading } =
    api.technicalSpecification.getAll.useQuery();

  return {
    navMain: [
      {
        title: "Дашборд",
        icon: LayoutDashboard,
        items: [
          {
            title: "Домашняя",
            url: "/dashboard",
            icon: SquareDashedBottom,
          },
          // Страница на которой отображается ваше ТЗ и НПА-шки
          {
            title: "Технические задания",
            url: "/dashboard/history",
            icon: History,
          },
          {
            title: "Задать вопрос AI",
            url: "/dashboard/ask",
            icon: RiQuestionLine,
          },
        ],
      },
      {
        title: "Обучение",
        icon: HomeIcon,
        items: [
          {
            title: "Как пользоваться сервисом?",
            url: "/dashboard/getting-started#usage",
            icon: Pointer,
          },
          {
            title: "Что такое НПА?",
            url: "/dashboard/getting-started#npa",
            icon: File,
          },
          {
            title: "Горячие клавиши",
            url: "/hotkeys",
            icon: Keyboard,
          },
        ],
      },
      {
        title: "Тех. задания",
        icon: RiTaskLine,
        isLoading,
        items: technicalSpecifications?.map((item) => ({
          title: item.title,
          url: `/dashboard/task/${item.id}`,
          icon: ClipboardCheck,
        })),
      },
    ],
  };
};
