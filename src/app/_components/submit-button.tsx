"use client";

import { useFormStatus } from "react-dom";
import React from "react";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
}
