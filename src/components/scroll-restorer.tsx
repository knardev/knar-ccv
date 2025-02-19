"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function ScrollRestorer() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const backto = searchParams.get("backto");
    if (backto) {
      // id="group-{groupKey}"가 붙은 요소로 스크롤
      const element = document.getElementById(`group-${backto}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchParams]);

  return null;
}
