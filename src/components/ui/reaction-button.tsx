"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

type ReactionButtonProps = {
  type: "like" | "dislike";
  className?: string;
};

export function ReactionButton({ type, className }: ReactionButtonProps) {
  const [active, setActive] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const Icon = type === "like" ? ThumbsUp : ThumbsDown;
  const activeColor = type === "like" ? "text-blue-500" : "text-red-500";

  const handleClick = () => {
    setActive(!active);
    setAnimationTrigger((prev) => prev + 1);
  };

  return (
    <div className={cn("relative inline-flex items-center gap-1.5", className)}>
      <button
        onClick={handleClick}
        className={cn(
          "hover:bg-muted relative flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          active && activeColor,
        )}
        aria-label={type === "like" ? "Like" : "Dislike"}
      >
        <Icon className="h-4 w-4" />

        {/* Flying icons animation */}
        <AnimatePresence>
          {[...Array(6)].map(
            (_, i) =>
              animationTrigger > 0 && (
                <motion.div
                  key={`${type}-${i}-${animationTrigger}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [
                      0,
                      (i % 2 === 0 ? -1 : 1) *
                        (10 + i * 5) *
                        (Math.random() + 0.5),
                    ],
                    y: [0, -15 - i * 5 * (Math.random() + 0.5)],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "absolute",
                    active ? activeColor : "text-foreground",
                  )}
                >
                  <Icon className="h-3 w-3" />
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
