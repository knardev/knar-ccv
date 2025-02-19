// features/explore/components/section/page-subcategory-checkbox-list.tsx
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// 아래는 페이지 서브카테고리 옵션 리스트입니다. (이미 있다면 해당 코드를 사용하세요)
import { pageSubcategoryOptions } from "@/features/explore/types/options";

export function PageSubcategoryCheckboxList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValues = React.useMemo(
    () => searchParams.getAll("page_subcategory"),
    [searchParams]
  );

  function handleCheckedChange(value: string, nextChecked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    const currentSelected = params.getAll("page_subcategory");

    let newSelected: string[] = [];
    if (nextChecked) {
      newSelected = [...currentSelected, value];
    } else {
      newSelected = currentSelected.filter((v) => v !== value);
    }

    params.delete("page_subcategory");
    newSelected.forEach((val) => params.append("page_subcategory", val));

    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {pageSubcategoryOptions.map((sub) => {
        const isChecked = selectedValues.includes(sub.value);
        const id = `page_subcategory-${sub.value}`;
        return (
          <div
            key={sub.value}
            className="flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleCheckedChange(sub.value, !isChecked)}
          >
            <Checkbox
              id={id}
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleCheckedChange(sub.value, Boolean(checked))
              }
              className="rounded-sm h-5 w-5 pointer-events-none"
            />
            <Label
              htmlFor={id}
              className="text-sm font-medium leading-none cursor-pointer pointer-events-none"
            >
              {sub.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
