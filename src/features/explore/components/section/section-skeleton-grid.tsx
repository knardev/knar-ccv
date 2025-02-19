"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function SectionSkeletonGrid() {
  // 예시로 6개의 skeleton 카드를 렌더링 (원하는 개수로 조정 가능)
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-3 gap-2">
      {skeletons.map((_, index) => (
        <div key={index} className="border border-muted rounded shadow-sm p-4">
          {/* 이미지 영역을 모방 */}
          <Skeleton className="w-full h-40 rounded" />
          {/* 카드 하단 텍스트 영역 모방 */}
          <div className="mt-2 space-y-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
