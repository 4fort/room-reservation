"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { cn } from "~/lib/utils";

export default function Links() {
  const segment = useSelectedLayoutSegment();
  console.log(segment);

  if (segment === "dashboard") return null;

  return (
    <ul
      className={cn(
        "flex flex-auto items-center justify-center gap-8",
        segment === "rooms"
          ? "text-primary-foreground/80"
          : "text-foreground/50",
      )}
    >
      <li>
        <Link
          href="/about"
          className={cn(
            segment
              ? "hover:text-primary-foreground"
              : "hover:text-foreground/80",
          )}
        >
          About
        </Link>
      </li>
      {/* <li>
        <Link
          href="/contact"
          className={cn(
            segment
              ? "hover:text-primary-foreground"
              : "hover:text-foreground/80",
          )}
        >
          Contact
        </Link>
      </li> */}
    </ul>
  );
}
