import type { AIResponse } from "@/types/ai-response";
import { client } from "./setup";
import { headers } from "next/headers";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { technicalSpecification } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetNpaRules(id_ts: number): Promise<AIResponse[]> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Not authorized");
  }

  const ts_object = await db
    .select()
    .from(technicalSpecification)
    .where(eq(technicalSpecification.id, id_ts));
  if (!ts_object.length) {
    throw new Error("Technical specification not found");
  }
  const ts = ts_object[0];
  if (!ts) {
    throw new Error("Technical specification not found");
  }

  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Найди в техническом задании абсолютно все норматинво правовые акты(аннонсированые и уже внесенные), которые упоминаются. Ответь строго в формате JSON — массив объектов, содержащих: name, description, sentensePart, recommendations. Recomendations - опиши подходы, как можно улучшить или справить тз по этим законам, new - вступили ли в силу эти акты или пока анонсированы(true-пока не добавлен/false - уже внесен в реестр). Не добавляй пояснений или комментариев. Клиент отдаст только техническое задание.",
      },
      {
        role: "user",
        content: ts.technicalSpecification,
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
