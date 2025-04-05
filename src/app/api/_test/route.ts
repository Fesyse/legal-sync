import { generateText } from "ai";
import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export async function GET() {
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    baseURL: "https://api.aitunnel.ru/v1/",
    headers: {
      Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
    },
  });

  const { text, sources, providerMetadata } = await generateText({
    model: google("gemini-2.0-flash", {
      useSearchGrounding: true,
    }),
    prompt:
      "List the top 5 San Francisco news from the past week." +
      "You must include the date of each article.",
  });

  console.log(text, sources, providerMetadata);

  return NextResponse.json({ text, sources, providerMetadata });
}
