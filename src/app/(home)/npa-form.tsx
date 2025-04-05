"use client";

import { checkRules } from "@/actions/check-rules";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Editor } from "./editor";
import { type Content } from "@tiptap/react";
import { db } from "@/server/db";
import { technicalSpecification } from "@/server/db/schema";

type NPAFormProps = {
  content?: Content;
};

export const NPAForm = ({ content = "" }: NPAFormProps) => {
  const [value, setValue] = useState<Content>(content);
  const oSubmit = () => {};

  return (
    <form action={oSubmit} className="">
      <div className="flex h-full flex-col gap-4">
        <div className="h-full w-full">
          <Editor value={value} setValue={setValue} />
        </div>

        <div className="items-left flex gap-3">
          <Button type="submit" variant="outline">
            Save
          </Button>
          <Button type="submit" variant="outline">
            Получить НПА
          </Button>
        </div>
      </div>
    </form>
  );
};
