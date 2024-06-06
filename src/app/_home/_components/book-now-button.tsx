"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

type BookNowProps = {
  roomId: number;
};

export default function BookNowButton({ roomId }: BookNowProps) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(`/rooms/${roomId}`)}>Book Now</Button>
  );
}
