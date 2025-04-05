import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button } from "./button";
import { Icons } from "./icons";

export const Header = () => {
  return (
    <header className="border-b-border flex items-center justify-between gap-4 p-4">
      <Link href={"/"}>
        <Icons.logo />
      </Link>
      <div className="flex items-center gap-2">
        <Button asChild size={"sm"} className="text-xs">
          <Link href={"/auth/sign-in"}>Войти</Link>
        </Button>
        <Button asChild size={"sm"} className="text-xs" variant="outline">
          <Link href={"/auth/sign-up"}>Зарегистрироваться</Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};
