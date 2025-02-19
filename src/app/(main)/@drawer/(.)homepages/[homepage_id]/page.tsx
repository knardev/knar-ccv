// app/homepage/[homepage_id]/page.tsx (또는 원하는 위치에 배치)
import React from "react";
import { HomepageDetailPageTemplate } from "@/features/homepage/components/detail/page-template";

interface HomepageDetailPageProps {
  params: { homepage_id: string };
}

export default function HomepageDetailPage({
  params: { homepage_id },
}: HomepageDetailPageProps) {
  return <HomepageDetailPageTemplate homepage_id={homepage_id} />;
}
