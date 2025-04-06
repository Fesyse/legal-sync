import { useRouter } from "next/navigation";

export type Hotkey = {
  symbol: string;
  key: string;
  text: string;
  id: string;
  action: () => void;
};
export const useHotkeys = () => {
  const { push } = useRouter();
  const hotkeys = [
    {
      action: () => void push("/dashboard/ask"),
      symbol: "⌘",
      key: "Control+I",
      text: "Спросить AI",
      id: "wefkwiefkjnwefjnoi",
    },
    {
      action: () => void push("/dashboard"),
      symbol: "⌘",
      key: "Control+H",
      text: "Перейти на дашборд",
      id: "wekfwenmijfewjfuwe9238",
    },
  ];

  return {
    hotkeys,
  };
};
