import type { CoreMessage } from "ai";
import { client } from "./setup";
import type { ChatCompletionMessageParam } from "openai/resources/chat";

export async function askAi(messages: CoreMessage[]) {
  const stream = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Ты помощник человека. Ты должен отвечать на вопросы и предоставлять информацию о рекомендациях по выполнению закона и примерах по техническому заданию и названию закона",
      },
      ...messages.map<ChatCompletionMessageParam>((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200_000,
    stream: true,
  });

  return stream;
}
