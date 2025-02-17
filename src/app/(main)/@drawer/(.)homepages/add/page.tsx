import React, { Suspense } from "react";
import { HomepageAddPageTemplate } from "@/features/homepage/components/add/page-template";
import { DrawerFallback } from "@/features/homepage/components/drawer-fallback";

export default async function DrawerPage() {
  return (
    <Suspense fallback={<DrawerFallback />}>
      <HomepageAddPageTemplate />
    </Suspense>
  );
}
