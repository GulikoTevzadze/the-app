import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const publicPaths = ["/", "/api/auth/signin", "/api/auth/signup"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user-id", payload.id);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
