// features/section/components/detail/section-detail-fallback.tsx
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function SectionDetailFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
