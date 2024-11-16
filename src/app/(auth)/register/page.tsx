import { cookies } from "next/headers";
import {
  signInWithEmailPassword,
  // signInWithMagicLink,
  signUp,
} from "../actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { OAuthButtons } from "../oauth-signin";

export default async function login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  console.log(searchParams);
  const cookieJar = cookies();
  const lastSignedInMethod = cookieJar.get("lastSignedInMethod")?.value;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return (
    <section className="h-[calc(100vh-57px)] flex flex-1 flex-col justify-center items-center">
      <Card className="mx-auto min-w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form id="login-form" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nextjs@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                minLength={8}
                name="password"
                id="password"
                type="password"
                placeholder="********"
                required
              />
            </div>
            <Button
              formAction={signInWithEmailPassword}
              className="relative w-full"
            >
              Login
              {lastSignedInMethod === "email" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  Recently signed in
                </div>
              )}
            </Button>
          </form>
          <Separator className="my-2" />
          <OAuthButtons lastSignedInMethod={lastSignedInMethod} />
          {/* <Button
              key={`magic-link`}
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
              formAction={signInWithMagicLink}
            >
              <Send />
              Login with Magic Link
            </Button> */}
          <div className="text-center text-sm">
            처음이신가요?{" "}
            <button formAction={signUp} form="login-form" className="underline">
              회원가입
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
