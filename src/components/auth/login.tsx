import { cn } from "@/lib/utils";
import { FileSearch } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { SocialButtons } from "./social-buttons";
import { Icons } from "../ui/icons";

type LoginFormProps = React.ComponentProps<"div"> & {
  type: "sign-in" | "sign-up";
};

export function Login({ className, type, ...props }: LoginFormProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
        className,
      )}
      {...props}
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Icons.logo />
              </div>
              <span className="sr-only">Legal Sync</span>
            </Link>
            <h1 className="text-xl font-bold">Добро пожаловать в Legal Sync</h1>
            <div className="text-center text-sm">
              {type === "sign-in" ? "Еще нет аккаунта? " : "Уже есть аккаунт? "}

              <Link
                href={`/auth/sign-${type === "sign-in" ? "up" : "in"}`}
                className="underline underline-offset-4"
              >
                {type !== "sign-in" ? "Логин" : "Регистрация"}
              </Link>
            </div>
          </div>

          <LoginForm />

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <SocialButtons />
        </div>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
