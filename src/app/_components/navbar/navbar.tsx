import Link from "next/link";
import React from "react";
import { Actions } from "./actions";
import { cookies } from "next/headers";
import Links from "./links";

export default function Navbar() {
  const cookie = cookies();

  return (
    <header className="absolute z-10 flex h-16 w-full justify-between py-2">
      <nav className="flex w-1/2 border-b">
        <h1 className="ps-5 text-4xl text-primary">
          <Link href="/">JFJ</Link>
        </h1>
        <Links />
      </nav>
      <div className="flex gap-4 pe-5">
        {!cookie.get("authorization") ? (
          <>
            <Link
              href="/login"
              className="m-auto px-3 py-2 opacity-60 outline outline-1 transition-all hover:opacity-100"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="m-auto bg-primary px-3 py-2 text-primary-foreground transition-all hover:bg-primary/90"
            >
              Sign up
            </Link>
          </>
        ) : (
          <Actions />
        )}
      </div>
    </header>
  );
}
