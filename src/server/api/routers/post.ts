import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { messages, threads } from "@/server/db/schema";

export const postRouter = createTRPCRouter({});
