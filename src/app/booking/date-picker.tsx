"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { DateRangePicker } from "~/components/extension/date-range-picker";

interface DateRange {
  from: Date;
  to: Date | undefined;
}

export default function DatePicker({ roomPrice }: { roomPrice: number }) {
  const today = new Date();

  const [from, setFrom] = useState<Date>(() => today);
  const [to, setTo] = useState<Date>(() => today);
  const [totalAmount, setTotalAmount] = useState<number>(() => roomPrice);

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = (values: { range: DateRange }) => {
    const { from, to } = values.range;
    setFrom(from);
    setTo(to ?? from);

    if (to && from) {
      const dayDifference =
        (to.getTime() - from.getTime()) / (1000 * 3600 * 24);
      const totalDays = dayDifference + 1; // to include the end date as well
      setTotalAmount(totalDays * roomPrice);
    }
  };

  return (
    <>
      <input
        type="date"
        name="start_date"
        value={formatDateForInput(from)}
        hidden
      />
      <input
        type="date"
        name="end_date"
        value={formatDateForInput(to)}
        hidden
      />
      <DateRangePicker
        onUpdate={handleUpdate}
        align="start"
        locale={Intl.DateTimeFormat().resolvedOptions().locale}
        showCompare={false}
      />

      <div className="">
        <Label className="text-sm font-medium">Total</Label>
        <p className="text-lg font-bold">₱{totalAmount}</p>
      </div>
    </>
  );
}
