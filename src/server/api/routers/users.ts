import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getNumberOfUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.count({
      where: {
        role: "USER",
      },
    });
  }),
});
