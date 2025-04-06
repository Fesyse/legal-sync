"use client";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { NpaSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

export function NpaCard({
  name,
  description,
  sentensePart,
  new: isNew,
  recommendations,
  id,
}: NpaSchema & {
  setSelected: (ids: string[]) => void;
  selected: string[];
}) {
  const {
    data: detailRecommendations,
    refetch: getRecommendations,
    isLoading: isLoadingRecommendations,
  } = api.npa.getRecommendationsForTS.useQuery(
    { npa: name, description: description },
    { enabled: false },
  );
  const {
    data: detnpa,
    refetch: getNpa,
    isLoading: isnpaLoading,
  } = api.npa.getNpaInfoById.useQuery({ npa: name }, { enabled: false });
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  useEffect(() => {
    getRecommendations();
    getNpa();
  }, []);
  const onGetDetailRecommendations = async () => {
    setIsRecommendationsOpen(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full transition-all", {
        "col-span-2": isRecommendationsOpen,
      })}
    >
      <Card className="relative overflow-hidden">
        <CardHeader>
          {isNew && (
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 50 }}
              className="mb-4"
            >
              <Badge variant={"destructive"}>Анонсированный</Badge>
            </motion.div>
          )}

          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => getRecommendations()}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Показать рекомендации</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-80">
                <div className="space-y-2">
                  <h4 className="mb-4 font-medium">Полные рекомендации</h4>
                  {detailRecommendations ? (
                    <ul className="list-disc">
                      <TypingAnimation
                        duration={30}
                        className="text-foreground/70 p-0 text-sm leading-5 font-normal"
                      >
                        {detailRecommendations}
                      </TypingAnimation>
                    </ul>
                  ) : (
                    <p className="text-foreground/60 text-center text-xs">
                      Мы не нашли больше рекомандаций. Ваше ТЗ отличное!
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <CardDescription className="mt-2">
            {isRecommendationsOpen
              ? isnpaLoading
                ? "Загрузка..."
                : detnpa
              : description.substring(0, 100) +
                (description.length > 100 ? "..." : "")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="bg-muted rounded-md p-3">
            <h4 className="mb-1 text-sm font-medium">
              Часть предложения из ТЗ:
            </h4>
            <p className="text-sm italic">"{sentensePart}"</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-7 border-t pt-4">
          <div className="w-full">
            <h4 className="mb-1 text-sm font-medium">
              {isRecommendationsOpen
                ? "Рекомендации:"
                : "Краткие рекомендации:"}
            </h4>
            <p className="text-muted-foreground text-sm">
              {isRecommendationsOpen
                ? isLoadingRecommendations
                  ? "Загрузка..."
                  : detailRecommendations
                : recommendations
                  ? recommendations.substring(0, 100) +
                    (recommendations.length > 100 ? "..." : "")
                  : "Нет рекомендаций"}
            </p>
          </div>
          {isRecommendationsOpen ? (
            <Button onClick={() => setIsRecommendationsOpen(false)}>
              Скрыть
            </Button>
          ) : (
            <Button onClick={onGetDetailRecommendations}>Узнать больше</Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
