"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tip-tap";
import { type Content } from "@tiptap/react";

type EditorProps = {
  value: Content;
  setValue: (value: string | Content) => void;
};

export const Editor = ({ value, setValue }: EditorProps) => {
  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full border-none"
      editorContentClassName="p-5"
      output="html"
      placeholder="Enter your description..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-hidden"
    />
  );
};
