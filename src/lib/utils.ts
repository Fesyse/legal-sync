import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FilterNpaSchema } from "./schemas";
import type { AIResponse } from "@/types/ai-response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterNpa(filters: FilterNpaSchema, npa: AIResponse) {
  return (
    (filters.name
      ? npa.name.toLowerCase().includes(filters.name.toLowerCase())
      : true) &&
    (filters.description
      ? npa.description
          .toLowerCase()
          .includes(filters.description.toLowerCase())
      : true) &&
    (filters.sentensePart
      ? npa.sentensePart
          .toLowerCase()
          .includes(filters.sentensePart.toLowerCase())
      : true) &&
    (filters.new ? npa.new : !npa.new)
  );
}
