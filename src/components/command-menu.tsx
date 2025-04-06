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
} from "./ui/command";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const router = useRouter();
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Введите название странице..." />
      <CommandList>
        <CommandEmpty>Ничего не найдено.</CommandEmpty>
        <CommandGroup heading="">
          <CommandItem
            onClick={() => {
              router.push("/");
            }}
          >
            Главная
          </CommandItem>
          <CommandItem onClick={() => router.push("/dashboard/ask")}>
            Спросить AI
          </CommandItem>
          <CommandItem onClick={() => router.push("/dashboard")}>
            Личный кабинет
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
