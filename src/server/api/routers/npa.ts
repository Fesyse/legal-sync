import { z } from "zod";

import { GetMoreRecommendations } from "@/lib/ai-tunnel/get-more-recommendations";
import { GetMoreRecommendationsByManyNpas } from "@/lib/ai-tunnel/get-more-recommendations-by-many-npas";
import { GetNpaDetails } from "@/lib/ai-tunnel/get-npa-details";
import { GetNpaRules } from "@/lib/ai-tunnel/get-npa-rules";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const npaRouter = createTRPCRouter({
  getAllByTS: publicProcedure
    .input(z.object({ description: z.string(), title: z.string() }))
    .query(async ({ input: { description, title } }) => {
      return await GetNpaRules(description, title);
    }),
  getNpaInfoById: protectedProcedure
    .input(
      z.object({
        npa: z.string(),
      }),
    )
    .query(async ({ input: { npa } }) => {
      return await GetNpaDetails(npa);
    }),

  getRecommendationsForTS: protectedProcedure
    .input(
      z.object({
        npa: z.string(),
        description: z.string(),
      }),
    )
    .query(async ({ input: { npa, description } }) => {
      return await GetMoreRecommendations(npa, description);
    }),
  getRecommendationsForTSByManyNPAs: protectedProcedure
    .input(
      z.object({
        npas: z.array(z.string()),
        description: z.string(),
      }),
    )
    .query(async ({ input: { npas, description } }) => {
      return await GetMoreRecommendationsByManyNpas(npas, description);
    }),
});
