"use client";

import React, { useState } from "react";
import { DateRangePicker } from "~/components/extension/date-range-picker";

export default function DatePicker({ roomPrice }: { roomPrice: number }) {
  const [from, setFrom] = useState<string>(new Date().toString());
  const [to, setTo] = useState<string>(new Date().toString());

  return (
    <>
      <input type="date" name="start_date" value={from} hidden />
      <input type="date" name="end_date" value={to} hidden />
      <DateRangePicker
        onUpdate={(values) => {
          setFrom(
            values.range.from.toISOString().split("T")[0] ??
              new Date().toString(),
          );
          setTo(
            values.range.to?.toISOString().split("T")[0] ??
              new Date().toString(),
          );
        }}
        align="start"
        locale={Intl.DateTimeFormat().resolvedOptions().locale}
        showCompare={false}
      />
    </>
  );
}
