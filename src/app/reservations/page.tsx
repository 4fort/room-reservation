import React from "react";
import { api } from "~/trpc/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default async function Reservations() {
  const reservations = await api.reservation.getReservations();

  console.log(reservations);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <h1 className="text-4xl">Reservations</h1>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.ID}>
                <TableCell className="font-medium">
                  {Number(reservation.ID)}
                </TableCell>
                <TableCell>{Number(reservation.RoomNumber)}</TableCell>
                <TableCell>{reservation.StartingDate.toDateString()}</TableCell>
                <TableCell>{reservation.EndingDate.toDateString()}</TableCell>
                <TableCell>{reservation.ReservationNotes}</TableCell>
                <TableCell className="text-right">
                  {Number(reservation.AmountPaid)}
                </TableCell>
                <TableCell>{reservation.PaymentMethod}</TableCell>
                <TableCell>{reservation.Location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
