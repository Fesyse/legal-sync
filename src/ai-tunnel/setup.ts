import { OpenAI } from "openai";
export const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_AITUNELL_API_KEY, // Ключ из нашего сервиса
  baseURL: "https://api.aitunnel.ru/v1/",
});
