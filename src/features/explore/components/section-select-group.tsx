import React from "react";
import { QuerySelect } from "./query-select";
import { sectionTypeOptions } from "@/features/homepage/utils/options";

export function SectionSelectorGroup() {
  return (
    <QuerySelect
      options={sectionTypeOptions}
      placeholder="섹션 유형"
      queryParam="section_type"
      width="w-[150px]"
    />
  );
}
