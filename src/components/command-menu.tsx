"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun } from "lucide-react";
import { defaultSidebar } from "@/lib/sidebar";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => () => {
    command();
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Введите название странице..." />
      <CommandList>
        <CommandEmpty>Не найдено</CommandEmpty>
        {defaultSidebar.navMain.map((group) => (
          <CommandGroup key={group.title} heading={`${group.title}`}>
            {group.items.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={runCommand(() => router.push(item.url))}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandSeparator />
        <CommandGroup heading="Тема">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun />
            Светлая
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon />
            Тёмная
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Laptop />
            Системная
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
