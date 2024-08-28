import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas protegidas
const protectedRoutes = ["/", "/events", "/panel/"];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;


  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    const token = await getToken({ req: request, secret: secret });


    if (!token) {
      console.log('No token found, redirecting to /login.');
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }

    if (token && token.exp) {
      const expirationDate = new Date(Number(token.exp) * 1000);
      const currentDate = new Date();
      console.log('Token Expiration Date:', expirationDate);
      console.log('Current Date:', currentDate);

      if (currentDate > expirationDate) {
        console.error('Token expired. Redirecting to /logout');
        const url = new URL("/logout", request.url);
        return NextResponse.redirect(url);
      }
    }

    if (pathname.startsWith("/panel")) {
      const userRole = token.user?.role;
      console.log('User Role:', userRole);

      if (userRole !== "Admin") {
        console.error('User not authorized. Redirecting to /');
        const url = new URL("/", request.url);
        return NextResponse.redirect(url);
      }
    }
  }

  console.log('Continuing with request');
  return NextResponse.next();
}

// Especificar las rutas que el middleware debe aplicar
export const config = {
  matcher: ["/", "/events", "/panel/:path*"],
};
