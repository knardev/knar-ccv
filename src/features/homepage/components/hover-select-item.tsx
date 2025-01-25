import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SelectItem } from "@/components/ui/select";
import { Option } from "@/features/homepage/utils/options";

interface HoverSelectItemProps<T> {
  option: Option<T>; // Generic type for dynamic value
  onSelect?: (value: T) => void; // Callback to handle selection
}

export function HoverSelectItem<T>({ option }: HoverSelectItemProps<T>) {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <SelectItem value={String(option.value)}>
          <p>{option.label}</p>
        </SelectItem>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side="left" sideOffset={8}>
          <p className="text-sm text-primary font-medium">
            {option.description || "설명란이 없습니다."}
          </p>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}
