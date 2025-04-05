"use client";

import { type Content } from "@tiptap/react";
import { useState } from "react";
import { Editor } from "../../../(home)/editor";

type NPAFormProps = {
  content?: Content;
};

export const TechnicalSpecificationDetail = ({
  content = "",
}: NPAFormProps) => {
  const [value, setValue] = useState<Content>(content);

  return (
    <div className="h-full w-full">
      <Editor value={value} setValue={setValue} />
    </div>
  );
};
