"use client";

import { AnimatedTitle } from "@/components/animated-title";
import { Animation } from "@/components/animation";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { ReactionButton } from "@/components/ui/reaction-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Message } from "ai";
import { Copy, Link, Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
function Tag({
  text,
  handleSubmit,
}: {
  text: string;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>, input?: string) => void;
}) {
  return (
    <li
      onClick={() => {
        handleSubmit(undefined, text);
      }}
      className="hover:bg-accent transitiona-all flex cursor-pointer items-center gap-2 rounded-md bg-transparent p-3 duration-300"
    >
      <span className="text-sm font-medium">{text}</span>
    </li>
  );
}
export function ChatForm() {
  const [fieldValue, setFieldValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement>,
    input: string = fieldValue,
  ) => {
    e?.preventDefault();

    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
        id: Date.now().toString(),
      },
    ]);
    setFieldValue("");
    setIsLoading(true);
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "text/event-stream",
      },
      body: JSON.stringify({
        messages: [
          ...messages,

          {
            role: "user",
            content: input,
          },
        ],
      }),
    });
    const data = await response.json();

    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
        id: Date.now().toString(),
      },
      {
        role: "assistant",
        content: data?.choices?.[0]?.message?.content!,
        id: Date.now().toString(),
      },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <ScrollArea className="mx-auto flex max-h-[calc(100vh-100px)] w-full max-w-3xl flex-col pt-10 pb-28">
        <div className="space-y-4">
          {!!messages.length ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex min-w-full gap-2",
                  message.role === "user" && "flex justify-end",
                )}
              >
                <div className="max-w-[80%] space-y-2">
                  <div
                    className={`${message.role === "user" && "bg-muted/50"} rounded-lg p-3`}
                  >
                    <p
                      className={` ${message.role === "assistant" ? "text-lg" : "text-sm"} leading-10`}
                      dangerouslySetInnerHTML={{
                        __html: message.content.replaceAll("\n", "<br />"),
                      }}
                    />
                  </div>
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={async () => {
                          await navigator.clipboard.writeText(message.content);
                          toast.success("Скопировано в буфер обмена");
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <ReactionButton type="like" />
                      <ReactionButton type="dislike" />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <>
              <AnimatedTitle
                className="mb-12 [&_h2]:flex [&_h2]:items-center [&_h2]:justify-center [&_h2]:gap-3"
                title={
                  <>
                    <span>Legal</span> <Link size={32} /> <span>Sync</span>
                  </>
                }
                description="Вы можете написать любой интересующий вас вопрос и получить ответ
              на него с помощью Gemini."
              />

              <Animation>
                <h2 className="mb-10 text-3xl font-bold">Чем могу помочь?</h2>
                <ul className="flex flex-col gap-4">
                  <Tag
                    handleSubmit={handleSubmit}
                    text="Что такое нормативные правовые акты?"
                  ></Tag>
                  <Separator />
                  <Tag
                    handleSubmit={handleSubmit}
                    text="Зачем нужны нормативные правовые акты?"
                  ></Tag>
                  <Separator />
                  <Tag
                    handleSubmit={handleSubmit}
                    text="Как правильно использовать нормативные правовые акты?"
                  ></Tag>
                </ul>
              </Animation>
            </>
          )}
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="bg-foreground/5 absolute bottom-0 left-1/2 min-w-3xl -translate-x-1/2 rounded-t-[20px] p-2"
      >
        <Textarea
          placeholder="Напишите ваш вопрос.."
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          className="border-reflect relative -mb-2 max-h-32 min-h-[100px] resize-none rounded-t-[20px] rounded-b-none p-4 pb-0 backdrop-blur-lg"
        />
        <div className="absolute top-5 right-6 flex items-center gap-2">
          {/* <Button
            type="button"
            className="relative overflow-hidden"
            variant={"outline"}
            size={"icon"}
          >
            <Paperclip />
            <BorderBeam
              size={40}
              initialOffset={20}
              className="from-transparent via-pink-400 to-transparent"
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
          </Button> */}
          <Button
            type="submit"
            variant={"outline"}
            size={"icon"}
            disabled={isLoading || !fieldValue}
            className="relative overflow-hidden"
          >
            {isLoading ? <Loader /> : <Send />}
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
        </div>
      </form>
    </>
  );
}
