import { HomepageDetailPageTemplate } from "@/app/(main)/homepages/[homepage_id]/_components/page-template";

export default async function DrawerPage({
  params,
}: {
  params: { homepage_id: string };
}) {
  return <HomepageDetailPageTemplate homepage_id={params.homepage_id} />;
}
