// features/explore/components/section/app-floating-sidebar-sections.tsx
"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { CompanyCategoryCheckboxList } from "@/features/explore/components/checkbox-filter/company-category-checkbox-list";
import { DesignDesireTypeCheckboxList } from "@/features/explore/components/checkbox-filter/design-desire-type-checkbox-list";
import { DesignMoodCheckboxList } from "@/features/explore/components/checkbox-filter/design-mood-checkbox-list";
// import { PageSubcategoryCheckboxList } from "@/features/explore/components/section/page-subcategory-checkbox-list";
import { SectionTypeCheckboxList } from "@/features/explore/components/checkbox-filter/section-type-checkbox-list";

export function AppFloatingSidebarSections() {
  return (
    <Sidebar
      variant="floating"
      collapsible="offcanvas"
      side="left"
      className="top-16 h-[calc(100%-4rem)] overflow-y-auto"
    >
      <SidebarContent className="p-2">
        {/* --- 홈페이지 필터 --- */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            산업종류
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <CompanyCategoryCheckboxList />
          </SidebarGroupContent>
        </SidebarGroup>
        {/* --- 페이지 필터 --- */}
        {/* <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            페이지 카테고리
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <PageSubcategoryCheckboxList />
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* --- 섹션 필터 --- */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            섹션 종류
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SectionTypeCheckboxList />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            디자인 성향
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <DesignDesireTypeCheckboxList />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            디자인 무드
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <DesignMoodCheckboxList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
