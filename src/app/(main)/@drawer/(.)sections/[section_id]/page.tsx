// app/section/[section_id]/page.tsx
import React from "react";
import { SectionDetailPageTemplate } from "@/features/section/components/detail/section-detail-page-template";

interface SectionDetailPageProps {
  params: { section_id: string };
}

export default function SectionDetailPage({
  params: { section_id },
}: SectionDetailPageProps) {
  return <SectionDetailPageTemplate section_id={section_id} />;
}
