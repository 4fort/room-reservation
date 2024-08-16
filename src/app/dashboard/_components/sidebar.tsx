"use client";

import {
  BedDouble,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Ticket,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export default function Sidebar() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
            !segment ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/dashboard/reservations"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
            segment === "reservations"
              ? "text-primary"
              : "text-muted-foreground",
          )}
        >
          <Ticket className="h-4 w-4" />
          Reservatons
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </Link>
        <Link
          href="/dashboard/rooms"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
            segment === "rooms" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <BedDouble className="h-4 w-4" />
          Rooms
        </Link>
        <Link
          href="/dashboard/customers"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
            segment === "customers" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Users className="h-4 w-4" />
          Customers
        </Link>
        <Link
          href="/dashboard/analytics"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
            segment === "analytics" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <LineChart className="h-4 w-4" />
          Analytics
        </Link>
      </nav>
    </div>
  );
}
