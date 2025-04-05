import type { AIResponse } from "../@types/ai-response";
import { client } from "./setup";

export async function GetNpaRules(ts: string): Promise<AIResponse[]> {
  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Ответь строго в формате JSON — массив объектов, содержащих: name, description, sentensePart, reccomendations. Recomendations - опиши подходы, как можно улучшить или справить тз по этим законам. Не добавляй пояснений или комментариев. Клиент отдаст только техническое задание.",
      },
      {
        role: "user",
        content: ts,
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
