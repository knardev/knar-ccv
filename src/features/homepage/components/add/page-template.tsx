import React from "react";
// components
import { HomepageAddDrawer } from "@/features/homepage/components/add/drawer";
// utils
import { checkAccountRole } from "@/utils/auth/check-account-role";

export async function HomepageAddPageTemplate() {
  const accountRole = await checkAccountRole();

  const addable = accountRole === "ADMIN";

  return <HomepageAddDrawer addable={addable} />;
}
