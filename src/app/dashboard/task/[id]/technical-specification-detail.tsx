"use client";

import { NpaListSkeleton } from "@/app/dashboard/task/[id]/npa-list-skeleton";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { type Content } from "@tiptap/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Editor } from "./editor";
import { NpaList } from "./npa-list";

export const TechnicalSpecificationDetail = ({ id }: { id: string }) => {
  const [open, setOpen] = useState("closed");
  const [description, setDescription] = useState<Content>("");

  const { data: technicalSpecification } =
    api.technicalSpecification.getById.useQuery({
      id,
    });

  const { mutate: update, isPending } =
    api.technicalSpecification.updateById.useMutation({
      onSuccess: () => {
        toast.success("Техническое задание успешно обновлено!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const { mutate: finish } =
    api.technicalSpecification.finishTsById.useMutation({
      onSuccess: () => {
        toast.success("Техническое задание успешно завершено!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  useEffect(() => {
    if (technicalSpecification?.description) {
      setDescription(technicalSpecification?.description);
    }
  }, [technicalSpecification]);

  const saveData = async () => {
    if (description) {
      update({
        description: description.toString(),
        id,
      });
      if (!isPending) {
      }
    } else {
      toast.error("Не удалось сохранить данные");
    }
  };
  const finishProject = async () => {
    if (description) {
      saveData();
      finish({
        id,
      });
    } else {
      toast.error("Не удалось сохранить данные");
    }
  };

  return (
    <div className="flex h-full w-full gap-4">
      <AnimatePresence mode="wait">
        {open === "open" && (
          <motion.div
            key={"npa-list-wrapper"}
            className="bg-background h-full overflow-hidden rounded-md"
            initial={{ width: 0 }}
            animate={{ width: open === "open" ? "100%" : "0%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NpaList
              setOpen={setOpen}
              description={description!.toString()}
              title={technicalSpecification!.title.toString()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex h-full w-full flex-col gap-5">
        {technicalSpecification === undefined ? (
          <NpaListSkeleton key="skeletons" />
        ) : (
          <Editor value={description} setValue={setDescription} />
        )}
      </div>
      <div className="fixed bottom-4 flex w-[calc(100%-var(--sidebar-width))] justify-center">
        {open === "closed" && (
          <div className="flex gap-4">
            <Button
              type="submit"
              className="relative overflow-hidden"
              variant="outline"
              onClick={() => {
                saveData();
                setOpen("open");
              }}
            >
              Найти нормативные документы по тексту
              <BorderBeam
                size={40}
                initialOffset={20}
                className="from-transparent via-red-500 to-transparent"
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                }}
              />
            </Button>
            <Button
              type="submit"
              className="relative overflow-hidden"
              variant="outline"
              onClick={saveData}
            >
              Сохранить
              <BorderBeam
                size={40}
                initialOffset={20}
                className="from-transparent via-purple-500 to-transparent"
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                }}
              />
            </Button>
            <Button
              type="submit"
              className="relative overflow-hidden"
              variant="outline"
              onClick={finishProject}
            >
              Завершить тех. задание
              <BorderBeam
                size={40}
                initialOffset={20}
                className="from-transparent via-orange-500 to-transparent"
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                }}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
