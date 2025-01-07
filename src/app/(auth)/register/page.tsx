import { cookies } from "next/headers";
import {
  signInWithEmailPassword,
  // signInWithMagicLink,
  signUp,
} from "../actions";
import Link from "next/link";
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
          <CardTitle className="text-2xl">회원가입</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <OAuthButtons lastSignedInMethod={lastSignedInMethod} />
          <Separator className="my-2" />
          <form id="login-form" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@knarccv.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
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
              variant="default"
            >
              회원가입
              {lastSignedInMethod === "email" && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-8 bg-accent px-4 py-1 rounded-md text-xs text-foreground/80">
                  <div className="absolute -left-5 top-0 border-background border-[12px] border-r-accent" />
                  최근 로그인
                </div>
              )}
            </Button>
          </form>
          <Separator className="my-2" />
          <div className="text-center text-sm">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" passHref>
              <Button variant="link">로그인</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
