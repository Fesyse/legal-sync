"use client";

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
import type { NpaSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function NpaCard({
  name,
  description,
  sentensePart,
  new: isNew,
  recommendations,
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
    isLoading: isNpaLoading,
  } = api.npa.getNpaInfoById.useQuery({ npa: name }, { enabled: false });
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);

  const onGetDetailRecommendations = async () => {
    setIsRecommendationsOpen(true);
  };
  useEffect(() => {
    getRecommendations();
    getNpa();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("h-full w-full transition-all", {
        "col-span-2": isRecommendationsOpen,
      })}
    >
      <Card className="relative flex h-full flex-col overflow-hidden">
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
          </div>
          <CardDescription className="mt-2">
            {isRecommendationsOpen
              ? isNpaLoading
                ? "Загрузка..."
                : detnpa
              : description.substring(0, 100) +
                (description.length > 100 ? "..." : "")}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-[1_1_auto]">
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
