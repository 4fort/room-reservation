import type { rooms } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const roomsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const rooms = await ctx.db.rooms.findMany({
      include: {
        room_prices: true,
        locations: true,
        room_types: true,
        room_amenities: {
          include: {
            amenities: true,
          },
        },
        room_availability: true,
      },
    });

    return rooms.map((room) => ({
      ID: room.id,
      Price: room.room_prices[0]?.price ?? 0,
      RoomNumber: room.room_number,
      RoomCapacity: room.capacity,
      Location: `${room.locations.address}, ${room.locations.city}, ${room.locations.state}, ${room.locations.country}`,
      RoomType: room.room_types.type_name,
      RoomDescription: room.room_types.description,
      AmenityName: room.room_amenities
        .map((ra) => ra.amenities.amenity_name)
        .join(", "),
      AmenityDescription: room.room_amenities
        .map((ra) => ra.amenities.description)
        .join(", "),
      AvailableCount: room.room_availability[0]?.available_count ?? 0,
      AvailableDate: room.room_availability[0]?.date ?? null,
    }));
  }),
  getHomepage: publicProcedure.query(async ({ ctx }) => {
    const rooms = await ctx.db.rooms.findMany({
      include: {
        room_prices: true,
        locations: true,
        room_types: true,
        room_amenities: {
          include: {
            amenities: true,
          },
        },
        room_availability: true,
      },
      take: 3,
    });

    return rooms.map((room) => ({
      ID: room.id,
      Price: room.room_prices[0]?.price ?? 0,
      RoomNumber: room.room_number,
      RoomCapacity: room.capacity,
      Location: `${room.locations.address}, ${room.locations.city}, ${room.locations.state}, ${room.locations.country}`,
      RoomType: room.room_types.type_name,
      RoomDescription: room.room_types.description,
      AmenityName: room.room_amenities
        .map((ra) => ra.amenities.amenity_name)
        .join(", "),
      AmenityDescription: room.room_amenities
        .map((ra) => ra.amenities.description)
        .join(", "),
      AvailableCount: room.room_availability[0]?.available_count ?? 0,
      AvailableDate: room.room_availability[0]?.date ?? null,
    }));
  }),
});