"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { ReactionButton } from "@/components/ui/reaction-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Copy, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Message = {
  role: "ai" | "me";
  content: string;
};

export function ChatForm() {
  const [input, setInput] = useState("");
  const [messages] = useState<Message[]>([
    {
      role: "me",
      content: "Hi, I'd like to check my bill.",
    },
    {
      role: "ai",
      content:
        "Please hold for a second.\n\nOk, I can help you with that\n\nI'm pulling up your current bill information\n\nYour current bill is $150, and it is due on August 31, 2024.\n\nIf you need more details, feel free to ask!",
    },
  ]);

  return (
    <>
      <ScrollArea className="mx-auto flex w-full max-w-3xl flex-col py-10">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex min-w-full gap-2",
                message.role === "me" && "flex justify-end",
              )}
            >
              <div className="max-w-[80%] space-y-2">
                <div
                  className={`${message.role === "me" && "bg-muted/50"} rounded-lg p-3`}
                >
                  <p
                    className={` ${message.role === "ai" ? "text-lg" : "text-sm"} leading-10`}
                  >
                    {message.content}
                  </p>
                </div>
                {message.role === "ai" && (
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
          ))}
        </div>
      </ScrollArea>
      <div className="bg-foreground/5 absolute bottom-0 left-1/2 min-w-3xl -translate-x-1/2 rounded-t-[20px] p-2">
        <div className=" "></div>
        <Textarea
          placeholder="Напишите ваш вопрос.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-reflect relative -mb-2 max-h-32 min-h-[100px] resize-none rounded-t-[20px] rounded-b-none p-4 pb-0 backdrop-blur-lg"
        />
        <div className="absolute top-5 right-6 flex items-center gap-2">
          <Button
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
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="relative overflow-hidden"
          >
            <Send />
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
      </div>
    </>
  );
}
