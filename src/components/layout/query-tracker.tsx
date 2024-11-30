// components/SearchParamsTracker.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const SearchParamsTracker: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    storeSearchParams();
  }, [pathname, searchParams, storeSearchParams]);

  function storeSearchParams() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;

    if (pathname.includes("explore")) {
      // Store the latest search params when on an 'explore' page
      const queryString = searchParams.toString();
      storage.setItem("latestExploreParams", queryString);
    }
  }

  return null;
};
