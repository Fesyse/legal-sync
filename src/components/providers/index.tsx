import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from "../mode-toggle";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <div className="fixed top-4 right-4">
          <ModeToggle />
        </div>
      </ThemeProvider>
    </TRPCReactProvider>
  );
};
