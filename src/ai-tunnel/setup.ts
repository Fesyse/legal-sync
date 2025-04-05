import { env } from "@/env";
import { OpenAI } from "openai";
export const client = new OpenAI({
  apiKey: env.AITUNELL_API_KEY, // Ключ из нашего сервиса
  baseURL: "https://api.aitunnel.ru/v1/",
});
