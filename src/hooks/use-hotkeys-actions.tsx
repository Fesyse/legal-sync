"use client";

import { useEffect } from "react";
import type { Hotkey } from "./use-hotkeys";

export const useHotkeysActions = (hotkeys: Hotkey[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keydownKey = event.key;
      const ctrl = event.ctrlKey ? "Control+" : "";
      const alt = event.altKey ? "Alt+" : "";
      const shift = event.shiftKey ? "Shift+" : "";
      const key = `${ctrl}${alt}${shift}${keydownKey}`;
      if (key) {
        const hotkey =
          hotkeys?.find((h) => {
            return h.key === key;
          }) || null;
        if (hotkey?.id) {
          event.preventDefault();
          hotkey?.action?.();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hotkeys]);
};
