import { client } from "./setup";

export async function GetMoreRecommendations(npa: string, ts: string) {
  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Пожалуйста, предоставь ключевую информацию о рекомендациях по выполнению закона, включая конкретные примеры для технического задания и примеры названий законов, без лишних комментариев.",
      },
      {
        role: "user",
        content: `${npa} ${ts}`,
      },
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200000,
  });
  return chatResult.choices[0]?.message.content;
}
