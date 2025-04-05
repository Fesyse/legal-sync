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
          "Расскажи всю информацию о рекомендациях по выполнению закона и примерах по техническому заданию и названиям законов",
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
