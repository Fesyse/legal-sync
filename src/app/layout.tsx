import { Providers } from "@/components/providers";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Legal Sync",
  description:
    "Программное средство для автоматизированной проверки технических заданий на соответствие нормативно-правовым актам",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" sizes="any" type="image/svg+" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
