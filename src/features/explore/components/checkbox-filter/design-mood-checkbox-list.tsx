"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { designMoodOptions } from "@/features/explore/types/options";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DesignMoodCheckboxList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValues = React.useMemo(() => {
    return searchParams.getAll("design_moods");
  }, [searchParams]);

  function handleCheckedChange(value: string, nextChecked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    const currentSelected = params.getAll("design_moods");

    let newSelected: string[] = [];

    if (nextChecked) {
      newSelected = [...currentSelected, value];
    } else {
      newSelected = currentSelected.filter((v) => v !== value);
    }

    params.delete("design_moods");
    newSelected.forEach((val) => params.append("design_moods", val));

    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {designMoodOptions.map((opt) => {
        const isChecked = selectedValues.includes(opt.value);
        const id = `design_moods-${opt.value}`;

        return (
          <div
            key={opt.value}
            className="flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleCheckedChange(opt.value, !isChecked)}
          >
            <Checkbox
              id={id}
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleCheckedChange(opt.value, Boolean(checked))
              }
              className="rounded-sm h-5 w-5 pointer-events-none"
            />
            <Label
              htmlFor={id}
              className="text-sm font-medium leading-none cursor-pointer pointer-events-none"
            >
              {opt.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
