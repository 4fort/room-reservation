import { BedDouble, Ticket, Users } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";

const SummaryCards = [
  {
    id: 1,
    title: "Customers",
    url: "/dashboard/customers",
    count: [
      {
        name: "Active",
        value: await api.users.getNumberOfUsers(),
      },
    ],
    icon: <Users />,
  },
  {
    id: 2,
    title: "Reservations",
    url: "/dashboard/reservations",
    count: [
      {
        name: "Active",
        value: await api.reservation.getNumberOfReservations(),
      },
    ],
    icon: <Ticket />,
  },
  {
    id: 3,
    title: "Rooms",
    url: "/dashboard/rooms",
    count: [
      {
        name: "Available",
        value: await api.rooms.getAllRoomCount(),
      },
      {
        name: "All",
        value: await api.rooms.getAvailableRoomCount(),
      },
    ],
    icon: <BedDouble />,
  },
];

export default async function Dashboard() {
  return (
    <React.Fragment>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-primary md:text-2xl">
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {SummaryCards.map((card) => (
          <SummaryCard
            key={card.id}
            title={card.title}
            url={card.url}
            count={card.count}
            icon={card.icon}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

type SummaryCardProps = {
  title: string;
  url: string;
  count: {
    name: string;
    value: number;
  }[];
  icon: React.ReactNode;
};

async function SummaryCard({ title, url, count, icon }: SummaryCardProps) {
  return (
    <Card className="flex flex-col rounded-xl">
      <CardHeader>
        <div className="flex items-center gap-2 text-xl font-bold text-primary">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-auto flex-col justify-end ">
        {count.map((c) => (
          <div className="grid w-full grid-cols-2" key={c.name}>
            <p className="text-muted-foreground">{c.name}</p>
            <p className="self-end text-end text-xl font-semibold">{c.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
