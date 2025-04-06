"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type FilterNpaSchema } from "@/lib/schemas";
import { filterNpa } from "@/lib/utils";
import { api } from "@/trpc/react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { NpaCard } from "./npa-card";
import { NpaListSkeleton } from "./npa-list-skeleton";
import { SearchForm } from "./search-form";

export function NpaList({
  description,
  title,
  setOpen,
}: {
  setOpen: (open: string) => void;
  description: string;
  title: string;
}) {
  const [filters, setFilters] = useState<FilterNpaSchema | undefined>();

  const [selected, setSelected] = useState<string[]>([]);
  const { data: recommendations, refetch: getRecommendations } =
    api.npa.getRecommendationsForTSByManyNPAs.useQuery(
      { npas: selected, description },
      { enabled: false },
    );

  const {
    data,
    isLoading: isInitialLoading,
    refetch,
    isRefetching,
  } = api.npa.getAllByTS.useQuery(
    { description, title },
    {
      enabled: false,
    },
  );

  const isLoading = isRefetching || isInitialLoading;
  //   // TODO: Подумать над получением рекомендаций из AI (Возможность выбрать документы, на соответствие которым пользователь
  // хотел бы проверить ТЗ. )

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="relative inline-flex h-full w-full max-w-[400px] min-w-[200px] flex-col gap-5 p-4 sm:min-w-[200px] lg:max-w-[800px] lg:min-w-[400px] 2xl:min-w-[700px]">
      <div className="flex w-full justify-between gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  refetch();
                }}
                variant={"outline"}
                size={"icon"}
              >
                <RotateCcw size={12} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Еще раз найти</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                size={"icon"}
                onClick={() => setOpen("closed")}
              >
                <RxCross2 size={28} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Закрыть</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <SearchForm filters={filters} setFilters={setFilters} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <NpaListSkeleton key="skeletons" />
        ) : data?.length ? (
          <ScrollArea className="max-h-[100vh] overflow-auto">
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              key={"npa-list"}
            >
              <ul className="grid grid-cols-1 gap-5 2xl:grid-cols-2">
                {data
                  .filter((npa) => {
                    if (!filters) return true;

                    return filterNpa(filters, npa);
                  })
                  .map((npa) => (
                    <NpaCard
                      selected={selected}
                      setSelected={setSelected}
                      key={npa.name}
                      id={npa.name}
                      name={npa.name}
                      description={npa.description}
                      sentensePart={npa.sentensePart}
                      new={npa.new}
                      recommendations={
                        npa.recommendation ? npa.recommendation : ""
                      }
                    />
                  ))}
              </ul>
            </motion.div>
          </ScrollArea>
        ) : (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            key={"npa-list-empty"}
            className="flex min-h-[100vh] w-full items-center justify-center"
          >
            <div className="max-w-md text-center">
              <p className="text-foreground/60 mb-2 text-base">
                Попробуйте изменить ваше техническое задание для проверки
                нормативных правовых актов
              </p>
              <Button
                onClick={() => {
                  refetch();
                }}
                variant={"outline"}
                size={"sm"}
              >
                <RotateCcw size={12} /> Еще раз
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {selected.length ? (
          <motion.div
            exit={{ bottom: -100, opacity: 0, pointerEvents: "none" }}
            initial={{ bottom: -100, opacity: 0, pointerEvents: "none" }}
            key={"npa-list-footer"}
            animate={{ bottom: 100, opacity: 1, pointerEvents: "auto" }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                getRecommendations();
              }}
            >
              Проверить ТЗ на выбранные документы
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
