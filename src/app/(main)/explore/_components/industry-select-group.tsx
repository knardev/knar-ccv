// components/IndustrySelector.tsx
import React from "react";
import { QuerySelect } from "./query-select";
import { QueryMultiSelector } from "./query-multi-select";
import {
  companyCategories,
  industryCategories,
  industryData,
} from "../_types/options";

export function IndustrySelectorGroup() {
  return (
    <div className="flex items-center space-x-2">
      <QueryMultiSelector
        options={companyCategories}
        placeholder="기업 카테고리"
        queryParam="company_category"
        width="w-[230px]"
        maxBadges={1}
      />
      {/* <Selector
        options={industryCategories}
        placeholder="산업 대분류"
        queryParam="industry_category"
        width="w-[150px]"
        onValueChange={(value) => {
          // When category changes, reset subcategory
          const params = new URLSearchParams(searchParams.toString());
          if (value) {
            params.set("industry_category", value);
          } else {
            params.delete("industry_category");
          }
          params.delete("industry_subcategory");
          router.push(`?${params.toString()}`, { scroll: false });
        }}
      />
      <Selector
        options={[]}
        placeholder="산업 중분류"
        queryParam="industry_subcategory"
        width="w-[150px]"
        dependentQueryParam="industry_category"
        getOptions={(selectedCategory) =>
          selectedCategory
            ? industryData[selectedCategory as keyof typeof industryData] || []
            : []
        }
      /> */}
    </div>
  );
}