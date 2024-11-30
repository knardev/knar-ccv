"use client";

import { useRouter } from "next/navigation";

export function usePreviousSearchParams() {
  const router = useRouter();
  const previousSearchParams = globalThis?.sessionStorage?.getItem(
    "latestExploreParams"
  );

  const moveToPreviousSearchParams = () => {
    router.push(`/explore/homepage/design?${previousSearchParams}`);
  };

  return { previousSearchParams, moveToPreviousSearchParams };
}
