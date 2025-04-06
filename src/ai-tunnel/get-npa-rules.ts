import { auth } from "@/server/auth";
import type { AIResponse } from "@/types/ai-response";
import { headers } from "next/headers";
import { client } from "./setup";

export async function GetNpaRules(
  description: string,
  title: string,
): Promise<AIResponse[]> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Not authorized");
  }

  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Проанализируй текст технического задания и извлеки все упомянутые нормативно-правовые акты (включая действующие и анонсированные). Верни результат строго в формате JSON — массив объектов с полями: name (название акта), description (краткое описание), sentensePart (фрагмент ТЗ, где он упоминается), recommendation (как улучшить ТЗ с учётом акта, обычная строка), new (true — если акт только анонсирован, false — если уже действует). Не добавляй пояснений или форматирования вне JSON.",
      },
      {
        role: "user",
        content: `${title} ${description}`,
      },
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200000,
  });

  let raw = chatResult.choices[0]?.message.content || "";

  // Удаляем обёртку ```json ... ``` если есть
  if (raw.startsWith("```")) {
    raw = raw.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1");
  }

  // Пробуем спарсить JSON
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      console.log(await parsed);

      return parsed;
    } else {
      console.error("Ожидался массив, но пришло что-то другое:", parsed);
      return [];
    }
  } catch (e) {
    console.error("Ошибка парсинга JSON:", e);
    return [];
  }
}
