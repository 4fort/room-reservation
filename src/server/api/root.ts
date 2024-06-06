import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { roomsRouter } from "./routers/rooms";
import { authRouter } from "./routers/auth";
import { paymentRouter } from "./routers/payment";
import { reservationRouter } from "./routers/reservation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  rooms: roomsRouter,
  auth: authRouter,
  payment: paymentRouter,
  reservation: reservationRouter,
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
