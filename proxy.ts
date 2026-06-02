import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Gate the /admin area (Next 16 "proxy" convention — formerly middleware).
// OPTIMISTIC check only: redirect logged-out users away from /admin. Real
// authorization is RLS (doc 06) + the dashboard's own getUser() check —
// never trust this layer alone.
// Single admin: public sign-up is disabled, so any authenticated session IS the admin.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: getUser() validates the token with Supabase (don't trust getSession alone).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isLogin = path === "/admin/login";

  // Logged-out trying to reach any /admin page (except login) → redirect to login.
  if (!user && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Already logged in but on the login page → send to the dashboard.
  if (user && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Run only on the admin area (the only authenticated surface).
  matcher: ["/admin/:path*"],
};
