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

import {
  Bath,
  Calendar,
  Coffee,
  DollarSign,
  Locate,
  Search,
  Sofa,
  Tv,
  Wifi,
} from "lucide-react";
import AvailableRooms from "./_components/available-rooms";

export default function Component() {
  return (
    <React.Fragment>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Find your perfect stay
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Search, book, and enjoy your next adventure.
            </p>
            <form className="mt-8 flex items-center space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Location
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 sm:text-sm"
                    placeholder="Enter a city or region"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <Locate className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Date
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="date"
                    id="date"
                    className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 sm:text-sm"
                    placeholder="Check-in - Check-out"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Price
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 sm:text-sm"
                    placeholder="Price range"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </button>
            </form>
          </div>
          <div>
            <img
              src="/placeholder.svg"
              alt="Room reservation"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
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
