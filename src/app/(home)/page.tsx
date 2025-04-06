import { AnimatedTitle } from "@/components/animated-title";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import NextLink from "next/link";
import { CreateTechnicalSpecificationButton } from "./create-technical-specifiaction-button";
import { Separator } from "@/components/ui/separator";

type HomeProps = {
  className?: string;
};

export default function HomePage({ className }: HomeProps) {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center",
        className,
      )}
    >
      <AnimatedTitle
        className="mb-6 [&_h2]:flex [&_h2]:items-center [&_h2]:justify-center [&_h2]:gap-3"
        title={
          <>
            <span>Legal</span> <Link size={32} /> <span>Sync</span>
          </>
        }
        description="Проверьте своё ТЗ на соответствие нормативно-правовым актам"
      />

      <div className="grid items-center gap-3 md:grid-cols-2">
        <CreateTechnicalSpecificationButton />

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t md:hidden">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            или
          </span>
        </div>

        <NextLink href={"/dashboard/history"}>
          <Button variant="outline">Посмотреть историю моих ТЗ</Button>
        </NextLink>
      </div>
    </main>
  );
}
