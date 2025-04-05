import { z } from "zod";

import { GetMoreRecommendations } from "@/ai-tunnel/get-more-recommendations";
import { GetNpaDetails } from "@/ai-tunnel/get-npa-details";
import { GetNpaRules } from "@/ai-tunnel/get-npa-rules";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { technicalSpecification } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const npaRouter = createTRPCRouter({
  getAllByTS: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return await GetNpaRules(id);
    }),

  getNpaInfoById: protectedProcedure
    .input(
      z.object({
        npa: z.string(),
      }),
    )
    .query(async ({ ctx, input: { npa } }) => {
      return await GetNpaDetails(npa);
    }),

  getRecommendationsForTS: protectedProcedure
    .input(
      z.object({
        npa: z.string(),
        tsId: z.string(),
      }),
    )
    .query(async ({ ctx, input: { npa, tsId } }) => {
      const data = await ctx.db.query.technicalSpecification.findFirst({
        where: eq(technicalSpecification.id, tsId),
      });
      if (!data)
        return { code: "404", message: "Technical specification not found" };
      return await GetMoreRecommendations(npa, data?.description!);
    }),
});
