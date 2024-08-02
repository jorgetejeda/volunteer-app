import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// API Paths to be restricted.
const protectedRoutes = ["/", "/panel", "/events"];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("Calling route:", pathname);

  // if (pathname.startsWith("/authentication")) {
  //   return NextResponse.next();
  // }
  //
  // const isValid = protectedRoutes.some((path) => pathname.startsWith(path));
  // if (isValid) {
  //   const token = await getToken({
  //     req: request,
  //   });
  //   // check not logged in.
  //   if (!token) {
  //     const url = new URL("/authentication", request.url);
  //     return NextResponse.redirect(url);
  //   }
  // }
  return NextResponse.next();
}
