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
} from "@/components/ui/select";
import { Option } from "../../app/(main)/explore/_types/options";

export interface BaseSelectorProps {
  id?: string;
  options: Option[];
  placeholder?: string;
  width?: string;
  onValueChange?: (value: string) => void;
  CustomSelectItem?: React.ComponentType<{ option: Option }>;
  value?: string;
}

export const BaseSelect: React.FC<BaseSelectorProps> = ({
  id,
  options,
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
        <SelectGroup>
          {options.map((option) =>
            CustomSelectItem ? (
              <SelectItem key={option.value} value={option.value}>
                <CustomSelectItem option={option} />
              </SelectItem>
            ) : (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
