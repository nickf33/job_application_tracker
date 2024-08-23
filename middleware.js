import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // If user is signed in and the current path is / redirect the user to /job-list
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/job-list", siteUrl));
  }

  // If user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", siteUrl));
  }

  return res;
}

export const config = {
  matcher: ["/", "/job-list"],
};
