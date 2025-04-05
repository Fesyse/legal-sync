import { AnimatedTitle } from "@/components/animated-title";
import { Header } from "@/components/ui/header";
import { Link } from "lucide-react";
import { NPAForm } from "./npa-form";
import { GetNpaRules } from "@/ai-tunnel/get-npa-rules";

export default async function Home() {
  // const npa =
  //   "«Необходимо разработать систему для учета и обработки персональных данных пациентов. Система должна обеспечивать безопасность данных, соответствовать требованиям Федерального закона о защите персональных данных (ФЗ-152), а также соблюдать требования СанПиН и ГОСТов в сфере медицины. Внедрение системы должно обеспечить возможность контроля за качеством медицинских услуг и учета медицинских услуг в соответствии с законодательством».";
  // const data = await GetNpaRules(npa);
  // console.log(data);

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
