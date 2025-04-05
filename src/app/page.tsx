import { GetMoreRecommendations } from "@/ai-tunnel/get-more-recommendations";
import { GetNpaDetails } from "@/ai-tunnel/get-npa-details";
import { GetNpaRules } from "@/ai-tunnel/get-npa-rules";
import { AnimatedTitle } from "@/components/animated-title";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "lucide-react";
export default async function Home() {
  return (
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

      <div className="min-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Legal Sync</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
