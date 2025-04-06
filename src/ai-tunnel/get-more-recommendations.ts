import { client } from "./setup";

export async function GetMoreRecommendations(npa: string, ts: string) {
  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Пожалуйста, предоставь важную информацию о рекомендациях по выполнению закона, включая конкретные примеры для технического задания и примеры названий законов, не надо лишних коментариев. Структурируй ответ по разделам: общие рекомендации, примеры технического задания и примеры названий законов. Формат в виде строки",
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
