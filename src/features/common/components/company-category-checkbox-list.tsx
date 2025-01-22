"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { companyCategories } from "@/features/explore/types/options";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CompanyCategoryCheckboxList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValues = React.useMemo(() => {
    return searchParams.getAll("company_category");
  }, [searchParams]);

  function handleCheckedChange(value: string, nextChecked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    const currentSelected = params.getAll("company_category");

    let newSelected: string[] = [];
    if (nextChecked) {
      newSelected = [...currentSelected, value];
    } else {
      newSelected = currentSelected.filter((v) => v !== value);
    }

    params.delete("company_category");
    newSelected.forEach((val) => {
      params.append("company_category", val);
    });

    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {companyCategories.map((cat) => {
        const isChecked = selectedValues.includes(cat.value);
        const id = `company_category-${cat.value}`;

        return (
          <div
            key={cat.value}
            className="flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleCheckedChange(cat.value, !isChecked)}
          >
            <Checkbox
              id={id}
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleCheckedChange(cat.value, Boolean(checked))
              }
              className="rounded-sm h-5 w-5 pointer-events-none"
            />
            <Label
              htmlFor={id}
              className="text-sm font-medium leading-none cursor-pointer pointer-events-none"
            >
              {cat.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
