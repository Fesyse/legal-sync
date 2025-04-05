import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { UserNav } from "@/components/user-nav";

export const Header = async () => {
  return (
    <header className="border-b-border flex items-center justify-between gap-4 p-4">
      <Link href={"/"}>
        <Icons.logo />
      </Link>
      <UserNav />
    </header>
  );
};
