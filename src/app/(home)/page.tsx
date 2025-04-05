import { AnimatedTitle } from "@/components/animated-title";
import { Link } from "lucide-react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

      <div className="flex items-center gap-3">
        <Button variant="outline">Создать тз</Button>
        <NextLink href={"/dashboard/history"}>
          <Button variant="outline">Посмотреть историю</Button>
        </NextLink>
      </div>
    </main>
  );
}
