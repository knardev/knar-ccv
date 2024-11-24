import React from "react";
import { HomepageAddDrawer } from "./drawer";
import { checkAccountRole } from "@/utils/auth/check-account-role";

export async function HomepageAddPageTemplate() {
  const accountRole = await checkAccountRole();

  return <HomepageAddDrawer accountRole={accountRole} />;
}
