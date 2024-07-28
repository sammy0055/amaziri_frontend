import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appEnums, CookiesKeys } from "./types/common";

export async function middleware(request: NextRequest) {
  console.log("testing middleware", request.url, request.nextUrl.pathname);

  const token = request.cookies.get(CookiesKeys.AMAZIRI_IDTOKEN);
  if (!token?.value) {
    return NextResponse.redirect(
      new URL(
        `/login?${appEnums.CONTINUEURL}=${request.nextUrl.pathname}`,
        request.url
      )
    );
  }

  const exp = request.cookies.get(CookiesKeys.AMAZIRI_IDTOKEN_EXP);
  if (!exp?.value) {
    return NextResponse.redirect(
      new URL(
        `/login?${appEnums.CONTINUEURL}=${request.nextUrl.pathname}`,
        request.url
      )
    );
  }

  const expiresIn = parseInt(exp?.value) * 1000 - Date.now();
  if (expiresIn < 5 * 60 * 1000) {
    // e.g., 5 minutes
    return NextResponse.redirect(
      new URL(
        `/refresh_token?${appEnums.CONTINUEURL}=${request.nextUrl.pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// "/home/:path*"
export const config = {
  matcher: ["/home"],
};
