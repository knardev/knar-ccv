"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { designDesireTypeOptions } from "@/features/explore/types/options";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DesignDesireTypeCheckboxList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValues = React.useMemo(() => {
    return searchParams.getAll("design_desire_types");
  }, [searchParams]);

  function handleCheckedChange(value: string, nextChecked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    const currentSelected = params.getAll("design_desire_types");

    let newSelected: string[] = [];

    if (nextChecked) {
      newSelected = [...currentSelected, value];
    } else {
      newSelected = currentSelected.filter((v) => v !== value);
    }

    params.delete("design_desire_types");
    newSelected.forEach((val) => params.append("design_desire_types", val));

    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {designDesireTypeOptions.map((opt) => {
        const isChecked = selectedValues.includes(opt.value);
        const id = `design_desire_types-${opt.value}`;

        return (
          <div
            key={opt.value}
            className="flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-muted transition-colors"
          >
            <Checkbox
              id={id}
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleCheckedChange(opt.value, Boolean(checked))
              }
              className="rounded-sm h-5 w-5"
            />
            <Label
              htmlFor={id}
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {opt.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
