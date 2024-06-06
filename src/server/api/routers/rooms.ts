import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const roomsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ limit: z.number().nullish() }))
    .query(async ({ ctx, input }) => {
      const rooms = await ctx.db.room.findMany({
        include: {
          locations: true,
          room_types: true,
          room_amenities: {
            include: {
              amenities: true,
            },
          },
          room_availability: true,
          images: true,
        },
        take: input.limit ?? undefined,
      });

      return rooms.map((room) => ({
        ID: room.id,
        Price: room.price_per_night ?? 0,
        RoomNumber: room.room_number,
        RoomCapacity: room.capacity,
        Location: `${room.locations.address}, ${room.locations.city}, ${room.locations.state}, ${room.locations.country}`,
        RoomType: room.room_types.type_name,
        RoomDescription: room.room_types.description,
        AmenityID: room.room_amenities.map((ra) => ra.amenities.id),
        AmenityName: room.room_amenities.map((ra) => ra.amenities.amenity_name),
        AmenityDescription: room.room_amenities.map(
          (ra) => ra.amenities.description,
        ),
        AvailableCount: room.room_availability?.available_count ?? 0,
        Images: room.images.map((i) => i.image_url) ?? "",
      }));
    }),
  getSingleRoom: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const room = await ctx.db.room.findUnique({
        where: {
          id: Number(input),
        },
        include: {
          locations: true,
          room_types: true,
          room_amenities: {
            include: {
              amenities: true,
            },
          },
          room_availability: true,
          images: true,
        },
      });

      if (!room) return null;

      return {
        ID: room.id,
        Price: room.price_per_night ?? 0,
        RoomNumber: room.room_number,
        RoomCapacity: room.capacity,
        Location: `${room.locations.address}, ${room.locations.city}, ${room.locations.state}, ${room.locations.country}`,
        RoomType: room.room_types.type_name,
        RoomDescription: room.room_types.description,
        AmenityID: room.room_amenities.map((ra) => ra.amenities.id),
        AmenityName: room.room_amenities.map((ra) => ra.amenities.amenity_name),
        AmenityDescription: room.room_amenities.map(
          (ra) => ra.amenities.description,
        ),
        AvailableCount: room.room_availability?.available_count ?? 0,
        Images: room.images.map((i) => i.image_url) ?? "",
      };
    }),
  getAvailableRoomCount: publicProcedure.query(async ({ ctx }) => {
    const roomTotal = await ctx.db.roomAvailability.findMany({
      select: {
        available_count: true,
      },
    });
    const total = roomTotal.reduce((ra, rac) => ({
      available_count: rac.available_count + ra.available_count,
    }));

    console.log(total);

    return total.available_count;
  }),
});
