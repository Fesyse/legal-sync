"use client";

import { LayoutGrid, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

type UserNavProps = {
  className?: string;
};

export function UserNav({ className }: UserNavProps) {
  const { data } = authClient.useSession();
  const router = useRouter();
  const user = data?.user;

  const sign = async (type: "out" | "in") => {
    if (type === "out") {
      await authClient.signOut();
      toast.success(`Успешно вышли из системы.`);

      router.push("/");
    } else router.push("/auth/sign-in");
  };

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn("relative h-8 w-8 rounded-full", className)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    className={cn("h-full w-full", {
                      "dark:invert": !user?.image,
                    })}
                    src={user?.image ?? "/user.svg"}
                    alt="Avatar"
                    width={32}
                    height={32}
                  />
                  <AvatarFallback>
                    {(user?.name ?? "гость").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Открыть меню пользователя</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Профиль</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent
        className="font-comfortaa w-56"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {user?.name ?? "Гость"}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email ?? "---"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="text-muted-foreground mr-3 h-4 w-4" />
              Дашборд
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ModeToggle expanded className="dark:bg-transparent" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => (user ? sign("out") : sign("in"))}
          >
            {user ? (
              <>
                <LogOut className="text-muted-foreground mr-3 h-4 w-4" />
                Выйти
              </>
            ) : (
              <>
                <LogIn className="text-muted-foreground mr-3 h-4 w-4" />
                Войти
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
