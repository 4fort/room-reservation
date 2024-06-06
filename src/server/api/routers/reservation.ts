import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { api } from "~/trpc/server";

export const reservationRouter = createTRPCRouter({
  bookReservation: publicProcedure
    .input(
      z.object({
        start_date: z.date(),
        end_date: z.date(),
        note: z.string().optional(),
        room_id: z.coerce.number(),
        user_id: z.coerce.number(),
        payment_method_id: z.coerce.number(),
        amount: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const payment = await ctx.db.reservation.create({
        data: {
          start_datetime: input.start_date,
          end_datetime: input.end_date,
          reservation_notes: input.note,
          room_id: input.room_id,
          user_id: input.user_id,
          payment: {
            create: {
              amount: input.amount,
              payment_method_id: input.payment_method_id,
            },
          },
        },
      });

      if (!payment) return { success: false };

      await ctx.db.roomAvailability.update({
        where: {
          room_id: input.room_id,
        },
        data: {
          available_count: {
            decrement: 1,
          },
        },
      });

      return { success: true };
    }),

  getReservations: publicProcedure.query(async ({ ctx }) => {
    const user_id: number = await api.auth.getID();

    const reservations = await ctx.db.reservation.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        rooms: {
          include: {
            locations: true,
          },
        },
        payment: {
          include: {
            payment_methods: true,
          },
        },
      },
    });

    return reservations.map((reservation) => ({
      ID: reservation.id,
      RoomNumber: reservation.rooms.room_number,
      StartingDate: reservation.start_datetime,
      EndingDate: reservation.end_datetime,
      ReservationNotes: reservation.reservation_notes,
      AmountPaid: reservation.payment?.amount,
      PaymentMethod: reservation.payment?.payment_methods.method_name,
      Location: [
        reservation.rooms.locations.location_name,
        reservation.rooms.locations.address,
        reservation.rooms.locations.city,
        reservation.rooms.locations.state,
        reservation.rooms.locations.country,
      ]
        .filter(Boolean)
        .join(", "),
    }));
  }),
});
