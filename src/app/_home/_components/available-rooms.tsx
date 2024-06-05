import { Button } from "~/components/ui/button";
import React from "react";

import { Bath, Coffee, Sofa, Tv, Wifi } from "lucide-react";
import { api } from "~/trpc/server";
import Image from "next/image";
import Link from "next/link";

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
              src="/placeholder.svg"
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
                <Wifi className="mr-2 h-5 w-5 text-gray-400" />
                <Tv className="mr-2 h-5 w-5 text-gray-400" />
                <Coffee className="mr-2 h-5 w-5 text-gray-400" />
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
