import { client } from "./setup";

export async function GetMoreRecommendationsByManyNpas(
  npas: string[],
  ts: string,
) {
  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Пожалуйста, предоставь всю информацию о рекомендациях по выполнению закона, примерах для технического задания и примерах названий законов сжато.Ответ выдай в виде чистой текстовой строки без каких-либо спецсимволов, разметки или форматирования.",
      },
      {
        role: "user",
        content: `Названия законов: ${npas.map((npa) => `\n${npa}`).join("")} Техзадание: ${ts}`,
      },
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200000,
  });
  return chatResult.choices[0]?.message.content;
}
