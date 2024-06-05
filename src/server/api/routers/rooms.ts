import { createTRPCRouter, publicProcedure } from "../trpc";
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
  getAmenities: publicProcedure.query(async ({ ctx }) => {
    const amenities = await ctx.db.amenity.findMany();
    return amenities;
  }),
});
