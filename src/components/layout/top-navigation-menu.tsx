import React from "react";
import { createClient } from "@/utils/supabase/server";
import { ClientNavigationMenu } from "./client-navigation-menu";

export async function TopNavigationMenu() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="h-16 w-full flex items-center bg-background fixed top-0 z-50">
      <ClientNavigationMenu user={user} />
    </header>
  );
}
