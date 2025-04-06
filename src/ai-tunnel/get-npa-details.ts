import { client } from "./setup";

export async function GetNpaDetails(npa: string) {
  const chatResult = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Пожалуйста, предоставь краткую и исчерпывающую информацию о акте и примерах его применения без дополнительных пояснений или комментариев. Клиент передаёт только название акта.Ответ выдай в виде чистой текстовой строки без каких-либо спецсимволов, разметки или форматирования.",
      },
      {
        role: "user",
        content: npa,
      },
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200000,
  });
  return chatResult.choices[0]?.message.content;
}
