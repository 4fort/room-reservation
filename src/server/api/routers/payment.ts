import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const paymentRouter = createTRPCRouter({
  getPaymentMethods: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.paymentMethod.findMany();
  }),
});
