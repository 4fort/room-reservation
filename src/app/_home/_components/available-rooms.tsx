import { Button } from "~/components/ui/button";
import React from "react";

import { Dumbbell, ParkingCircle, Tv2, Waves, Wifi } from "lucide-react";
import { api } from "~/trpc/server";
import Image from "next/image";
import Link from "next/link";

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
  const rooms = await api.rooms.getAll({ limit: 3 });

  return (
    <React.Fragment>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms?.map((room) => (
          <div
            key={room.ID}
            className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
          >
            <Image
              src={room.Images[0] ? room.Images[0] : "/placeholder.svg"}
              alt="Room 1"
              width={400}
              height={300}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold tracking-tight">
                {room.RoomNumber}
              </h3>
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
                <Button>Book Now</Button>
              </div>
            </div>
          </div>
        ))}
        <div className="col-span-3 flex justify-center">
          <Link href="/rooms">View All Rooms</Link>
        </div>
      </div>
    </React.Fragment>
  );
}
