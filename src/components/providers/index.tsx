import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
};
