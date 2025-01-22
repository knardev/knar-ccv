"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { CompanyCategoryCheckboxList } from "@/features/common/components/company-category-checkbox-list";
import { DesignDesireTypeCheckboxList } from "@/features/common/components/design-desire-type-checkbox-list";
import { DesignMoodCheckboxList } from "@/features/common/components/design-mood-checkbox-list";

export function AppFloatingSidebar() {
  return (
    /**
     * variant="floating" -> a floating (overlay) sidebar
     * collapsible="offcanvas" -> slides in/out from the side
     * side="left" -> appears on the left side (default)
     */
    <Sidebar
      variant="floating"
      collapsible="offcanvas"
      side="left"
      className="top-16 h-[calc(100%-4rem)] overflow-y-auto"
    >
      {/* The scrollable container for everything inside the sidebar */}
      <SidebarContent className="p-2">
        {/* --- (1) 산업종류 필터 --- */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            산업종류
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <CompanyCategoryCheckboxList />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- (2) 디자인 성향 필터 --- */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold">
            디자인 성향
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <DesignDesireTypeCheckboxList />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- (3) 디자인 무드 필터 --- */}
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
