import { HomepageDetailPageTemplate } from "./_components/page-template";

export default async function Page({
  params,
}: {
  params: { homepage_id: string };
}) {
  return <HomepageDetailPageTemplate homepage_id={params.homepage_id} />;
}
