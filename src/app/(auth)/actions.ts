"use server";
// auth error code: https://supabase.com/docs/reference/javascript/auth-error-codes

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helpers";
import { cookies } from "next/headers";

export async function signInWithEmailPassword(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(
      `/login?message=${encodeURIComponent(
        "이메일 또는 비밀번호를 다시 확인해주세요."
      )}`
    );
  }

  const cookieJar = cookies();
  cookieJar.set("lastSignedInMethod", "email");

  revalidatePath("/");
  redirect("/");
}

export async function signInWithMagicLink(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: false,
      emailRedirectTo: getURL("/auth/confirm"),
    },
  };

  const { error } = await supabase.auth.signInWithOtp(data);
  if (error) {
    if (error?.code === "user_not_found") {
      redirect(
        `/login?message=${encodeURIComponent(
          "회원 정보가 존재하지 않습니다. 회원가입을 진행해주세요."
        )}`
      );
    }
    redirect(
      `/login?message=${encodeURIComponent("이메일을 다시 확인해주세요.")}`
    );
  }

  const cookieJar = cookies();
  cookieJar.set("lastSignedInMethod", "magicLink");

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: getURL("/auth/confirm"),
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(
      `/login?message=${encodeURIComponent(
        "회원가입에 실패했습니니다. 다시 시도해주세요."
      )}`
    );
  }

  const cookieJar = cookies();
  cookieJar.set("lastSignedInMethod", "email");

  revalidatePath("/", "layout");
  redirect("/email-verification"); // email-verification 으로 이동
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut({ scope: "local" });
  revalidatePath("/", "layout");
  redirect("/", RedirectType.push);
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect(
      `/login?message=${encodeURIComponent(
        "서버에 문제가 발생했습니다. 다시 시도해주세요."
      )}`
    );
  }

  const supabase = createClient();
  const redirectUrl = getURL("/auth/callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        // we need this to be able to select an account from google consent page when logging in after logging out
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    redirect(`/login?message=${encodeURIComponent("로그인에 실패했습니다.")}`);
  }

  const cookieJar = cookies();
  cookieJar.set("lastSignedInMethod", provider);

  return redirect(data.url);
}
