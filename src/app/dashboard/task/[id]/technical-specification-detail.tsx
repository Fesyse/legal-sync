"use client";

import { type Content } from "@tiptap/react";
import { useState } from "react";
type NPAFormProps = {
  content?: Content;
};

export const TechnicalSpecificationDetail = ({
  content = "",
}: NPAFormProps) => {
  const [value, setValue] = useState<Content>(content);
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="h-full w-full"></div>
    </div>
  );
};
