"use client";

import { checkRules } from "@/actions/check-rules";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, X } from "lucide-react";
import { useRef, useState } from "react";

export const NPAForm = () => {
  const [isUploadedFile, setIsUploadedFile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form action={checkRules}>
      <div className="flex gap-2.5">
        <div className="relative">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="bg-input/30 border-input relative mt-0.5 border"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <Plus />
          </Button>

          {isUploadedFile ? (
            <Button
              type="button"
              className="absolute -top-2 -right-2 z-50 size-4"
              size="icon"
              variant="outline"
              onClick={() => {
                setIsUploadedFile(false);
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              <X className="!size-3" />
            </Button>
          ) : null}
        </div>
        <Input
          ref={inputRef}
          type="file"
          className="hidden"
          name="techinfo-file"
          onChange={(e) => {
            if (e.target.value) {
              setIsUploadedFile(true);
            }
          }}
        />

        <Textarea
          placeholder="Напишите свое тз здесь... Или же прикрепите файл"
          className="max-h-40 min-h-10"
          name="techinfo"
        />

        <Button
          size="icon"
          variant="secondary"
          className="bg-input/30 border-input mt-0.5 border"
        >
          <Search />
        </Button>
      </div>
    </form>
  );
};
