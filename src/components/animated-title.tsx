"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedTitleProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

export function AnimatedTitle({
  title,
  description,
  className,
}: AnimatedTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]!.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={titleRef} className={cn("space-y-4 text-center", className)}>
      <h2
        className={cn(
          "text-4xl font-bold transition-all duration-700 md:text-5xl lg:text-6xl",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground mx-auto max-w-[700px] transition-all delay-300 duration-700 md:text-xl",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
