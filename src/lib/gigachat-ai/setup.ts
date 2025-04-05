import GigaChat from "gigachat";
import { Agent } from "node:https";

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

export const client = new GigaChat({
  timeout: 600,
  model: "GigaChat",
  credentials: process.env.NEXT_PUBLIC_GIGA_API_KEY,
  httpsAgent: httpsAgent,
});
