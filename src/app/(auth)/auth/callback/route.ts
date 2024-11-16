// OAuth login callback route for Supabase
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!sessionError) {
      // if the user doesn't have profile data yet, send them to the onboarding page
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", sessionData.user.id);

      if (!profiles) {
        next = "/onboarding";
        const {  } = await supabase
          .from("profiles")
          .insert([
            {
              user_id: sessionData.user.id,
              // profile_image_url: sessionData.user.user_metadata.avatar_url,
              // name: sessionData.user.user_metadata.full_name,
            },
          ])
          .select();
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}/login?message=${encodeURIComponent(
      "Login failed. Please try again."
    )}`
  );
}
