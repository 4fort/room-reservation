"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

type BookRoomProps = {
  roomId: number;
};

export default function BookRoom({ roomId }: BookRoomProps) {
  const router = useRouter();

  return (
    <Button
      className="bg-primary p-3 text-primary-foreground hover:bg-primary/90"
      onClick={() => router.push(`/booking/?room=${roomId}`)}
    >
      Book now
    </Button>
  );
}
