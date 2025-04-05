import { z } from "zod";

import { npaSchema, STATUS } from "@/lib/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createCuid, technicalSpecification } from "@/server/db/schema";
import { eq } from "drizzle-orm";
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
  delete: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { ids } = input;
      for (const id of ids) {
        const existingTechnicalSpecification =
          await ctx.db.query.technicalSpecification.findFirst({
            where: eq(technicalSpecification.id, id),
          });
        if (!existingTechnicalSpecification) {
          throw new Error("Техническое задание не найдено");
        }

        if (existingTechnicalSpecification.userId !== ctx?.session?.user?.id) {
          throw new Error(
            "У вас нет прав для удаления этого технического задания",
          );
        }

        await ctx.db
          .delete(technicalSpecification)
          .where(eq(technicalSpecification.id, id));
      }

      return {
        success: true,
        code: 204,
        message: "Техническое задание(-я) успешно удалено(-ы)",
      };
    }),
});
