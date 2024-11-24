"use client";

import React from "react";
import { QueryMultiSelector } from "./query-multi-select";
import {
  Option,
  PrimaryColor,
  primaryColorOptions,
  designDesireTypeOptions,
  designMoodOptions,
} from "../_types/options";
import { ColorSelectItem } from "@/components/ui-custom/color-select-item";

export function DesignSelectorGroup() {
  return (
    <div className="flex items-center space-x-2">
      <QueryMultiSelector
        options={designDesireTypeOptions}
        placeholder="디자인 유형"
        queryParam="design_desire_type"
        width="w-[180px]"
        maxBadges={1}
      />
      <QueryMultiSelector
        options={designMoodOptions}
        placeholder="디자인 톤앤매너"
        queryParam="design_mood"
        width="w-[200px]"
        maxBadges={1}
      />
      <QueryMultiSelector
        options={primaryColorOptions}
        queryParam="primary_color"
        placeholder="메인 컬러"
        width="w-[180px]"
        maxBadges={1}
        renderItem={(option: Option, isSelected: boolean) => (
          <ColorSelectItem option={option} />
        )}
      />
    </div>
  );
}
