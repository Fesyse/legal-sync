import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center text-center">
      <div className="mb-8 flex items-center justify-center rounded-lg border"></div>
      <h1 className="text-foreground text-5xl font-bold tracking-tight sm:text-6xl">
        404
      </h1>
      <p className="text-muted-foreground mt-4">Упс, страница не найдена</p>
      <div className="mt-6">
        <Link
          href="/"
          className={buttonVariants({
            size: "default",
            variant: "default",
          })}
          prefetch
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
