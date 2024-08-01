import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  console.log('Middleware cookies:', request.cookies)
}
