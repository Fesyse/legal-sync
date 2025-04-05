"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { type Content } from "@tiptap/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Editor } from "./editor";
import { NpaList } from "./npa-list";
export const TechnicalSpecificationDetail = ({
  content = "",
  id,
}: {
  content?: Content;
  id: string;
}) => {
  const [value, setValue] = useState<Content>(content);
  const { data } = api.technicalSpecification.getById.useQuery({
    id,
  });
  const [open, setOpen] = useState("closed");
  useEffect(() => {
    if (data?.title && data?.description)
      setValue(
        `<h1>${data?.title}</h1>\n<p>${data?.description}</p>\n${value}`,
      );
  }, [data]);

  return (
    <div className="flex h-full w-full gap-4">
      <AnimatePresence mode="wait">
        {open === "open" && (
          <motion.div
            key={"npa-list-wrapper"}
            className="bg-background min-h-[100vh] overflow-hidden rounded-md"
            initial={{ width: 0 }}
            animate={{ width: open === "open" ? "100%" : "0%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NpaList setOpen={setOpen} id={data?.id!} />
          </motion.div>
        )}
      </AnimatePresence>
      <Editor value={value} setValue={setValue} />
      <div className="fixed bottom-4 flex w-[calc(100%-var(--sidebar-width))] justify-center">
        {open === "closed" && (
          <Button
            type="submit"
            className="relative overflow-hidden"
            variant="outline"
            onClick={() => setOpen("open")}
          >
            Найти нормативные документы по тексту
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
        )}
      </div>
    </div>
  );
};
