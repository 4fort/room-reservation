import Image from "next/image";
import React from "react";

const Members = [
  {
    id: 2,
    name: "James Christian Montealto",
    image: "/james.jpg",
  },
  {
    id: 1,
    name: "Dexter Fort Silva",
    image: "/fort.jpg",
  },
  {
    id: 3,
    name: "Jell Langam",
    image: "/jell.jpg",
  },
];

export default function About() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <h1 className="text-4xl">About</h1>
      <div className="grid grid-cols-3 gap-7 p-20">
        {Members.map((member) => (
          <div className="flex flex-col items-center gap-2" key={member.id}>
            <Image
              src={`/members${member.image}`}
              alt={member.name}
              width={200}
              height={200}
              className="rounded-full"
            />
            <h1 className="text-2xl">{member.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
