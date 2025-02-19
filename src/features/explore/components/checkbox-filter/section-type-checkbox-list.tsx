"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// 섹션 종류 옵션 리스트 – 이미 정의된 값이 있다면 사용하세요.
import { sectionTypeOptions } from "@/features/homepage/utils/options";
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function SectionTypeCheckboxList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValues = React.useMemo(
    () => searchParams.getAll("section_type"),
    [searchParams]
  );

  function handleCheckedChange(value: string, nextChecked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    const currentSelected = params.getAll("section_type");

    let newSelected: string[] = [];
    if (nextChecked) {
      newSelected = [...currentSelected, value];
    } else {
      newSelected = currentSelected.filter((v) => v !== value);
    }

    params.delete("section_type");
    newSelected.forEach((val) => {
      params.append("section_type", val);
    });

    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {sectionTypeOptions
        .flatMap((group) => group.options)
        .map((type) => {
          const isChecked = selectedValues.includes(type.value);
          const id = `section_type-${type.value}`;
          return (
            <HoverCard key={type.value} openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild>
                <div
                  className="flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleCheckedChange(type.value, !isChecked)}
                >
                  <Checkbox
                    id={id}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(type.value, Boolean(checked))
                    }
                    className="rounded-sm h-5 w-5 pointer-events-none"
                  />
                  <Label
                    htmlFor={id}
                    className="text-sm font-medium leading-none cursor-pointer pointer-events-none"
                  >
                    {type.label}
                  </Label>
                </div>
              </HoverCardTrigger>
              <HoverCardPortal>
                <HoverCardContent side="left" sideOffset={8}>
                  <p className="text-sm text-primary font-medium">
                    {type.description || "설명란이 없습니다."}
                  </p>
                </HoverCardContent>
              </HoverCardPortal>
            </HoverCard>
          );
        })}
    </div>
  );
}
