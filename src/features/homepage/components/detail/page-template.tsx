import React from "react";
// components
import { HomepageDetailDrawer } from "./drawer";
// actions
import { fetchAllData } from "@/features/homepage/actions/fetch-all-data";
// utils
import { checkAccountRole } from "@/utils/auth/check-account-role";
import { checkAuthor } from "@/features/homepage/utils/check-author";

interface HomepageDetailPageProps {
  homepage_id: string;
}

export async function HomepageDetailPageTemplate({
  homepage_id,
}: HomepageDetailPageProps) {
  const accountRole = await checkAccountRole();

  const { data } = await fetchAllData(homepage_id);
  const homepageProfileId = data?.profile_id;

  let isAuthor = false;
  if (homepageProfileId) {
    isAuthor = await checkAuthor(homepageProfileId);
  }

  const editable = isAuthor || accountRole === "ADMIN";

  return <HomepageDetailDrawer data={data} editable={editable} />;
}
