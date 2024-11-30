"use client";

import { RecoilRoot } from "recoil";
import { SearchParamsTracker } from "@/components/layout/query-tracker";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsTracker />
      </Suspense>
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
}
