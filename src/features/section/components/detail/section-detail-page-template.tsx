// features/section/components/detail/section-detail-page-template.tsx
"use client";

// hooks
import React, { useState, useEffect } from "react";
// components
import { SectionDetailDrawer } from "@/features/section/components/detail/section-detail-drawer";
// actions
import { SectionDetailFallback } from "@/features/section/components/section-detail-fallback";
import { fetchSectionWithHomepage } from "@/features/section/actions/fetch-section";
// types
import { FetchSectionWithHomepage } from "@/features/section/queries/define-fetch-section-with-homepage-query";

interface SectionDetailPageTemplateProps {
  section_id: string;
}

export function SectionDetailPageTemplate({
  section_id,
}: SectionDetailPageTemplateProps) {
  const [data, setData] = useState<FetchSectionWithHomepage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await fetchSectionWithHomepage(section_id);
      setData(result);
      setLoading(false);
    }
    loadData();
  }, [section_id]);

  if (loading) {
    return <SectionDetailFallback />;
  }

  return <SectionDetailDrawer data={data} />;
}
