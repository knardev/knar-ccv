"use client";

import React from "react";
import { QueryMultiSelector } from "./query-multi-select";
import {
  Option,
  PrimaryColor,
  primaryColorOptions,
  designDesireTypeOptions,
  designMoodOptions,
} from "@/features/explore/types/options";
// import { ColorSelectItem } from "@/components/ui-custom/color-select-item";

export function DesignSelectorGroup() {
  return (
    <div className="flex space-x-4">
      <QueryMultiSelector
        options={designDesireTypeOptions}
        placeholder="디자인 방향성"
        queryParam="design_desire_types"
        width="w-[280px]"
        maxBadges={3}
        badgeColor="bg-yellow-100"
        badgeTextColor="text-yellow-800"
      />
      <QueryMultiSelector
        options={designMoodOptions}
        placeholder="디자인 톤앤매너"
        queryParam="design_moods"
        width="w-[280px]"
        maxBadges={2}
      />
      {/* <QueryMultiSelector
        options={primaryColorOptions}
        queryParam="primary_color"
        placeholder="메인 컬러"
        width="w-[180px]"
        maxBadges={1}
        renderItem={(option: Option, isSelected: boolean) => (
          <ColorSelectItem option={option} />
        )}
      /> */}
    </div>
  );
}
