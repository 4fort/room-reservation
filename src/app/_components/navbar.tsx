import Link from "next/link";
import React from "react";

export function Navbar() {
  return (
    <nav className="absolute flex h-16 w-1/2 border-b  px-5 py-2">
      <h1 className="text-4xl text-primary">
        <Link href="/">JFJ</Link>
      </h1>
      <ul className="flex flex-auto items-center justify-center gap-8 text-foreground/50 ">
        <li>
          <Link href="/about" className="hover:text-foreground/80">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-foreground/80">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/rooms" className="hover:text-foreground/80">
            Available Rooms
          </Link>
        </li>
      </ul>
    </nav>
  );
}
