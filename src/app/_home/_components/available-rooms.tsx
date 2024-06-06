import { Button } from "~/components/ui/button";
import React from "react";

import {
  BedDouble,
  Dumbbell,
  ParkingCircle,
  Tv2,
  Waves,
  Wifi,
} from "lucide-react";
import { api } from "~/trpc/server";
import Image from "next/image";
import { Router } from "next/router";
import BookNowButton from "./book-now-button";

const AmenityIcons = [
  {
    id: 1,
    icon: <Waves className="mr-2 h-5 w-5 text-gray-400" />,
  },
  {
    id: 2,
    icon: <Wifi className="mr-2 h-5 w-5 text-gray-400" />,
  },
  {
    id: 3,
    icon: <Dumbbell className="mr-2 h-5 w-5 text-gray-400" />,
  },
  {
    id: 4,
    icon: <ParkingCircle className="mr-2 h-5 w-5 text-gray-400" />,
  },
  {
    id: 5,
    icon: <Tv2 className="mr-2 h-5 w-5 text-gray-400" />,
  },
];

export default async function AvailableRooms() {
  const rooms = await api.rooms.getAll({});

  return (
    <React.Fragment>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms?.map((room) => (
          <div
            key={room.ID}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
          >
            <Image
              src={
                room.Images[0]
                  ? `/${room.ID}/${room.Images[0]}`
                  : "/Organic-modern-bedroom-House-and-Hold.jpg"
              }
              alt="Room thumbnail"
              width={800}
              height={900}
              className="h-56 w-full object-cover"
            />
            <div className="flex flex-auto flex-col justify-between p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">
                  Room {Number(room.RoomNumber)}
                </h3>
                <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <BedDouble className="h-5 w-5" />{" "}
                  {Number(room.AvailableCount)}
                </span>
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Sleeps {room.RoomCapacity} | {room.RoomType} | {room.Location}
              </p>
              <div className="mt-4 flex items-center">
                {room.AmenityID.map(
                  (id) =>
                    AmenityIcons.find((icon) => icon.id === Number(id))?.icon,
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-2xl font-bold">
                  ₱{Number(room.Price)}/night
                </p>
                <BookNowButton roomId={Number(room.ID)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
