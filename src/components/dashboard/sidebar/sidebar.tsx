import type { TechnicalSpecificationSchema } from "@/lib/schemas";
import {
  ClipboardCheck,
  File,
  History,
  Home,
  HomeIcon,
  LayoutDashboard,
  Pointer,
  SquareDashedBottom,
} from "lucide-react";
import { RiQuestionLine, RiTaskLine } from "react-icons/ri";

export const useSidebarNav = () => {
  const technicalSpecifications: TechnicalSpecificationSchema[] = [];
  return {
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
          {
            title: "Задать вопрос AI",
            url: "/dashboard/question",
            icon: RiQuestionLine,
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
      {
        title: "Тех. задания",
        icon: RiTaskLine,
        items: technicalSpecifications.map((item) => ({
          title: item.technicalSpecification,
          url: `/dashboard/task/${item.id}`,
          icon: ClipboardCheck,
        })),
      },
    ],
  };
};
