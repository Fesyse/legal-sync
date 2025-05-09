import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { npaRouter } from "./routers/npa";
import { technicalSpecificationRouter } from "./routers/technical-specification";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  technicalSpecification: technicalSpecificationRouter,
  npa: npaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
