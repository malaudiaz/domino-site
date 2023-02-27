import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const session = await getToken({ req: req, secret: process.env.TOKEN_SECRET }); 

  if (!session) return NextResponse.redirect(new URL("/login", req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
};