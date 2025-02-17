// 유저가 ADMIN인지 USRE인지 확인하는 함수
"use server";

import { createClient } from "@/utils/supabase/server";

export const checkAccountRole = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "USER";

  const { data, error } = await supabase
    .from("profiles")
    .select("account_role")
    .eq("user_id", user?.id)
    .single();

  if (error) {
    console.error("Error fetching user role:", error);
    throw new Error("Failed to fetch user role");
  }

  return data?.account_role ?? "USER";
};
