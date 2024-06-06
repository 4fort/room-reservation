import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import DatePicker from "./date-picker";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import PaymentMethod from "./payment-method";
import { api } from "~/trpc/server";
import SubmitButton from "../_components/submit-button";
import { redirect } from "next/navigation";

export default async function Payment({
  searchParams,
}: {
  searchParams: { room: string };
}) {
  const paymentMethods = await api.payment.getPaymentMethods();
  const roomPrice = await api.rooms.getRoomPrice(searchParams.room);
  const getUserID = await api.auth.getID();

  const onSubmit = async (formData: FormData) => {
    "use server";
    const sDate = new Date(formData.get("start_date") as unknown as string);
    const eDate = new Date(formData.get("end_date") as unknown as string);
    const diffDays = Math.abs(eDate.getDate() - sDate.getDate());

    const body = {
      start_date: new Date(formData.get("start_date") as string) || new Date(),
      end_date: new Date(formData.get("end_date") as string) || new Date(),
      note: formData.get("note") as string | undefined,
      payment_method_id: Number(formData.get("payment_method_id")),
      room_id: Number(searchParams.room),
      user_id: getUserID,
      amount: !diffDays
        ? Number(roomPrice!)
        : (diffDays + 1) * Number(roomPrice!),
    };

    const bookReservation = await api.reservation.bookReservation(body);

    if (bookReservation.success) {
      redirect("/reservations");
    }

    console.log(body);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Payment</CardTitle>
        </CardHeader>
        <form action={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            <DatePicker roomPrice={Number(roomPrice!)} />
            <div className="">
              <Label htmlFor="note">Note</Label>
              <Input name="note" />
            </div>
            <PaymentMethod methods={paymentMethods} />
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
