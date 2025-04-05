import { z } from "zod";

import { npaSchema, STATUS } from "@/lib/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createCuid, technicalSpecification } from "@/server/db/schema";
// import { messages, threads } from "@/server/db/schema";

export const technicalSpecificationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        npa: z.array(npaSchema),
        status: z.enum(STATUS),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const id = createCuid();
      await ctx.db.insert(technicalSpecification).values({
        ...input,
        id,
        userId: ctx.session?.user?.id!,
        npa: input.npa.map((npa) => npa.name),
      });
      return {
        success: true,
        code: 201,
        message: "Техническое задание успешно создано",
        id,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.technicalSpecification.findMany();
  }),
});
