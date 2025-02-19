"use client";

import React, { useMemo, useRef } from "react";
import { SectionGroup } from "./section-group";
import { FetchSections } from "@/features/explore/queries/define-fetch-section-query";

interface SectionGroupsProps {
  groupKeys: string[];
  groupedSections: Record<string, FetchSections[number][]>;
}

export const SectionGroups: React.FC<SectionGroupsProps> = ({
  groupKeys,
  groupedSections,
}) => {
  // 스크롤 컨테이너에 ref 부여
  const containerRef = useRef<HTMLDivElement>(null);

  // 각 그룹에 대한 ref들을 생성
  const groupRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {};
    groupKeys.forEach((key) => {
      refs[key] = React.createRef<HTMLDivElement>();
    });
    return refs;
  }, [groupKeys]);

  return (
    // 이 컨테이너 내에서만 스크롤하도록 설정 (예: 높이 100%로 부모에 맞춤)
    <div ref={containerRef} className="h-full overflow-y-auto">
      {groupKeys.map((groupKey) => (
        <SectionGroup
          key={groupKey}
          title={groupKey}
          sections={groupedSections[groupKey]}
          allGroupKeys={groupKeys}
          groupRefs={groupRefs}
          containerRef={containerRef} // 컨테이너 ref를 전달
        />
      ))}
    </div>
  );
};
