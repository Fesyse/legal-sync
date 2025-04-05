"use client";

import { useHotkeys } from "@/hooks/use-hotkeys";
import { useState } from "react";

export function Hotkeys() {
  const { hotkeys } = useHotkeys();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hotkeyId, setHotkeyId] = useState<string | undefined>();

  return (
    <>
      <div className="flex h-full w-full items-center">
        {hotkeys?.length ? (
          <ul className="flex h-full w-full flex-col gap-1">
            {hotkeys.map((h) => (
              <li
                key={h.id}
                onClick={() => {
                  setHotkeyId(h.id);
                }}
                className="bg-muted/50 flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-4 py-2"
              >
                <div className="w-full">{h.text}</div>
                <kbd className="bg-muted pointer-events-none flex items-center gap-1 rounded-sm border px-2 py-1 font-mono text-base font-medium whitespace-nowrap select-none">
                  {h.key}
                </kbd>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted-foreground flex h-full min-h-[200px] w-full items-center justify-center">
            Пока горячих клавиш нет
          </div>
        )}
      </div>
    </>
  );
}
