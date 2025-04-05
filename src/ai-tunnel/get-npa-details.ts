import { client } from "./setup";

export async function GetNpaDetails(npa: string) {
  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Расскажи всю информацию о законе и его примерах. Не добавляй пояснений или комментариев. Клиент отдаст только название закона.",
      },
      {
        role: "user",
        content: npa,
      },
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200000,
  });
  return chatResult.choices[0]?.message;
}
