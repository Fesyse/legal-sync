import { GetMoreRecommendations } from "@/ai-tunnel/get-more-recommendations";
import { GetNpaDetails } from "@/ai-tunnel/get-npa-details";
import { GetNpaRules } from "@/ai-tunnel/get-npa-rules";
import { AnimatedTitle } from "@/components/animated-title";
import { Header } from "@/components/ui/header";
import { Link } from "lucide-react";
import { NPAForm } from "./npa-form";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <AnimatedTitle
          className="mb-6 [&_h2]:flex [&_h2]:items-center [&_h2]:justify-center [&_h2]:gap-3"
          title={
            <>
              <span>Legal</span> <Link size={32} /> <span>Sync</span>
            </>
          }
          description="Проверьте своё ТЗ на соответствие нормативно-правовым актам"
        />

        <div className="w-full max-w-xl">
          <NPAForm />
        </div>
      </main>
    </>
  );
}
