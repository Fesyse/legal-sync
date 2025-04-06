"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/trpc/react";
import { HotkeysProvider } from "./hotkeys-provider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <HotkeysProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </HotkeysProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
};
