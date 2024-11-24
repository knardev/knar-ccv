import React from "react";
import { HomepageDetailDrawer } from "./drawer";
import { fetchHomepageDetailPageData } from "../_actions/fetch-page-data";

interface HomepageDetailPageProps {
  homepage_id: string;
}

export async function HomepageDetailPageTemplate({
  homepage_id,
}: HomepageDetailPageProps) {
  const { accountRole, homepageWithSections } =
    await fetchHomepageDetailPageData(homepage_id);

  return (
    <HomepageDetailDrawer
      data={homepageWithSections}
      accountRole={accountRole}
    />
  );
}
