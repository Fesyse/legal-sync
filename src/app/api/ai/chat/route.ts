import { client } from "@/ai-tunnel/setup";
import { auth } from "@/server/auth";
import { type CoreMessage } from "ai";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type { ChatCompletionMessageParam } from "openai/resources/chat";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { messages }: { messages: CoreMessage[] } = await req.json();

  const data = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Отдай мне ответ в виде обычного текста, без всяких звездочек (формата md)",
      },
      ...messages.map<ChatCompletionMessageParam>((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
    model: "gemini-2.0-flash-001",
    max_tokens: 200_000,
  });

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
