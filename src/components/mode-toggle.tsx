"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";

type ThemeToggleProps = {
  expanded?: boolean;
  iconSize?: number;
  className?: string;
  iconClassName?: string;
};

export function ModeToggle({
  iconSize = 16,
  expanded = false,
  className,
  iconClassName,
}: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={expanded ? "default" : "icon"}
          className={cn(
            {
              "flex h-auto w-full items-center justify-start gap-3 rounded-sm border-0 !px-2 py-2":
                expanded,
            },
            className,
          )}
        >
          <SunIcon
            width={iconSize}
            height={iconSize}
            className={cn(
              "scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
              {
                "text-muted-foreground mr-3": expanded,
              },
              iconClassName,
            )}
          />
          <MoonIcon
            width={iconSize}
            height={iconSize}
            className={cn(
              "absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
              {
                "text-muted-foreground mr-3": expanded,
              },
              iconClassName,
            )}
          />
          {expanded ? "Поменять тему" : null}
          <span className="sr-only">Поменять тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={expanded ? "start" : "end"}
        className="w-[215px]"
      >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Темная
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Системная
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
