import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookie = cookies().get("authorization");

  if (!cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);
    console.log(payload);
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/profile/:path*",
};
