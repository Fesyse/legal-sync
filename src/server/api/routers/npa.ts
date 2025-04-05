import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { technicalSpecification } from "@/server/db/schema";
// import { messages, threads } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  createNpa: publicProcedure
    .input(
      z.object({
        ts: z.string(),
        user_id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(technicalSpecification).values({
        technicalSpecification: input.ts,
        userId: input.user_id,
        npa: "",
      });
    }),
});
