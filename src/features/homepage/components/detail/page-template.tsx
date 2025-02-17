"use client";

import React, { useState, useEffect } from "react";
// components
import { HomepageDetailDrawer } from "@/features/homepage/components/detail/drawer";
import { DrawerFallback } from "@/features/homepage/components/drawer-fallback";
// actions
import { fetchAllData } from "@/features/homepage/actions/fetch-all-data";
// utils
import { checkAccountRole } from "@/utils/auth/check-account-role";
import { checkAuthor } from "@/features/homepage/actions/check-author";
// types
import { FetchHomepageWithPagesAndSections } from "@/features/homepage/queries/define-fetch-homepage-with-sections-query";

interface HomepageDetailPageProps {
  homepage_id: string;
}

export function HomepageDetailPageTemplate({
  homepage_id,
}: HomepageDetailPageProps) {
  const [data, setData] = useState<
    null | FetchHomepageWithPagesAndSections[number]
  >(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const accountRole = await checkAccountRole();
      const { data } = await fetchAllData(homepage_id);
      const homepageProfileId = data?.profile_id;
      let isAuthor = false;
      if (homepageProfileId) {
        isAuthor = await checkAuthor(homepageProfileId);
      }
      const editable = isAuthor || accountRole === "ADMIN";

      setData(data);
      setEditable(editable);
      setLoading(false);
    }
    loadData();
  }, [homepage_id]);

  if (loading) {
    // Drawer UI은 먼저 표시되며 내부에 로딩 상태를 보여줍니다.
    return <DrawerFallback />;
  }

  return <HomepageDetailDrawer data={data} editable={editable} />;
}
