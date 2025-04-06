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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { NpaSchema } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

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
  const { data, refetch } = api.npa.getRecommendationsForTS.useQuery(
    { npa: name, description: description },
    { enabled: false },
  );
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
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
                  onClick={() => refetch()}
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
                  {data ? (
                    <ul className="list-disc">
                      <TypingAnimation
                        duration={30}
                        className="text-foreground/70 p-0 text-sm leading-5 font-normal"
                      >
                        {data}
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
            {description.substring(0, 100) +
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
            <h4 className="mb-1 text-sm font-medium">Краткие рекомендации:</h4>
            <p className="text-muted-foreground text-sm">
              {recommendations
                ? recommendations.substring(0, 100) +
                  (recommendations.length > 100 ? "..." : "")
                : "Нет рекомендаций"}
            </p>
          </div>
          <Button onClick={() => setIsRecommendationsOpen(true)}>
            Узнать больше
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
