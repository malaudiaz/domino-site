import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {

  const jwt = req.cookies.get('SmartDomino-Token');

  console.log(jwt);

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET));
    console.log(payload);
    
    return NextResponse.next();
  } catch (error) {
    console.log("middleware => ", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

}

export const config = {
  matcher: ["/", "/profile/:path*", "/event/:path*", "/tourney/:path*"],
};