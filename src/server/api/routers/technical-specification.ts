import { z } from "zod";

import { npaSchema, STATUS } from "@/lib/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createCuid, technicalSpecification } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
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
        description: "Здесь вы можете написать ваше техническое задание",
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
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const response = await ctx.db.query.technicalSpecification.findFirst({
        where: eq(technicalSpecification.id, id),
      });

      if (!response) {
        throw new Error("Техническое задание не найдено");
      }

      return response;
    }),

  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, title, description } = input;
      const existingTechnicalSpecification =
        await ctx.db.query.technicalSpecification.findFirst({
          where: eq(technicalSpecification.id, id),
        });
      if (!existingTechnicalSpecification) {
        throw new Error("Техническое задание не найдено");
      }
      if (existingTechnicalSpecification.userId !== ctx?.session?.user?.id!) {
        throw new Error(
          "У вас нет прав для обновления этого технического задания",
        );
      }
      await ctx.db
        .update(technicalSpecification)
        .set({
          title,
          description,
        })
        .where(eq(technicalSpecification.id, id));

      return {
        success: true,
        code: 204,
        message: "Техническое задание успешно обновлено",
      };
    }),
  finishTsById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const existingTechnicalSpecification =
        await ctx.db.query.technicalSpecification.findFirst({
          where: eq(technicalSpecification.id, id),
        });
      if (!existingTechnicalSpecification) {
        throw new Error("Техническое задание не найдено");
      }
      if (existingTechnicalSpecification.userId !== ctx?.session?.user?.id!) {
        throw new Error(
          "У вас нет прав для обновления этого технического задания",
        );
      }
      await ctx.db
        .update(technicalSpecification)
        .set({
          status: "done",
        })
        .where(eq(technicalSpecification.id, id));

      return {
        success: true,
        code: 204,
        message: "Техническое задание успешно завершено",
      };
    }),
});
