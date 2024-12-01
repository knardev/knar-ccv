import React from "react";
import { HomepageDetailDrawer } from "./drawer";
import { fetchAllData } from "../_actions/fetch-all-data";

interface HomepageDetailPageProps {
  homepage_id: string;
}

export async function HomepageDetailPageTemplate({
  homepage_id,
}: HomepageDetailPageProps) {
  const { accountRole, data } = await fetchAllData(homepage_id);

  return <HomepageDetailDrawer data={data} accountRole={accountRole} />;
}
