// components/Selector.tsx
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Option, GroupedOption } from "@/features/homepage/utils/options";

export interface BaseSelectorProps {
  id?: string;
  groups: GroupedOption[];
  placeholder?: string;
  width?: string;
  onValueChange?: (value: string) => void;
  CustomSelectItem?: React.ComponentType<{ option: Option }>;
  value?: string;
}

export const BaseSelectWithGroup: React.FC<BaseSelectorProps> = ({
  id,
  groups,
  placeholder = "Select an option",
  width = "w-[150px]",
  onValueChange,
  CustomSelectItem,
  value,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`${width}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent id={id}>
        {groups.map((group) => (
          <SelectGroup key={group.groupLabel}>
            <SelectLabel>{group.groupLabel}</SelectLabel>
            {group.options.map((option) =>
              CustomSelectItem ? (
                <CustomSelectItem key={option.value} option={option} />
              ) : (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              )
            )}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
