import { Button } from "@/components/ui/button";
import { Skeletons } from "@/components/ui/skeletons";
import { api } from "@/trpc/react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, SquareX } from "lucide-react";
import { useEffect, useState } from "react";
import { NpaCard } from "./npa-card";

export function NpaList({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (open: string) => void;
}) {
  const {
    data: _,
    isLoading: isInitialLoading,
    refetch,
    isRefetching,
  } = api.npa.getAllByTS.useQuery(
    { id },
    {
      enabled: false,
    },
  );
  const isLoading = isRefetching || isInitialLoading;
  const data = [
    {
      id: "1",
      name: "Право на проверку нормативных правовых актов",
      description:
        "Право на проверку нормативных правовых актов в соответствии с актами РФ и ФСТЭК от 25.01.2022 N 116-ФЗ «О проверке нормативных правовых актов»",
      sentensePart: "Право на проверку нормативных правовых актов",
      new: false,
      recommendations: "",
    },
    {
      id: "2",
      name: "Право на проверку нормативных правовых актов",
      description:
        "Право на проверку нормативных правовых актов в соответствии с актами РФ и ФСТЭК от 25.01.2022 N 116-ФЗ «О проверке нормативных правовых актов»",
      sentensePart: "Право на проверку нормативных правовых актов",
      new: false,
      recommendations: "",
    },
  ];
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex w-full min-w-[800px] flex-col gap-5 p-4">
      <button
        className="flex w-full justify-end"
        type="button"
        onClick={() => setOpen("closed")}
      >
        <SquareX size={28} className="text-foreground/50" />
      </button>
      {/* <SearchForm /> */}
      <AnimatePresence mode="wait">
        {isLoading && <Skeletons key="skeletons" />}
        {!!data?.length && !isLoading && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            key={"npa-list"}
          >
            <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {data.map((npa) => (
                <NpaCard
                  selected={selected}
                  setSelected={setSelected}
                  key={npa.id}
                  {...npa}
                />
              ))}
            </ul>
          </motion.div>
        )}
        {!data?.length && (
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
    </div>
  );
}
