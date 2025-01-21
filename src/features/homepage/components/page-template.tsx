import React from "react";
// components
import { HomepageDetailDrawer } from "./drawer";
// actions
import { fetchAllData } from "@/features/homepage/actions/fetch-all-data";

interface HomepageDetailPageProps {
  homepage_id: string;
}

export async function HomepageDetailPageTemplate({
  homepage_id,
}: HomepageDetailPageProps) {
  const { accountRole, data } = await fetchAllData(homepage_id);

  return <HomepageDetailDrawer data={data} accountRole={accountRole} />;
}
