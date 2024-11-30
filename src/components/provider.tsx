"use client";
import { RecoilRoot } from "recoil";
import { SearchParamsTracker } from "@/components/layout/query-tracker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchParamsTracker />
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
}
