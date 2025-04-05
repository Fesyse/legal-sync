"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tip-tap";
import { type Content } from "@tiptap/react";

type EditorProps = {
  value: Content | null;
  setValue: (value: Content) => void;
};

export const Editor = ({ value, setValue }: EditorProps) => {
  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="html"
      placeholder="Enter your description..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-hidden"
    />
  );
};
