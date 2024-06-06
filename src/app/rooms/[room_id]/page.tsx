import {
  BedDouble,
  Dumbbell,
  MapPin,
  MoonStar,
  ParkingCircle,
  Tv2,
  Users2,
  Waves,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { api } from "~/trpc/server";

import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from "~/components/extension/carousel";
import BookRoom from "./components/book-room";

const ImagePlaceholders = [
  "/Organic-modern-bedroom-House-and-Hold.jpg",
  "/Organic-modern-bedroom-House-and-Hold.jpg",
  "/Organic-modern-bedroom-House-and-Hold.jpg",
  "/Organic-modern-bedroom-House-and-Hold.jpg",
  "/Organic-modern-bedroom-House-and-Hold.jpg",
];

const AmenityIcons = [
  {
    id: 1,
    icon: <Waves className=" h-5 w-5" />,
  },
  {
    id: 2,
    icon: <Wifi className=" h-5 w-5" />,
  },
  {
    id: 3,
    icon: <Dumbbell className=" h-5 w-5" />,
  },
  {
    id: 4,
    icon: <ParkingCircle className=" h-5 w-5" />,
  },
  {
    id: 5,
    icon: <Tv2 className=" h-5 w-5" />,
  },
];

export default async function RoomBooking({
  params,
}: {
  params: { room_id: string };
}) {
  const room = await api.rooms.getSingleRoom(params.room_id);

  const user: number = await api.auth.getID();

  if (!room) redirect("/");
  return (
    <main className="w-full">
      <div className="relative h-[500px] w-full">
        <Image
          src="/Organic-modern-bedroom-House-and-Hold.jpg"
          alt="Placeholder"
          width={1100}
          height={1000}
          className="h-full w-full object-cover"
        />

        <div className="absolute -bottom-10 right-32 z-10 hidden md:grid">
          <div className="mx-auto flex items-center divide-x bg-primary-foreground p-6 shadow-lg">
            <div className="flex flex-col pe-8">
              <span className="font-bold text-primary">Price per night</span>
              <h6 className="flex items-center gap-2 text-muted-foreground">
                <MoonStar className="h-5 w-5" />₱{Number(room?.Price)}
              </h6>
            </div>
            <div className="px-8">
              <span className="font-bold text-primary">Capacity</span>
              <h6 className="flex items-center gap-2 text-muted-foreground">
                <Users2 className="h-5 w-5" /> {room?.RoomCapacity}
              </h6>
            </div>
            <div className="px-8">
              <span className="font-bold text-primary">
                Current available rooms
              </span>
              <h6 className="flex items-center gap-2 text-muted-foreground">
                <BedDouble className="h-5 w-5" />
                {room?.AvailableCount}
              </h6>
            </div>
            <div className="ps-8">
              <BookRoom
                roomId={Number(room?.ID)}
                isAuthenticated={user > 0 ? true : false}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 grid h-full grid-cols-2 items-center bg-gradient-to-tr from-black/80 to-transparent">
          <div className="mx-auto w-full px-4 py-12 text-white/70 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <h1 className="text-8xl font-bold leading-tight tracking-tight">
              Room {room?.RoomNumber.toString()}
            </h1>
            <h6 className="text-3xl font-bold leading-tight tracking-tight">
              {room?.RoomType.toString()}
            </h6>
            <div className="mt-4 flex items-center divide-x">
              {room?.AmenityID.map((id) => (
                <div className="px-4" key={id}>
                  {AmenityIcons.find((icon) => icon.id === Number(id))?.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between">
          <div className="">
            <h5 className="text-4xl">Description</h5>
            <p className="px-4 text-accent-foreground/80">
              {room?.RoomDescription}
            </p>
          </div>
          <div className="">
            <h5 className="text-4xl">Location</h5>
            <p className="px-4 text-accent-foreground/80">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> {room?.Location}
              </span>
            </p>
          </div>
          <div className="">
            <h5 className="text-4xl">Amenities</h5>
            <ul className="px-4 text-accent-foreground/80">
              {room?.AmenityID.map((id, i) => (
                <li key={id} className="flex items-center gap-2">
                  {AmenityIcons.find((icon) => icon.id === Number(id))?.icon}
                  {room.AmenityDescription[i]}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ImagesCard />
      </div>
    </main>
  );
}

const ImagesCard = () => {
  return (
    <Carousel>
      <CarouselNext className="top-1/3 -translate-y-1/3" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3" />
      <CarouselMainContainer className="h-60">
        {ImagePlaceholders.map((_, index) => (
          <SliderMainItem key={index} className="bg-transparent">
            <div className="flex size-full items-center justify-center overflow-clip rounded-xl bg-background outline outline-1 outline-border">
              <Image
                src={ImagePlaceholders[index]!}
                alt="Placeholder"
                width={1100}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {ImagePlaceholders.map((_, index) => (
          <SliderThumbItem key={index} index={index} className="bg-transparent">
            <div className="flex size-full items-center justify-center overflow-clip rounded-xl bg-background outline outline-1 outline-border">
              <Image
                src={ImagePlaceholders[index]!}
                alt="Placeholder"
                width={110}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};
