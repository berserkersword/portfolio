import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log(`\n🚀 MIDDLEWARE ISHLADI → ${request.method} ${pathname}`);

  // API route larda ham log chiqsin
  if (pathname.startsWith('/api')) {
    console.log("📡 Bu API so‘rovi");
  }

  const headers = request.headers;
  const ip = request.ip || 
             headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             "unknown";

  console.log("🌐 IP:", ip);
  console.log("🔎 User-Agent:", headers.get("user-agent")?.slice(0, 80) + "...");

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",           // hamma narsa
    "/api/:path*",       // aniq API lar uchun
  ],
};