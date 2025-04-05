import { askAi } from "@/ai-tunnel/ask-ai";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { type CoreMessage } from "ai";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { messages }: { messages: CoreMessage[] } = await req.json();

  const stream = await askAi(messages);

  return new Response(stream.toReadableStream(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
