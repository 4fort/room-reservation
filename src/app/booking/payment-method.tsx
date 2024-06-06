"use client";

import React, { useState } from "react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

type PaymentMethodProps = {
  methods: {
    id: bigint;
    method_name: string;
  }[];
};

export default function PaymentMethod({ methods }: PaymentMethodProps) {
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState("1");

  return (
    <RadioGroup defaultValue={"1"} onValueChange={setselectedPaymentMethod}>
      <input
        type="text"
        name="payment_method_id"
        value={selectedPaymentMethod}
        hidden
      />
      {methods.map((method) => (
        <div className="flex items-center space-x-2" key={method.id}>
          <RadioGroupItem value={String(method.id)} id={method.method_name} />
          <Label htmlFor={method.method_name}>{method.method_name}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
