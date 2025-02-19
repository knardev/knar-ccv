"use client";

import React, { useState, useRef, useEffect } from "react";
import { SectionPreviewCard } from "./section-preview-card";
import { FetchSections } from "@/features/explore/queries/define-fetch-section-query";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardPortal,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

interface SectionGroupProps {
  title: string;
  sections: FetchSections[number][];
  allGroupKeys: string[];
  groupRefs: Record<string, React.RefObject<HTMLDivElement>>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const SectionGroup: React.FC<SectionGroupProps> = ({
  title,
  sections,
  allGroupKeys,
  groupRefs,
  containerRef,
}) => {
  const groupRef = groupRefs[title];
  const [hoverOpen, setHoverOpen] = useState(false);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // 클릭 시, 컨테이너 내에서 대상 그룹으로 스크롤
  const handleScrollToGroup = (groupKey: string) => {
    setHoverOpen(false);
    const targetRef = groupRefs[groupKey];
    if (containerRef.current && targetRef && targetRef.current) {
      // containerRef.current.scrollTop과 targetRef.current.offsetTop을 이용해 계산
      const offset = targetRef.current.offsetTop - 64;
      containerRef.current.scrollTo({ top: offset, behavior: "instant" });
    }
  };

  useEffect(() => {
    if (hoverOpen && activeButtonRef.current) {
      // 약간의 지연 후 active 버튼이 보이도록 스크롤
      setTimeout(() => {
        activeButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
    }
  }, [hoverOpen]);

  return (
    // scroll-mt-16 클래스는 여전히 적용 (컨테이너의 scroll-padding-top은 SectionGroups에서 처리)
    <div id={`group-${title}`} ref={groupRef} className="mb-8">
      <div className="sticky top-0 bg-background z-40 py-2 cursor-pointer">
        <HoverCard
          open={hoverOpen}
          onOpenChange={setHoverOpen}
          openDelay={100}
          closeDelay={100}
        >
          <HoverCardTrigger asChild>
            <h2
              className="text-2xl font-bold inline-block"
              onMouseEnter={() => setHoverOpen(true)}
            >
              {title}
            </h2>
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent
              className="w-40 p-2 max-h-80 overflow-auto"
              side="right"
              sideOffset={20}
              align="start"
              alignOffset={-20}
            >
              <div className="flex flex-col space-y-1">
                {allGroupKeys.map((other) => (
                  <Button
                    variant="ghost"
                    key={other}
                    onClick={() => handleScrollToGroup(other)}
                    ref={other === title ? activeButtonRef : null}
                    className={`text-left px-2 py-1 rounded ${
                      other === title
                        ? "bg-muted text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    {other}
                  </Button>
                ))}
              </div>
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCard>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {sections.map((section) => {
          const homepage = section.homepage;
          const profile = homepage?.profile;
          return (
            <SectionPreviewCard
              key={section.id}
              name={homepage?.name ?? ""}
              favicon_url={homepage?.favicon_url || ""}
              type={section.type || "Unknown Section"}
              image_url={section.image_url}
              profile_avatar_url={profile?.avatar_url || null}
              profile_name={profile?.name || null}
              href={`/sections/${section.id}?backto=${encodeURIComponent(
                title
              )}`}
              original_url={homepage?.url}
            />
          );
        })}
      </div>
    </div>
  );
};
