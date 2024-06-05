/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iklqNUvT3dT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// "use client";

import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import React from "react";

import AvailableRooms from "./_components/available-rooms";
import Image from "next/image";
import { api } from "~/trpc/server";
import Link from "next/link";

export default function Component() {
  const availableRoomCount = api.rooms.getAvailableRoomCount();

  return (
    <React.Fragment>
      <div className="flex h-[70vh] w-full grid-cols-1 flex-col gap-8 border-b lg:grid-cols-2 lg:flex-row">
        <div className="mx-auto grid items-center py-12 ps-4 sm:py-16 sm:ps-6 lg:py-20 lg:ps-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Find your perfect stay
            </h1>
            <h6 className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Search, book, and enjoy your next adventure.
            </h6>
          </div>
        </div>
        <div className="relative h-full w-full lg:w-1/2">
          <Image
            src="/Organic-modern-bedroom-House-and-Hold.jpg"
            alt="Placeholder"
            width={1100}
            height={1000}
            className="h-full w-full object-cover"
          />
          <div className="absolute -left-32 bottom-12 hidden md:grid">
            <div className="mx-auto flex divide-x bg-primary-foreground px-8 py-6 shadow-lg">
              <p className="pe-8">Current available rooms</p>
              <p className="px-8">{availableRoomCount}</p>
              <div className="ps-8">
                <Link
                  href="/rooms"
                  className="bg-primary p-3 text-primary-foreground hover:bg-primary/90"
                >
                  Book a room
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Available Rooms
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Browse our selection of comfortable and stylish rooms.
        </p>
        <AvailableRooms />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Book Your Stay
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Fill out the form to complete your reservation.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" type="text" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" type="text" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" type="text" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiration">Expiration</Label>
                      <Input id="expiration" type="text" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" type="text" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" type="text" />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button>Complete Booking</Button>
        </div>
      </div>
    </React.Fragment>
  );
}
