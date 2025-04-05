"use client";

import { useHotkeys } from "@/hooks/use-hotkeys";
import { useHotkeysActions } from "@/hooks/use-hotkeys-actions";
import type { FC, PropsWithChildren } from "react";

export const HotkeysProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hotkeys } = useHotkeys();
  useHotkeysActions(hotkeys);

  return children;
};
