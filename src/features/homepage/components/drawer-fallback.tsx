// app/homepage/[homepage_id]/drawer-fallback.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// 단순 로딩 상태의 UI 또는 skeleton UI를 구성합니다.
export function DrawerFallback() {
  return (
    <div className="h-[80vh]">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
    </div>
  );
}
