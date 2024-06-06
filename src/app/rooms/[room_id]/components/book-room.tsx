"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

type BookRoomProps = {
  roomId: number;
  isAuthenticated: boolean;
};

export default function BookRoom({ roomId, isAuthenticated }: BookRoomProps) {
  const router = useRouter();

  return (
    <Button
      className="bg-primary p-3 text-primary-foreground hover:bg-primary/90"
      onClick={() => {
        if (isAuthenticated) router.push(`/booking?room=${roomId}`);
        else router.push(`/login?callbackUrl=\/rooms\/${roomId}`);
      }}
    >
      Book now
    </Button>
  );
}
