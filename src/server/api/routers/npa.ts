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
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const technicalSpecification =
        await ctx.db.query.technicalSpecification.findFirst({
          where: (technicalSpecification, { eq }) =>
            eq(technicalSpecification.id, id),
        });

      if (!technicalSpecification) {
        throw new Error("Техническое задание не найдено");
      }

      return await GetNpaRules(
        technicalSpecification.description,
        technicalSpecification.title,
      );
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
    .input(z.object({ id: z.string(), npa: z.string() }))
    .query(async ({ ctx, input: { id, npa } }) => {
      const technicalSpecification =
        await ctx.db.query.technicalSpecification.findFirst({
          where: (technicalSpecification, { eq }) =>
            eq(technicalSpecification.id, id),
        });

      if (!technicalSpecification) {
        throw new Error("Техническое задание не найдено");
      }

      return await GetMoreRecommendations(
        npa,
        technicalSpecification.description,
      );
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
