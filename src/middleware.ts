import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas protegidas.
const protectedRoutes = ["/", "/events", "/panel/"];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verificar si la ruta actual es una de las protegidas.
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    const token = await getToken({ req: request });
    
    // Redirigir a /authentication si no hay token.
    if (!token) {
      console.error('Redirecting to /authentication')
      const url = new URL("/authentication", request.url);
      return NextResponse.redirect(url);
    }
  }

  console.log('Continuing with request')

  // Continuar con la solicitud.
  return NextResponse.next();
}

// Especificar las rutas que el middleware debe aplicar.
export const config = {
  matcher: ["/", "/event", "/panel/:path*"],
};
