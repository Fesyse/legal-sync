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
    reasoning_effort: "medium",
    messages: [
      {
        role: "system",
        content: `Проанализируй следующий текст технического задания и извлеки все нормативно-правовые акты (включая действующие и анонсированные), которые могут быть затронуты в ТЗ.

Возвращай результат строго в формате JSON — массив объектов.  Каждый объект должен иметь следующие поля:

*   \`name\`: (строка) Полное название нормативно-правового акта.
*   \`description\`: (строка) Краткое описание области регулирования акта и его основных положений, релевантных для ТЗ.
*   \`sentencePart\`: (строка) Фрагмент текста технического задания, где упоминается, подразумевается или косвенно указывается акт.
*   \`recommendation\`: (строка) Рекомендации по улучшению ТЗ с учетом положений данного нормативно-правового акта.  Объясни, как следует изменить или дополнить ТЗ, чтобы соответствовать требованиям акта или учесть его положения.
*   \`new\`: (логическое значение) \`true\`, если акт только анонсирован и еще не вступил в силу; \`false\`, если акт уже действует.

Не добавляй никаких пояснений, комментариев или форматирования вне структуры JSON.  Убедись, что результат соответствует строго указанному формату.
`,
      },
      {
        role: "user",
        content: `${title} ${description}`,
      },
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200_000,
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
