import { client } from "./setup";

export async function AskAi(question: string) {
  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Ты помощник человека. Ты должен отвечать на вопросы и предоставлять информацию о рекомендациях по выполнению закона и примерах по техническому заданию и названию закона",
      },
      {
        role: "user",
        content: question,
      },
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200000,
  });
  return chatResult.choices[0]?.message.content;
}
