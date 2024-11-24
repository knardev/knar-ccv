// components/BaseMultiSelector.tsx
// https://craft.mxkaske.dev/post/fancy-multi-select
"use client";

import React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Option } from "../../app/(main)/explore/_types/options";

export interface BaseMultiSelectorProps {
  options: Option[];
  placeholder?: string;
  width?: string;
  onValuesChange?: (values: string[]) => void;
  renderItem?: (option: Option, isSelected: boolean) => React.ReactNode;
  values?: string[];
  maxBadges?: number;
}

export const BaseMultiSelector: React.FC<BaseMultiSelectorProps> = ({
  options,
  placeholder = "Select options...",
  width = "w-full",
  onValuesChange,
  renderItem,
  values = [],
  maxBadges = 2,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Option[]>(() =>
    options.filter((option) => values.includes(option.value))
  );
  const [inputValue, setInputValue] = React.useState("");

  // Update selected items when `values` prop changes
  React.useEffect(() => {
    setSelected(options.filter((option) => values.includes(option.value)));
  }, [values, options]);

  // Handle unselecting an option
  const handleUnselect = React.useCallback(
    (option: Option) => {
      const newSelected = selected.filter((s) => s.value !== option.value);
      setSelected(newSelected);
      if (onValuesChange) {
        onValuesChange(newSelected.map((s) => s.value));
      }
    },
    [onValuesChange, selected]
  );

  // Handle key down events for accessibility
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selected];
            newSelected.pop();
            setSelected(newSelected);
            if (onValuesChange) {
              onValuesChange(newSelected.map((s) => s.value));
            }
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [onValuesChange, selected]
  );

  // Handle selecting an option
  const handleSelect = (option: Option) => {
    const isAlreadySelected = selected.some((s) => s.value === option.value);
    let newSelected: Option[];

    if (isAlreadySelected) {
      // Unselect the option
      newSelected = selected.filter((s) => s.value !== option.value);
    } else {
      // Select the option
      newSelected = [...selected, option];
    }

    setSelected(newSelected);

    if (onValuesChange) {
      onValuesChange(newSelected.map((s) => s.value));
    }

    setInputValue("");
    setOpen(true);

    // Keep the input focused
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Determine selectable options (all options are selectable, including selected ones)
  // We'll handle checkmarks instead of hiding selected items
  const filteredSelectables = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  // Ref for handling outside clicks
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine how many badges to show
  const additionalSelected =
    selected.length > maxBadges ? selected.length - maxBadges : 0;

  return (
    <div ref={containerRef} className={`relative ${width}`}>
      <Command
        onKeyDown={handleKeyDown}
        className={`overflow-visible bg-transparent`}
      >
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="flex flex-wrap gap-1">
            {/* Display selected badges up to maxBadges */}
            {selected.slice(0, maxBadges).map((option) => (
              <Badge key={option.value} variant="secondary">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(option);
                  }}
                  aria-label={`Remove ${option.label}`}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            {/* Show "+x more" badge if necessary */}
            {additionalSelected > 0 && (
              <Badge variant="secondary">+{additionalSelected} more</Badge>
            )}
            {/* Placeholder when no items are selected */}
            {selected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </div>
        <div className="relative mt-2">
          <CommandList>
            {open && filteredSelectables.length > 0 ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {filteredSelectables.map((option) => {
                    const isSelected = selected.some(
                      (s) => s.value === option.value
                    );
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => handleSelect(option)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                        keywords={[option.label]}
                      >
                        {renderItem ? (
                          renderItem(option, isSelected)
                        ) : (
                          <span>{option.label}</span>
                        )}
                        {/* Show checkmark if selected */}
                        {isSelected && (
                          <span className="ml-2 text-green-500">✓</span>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            ) : open && filteredSelectables.length === 0 ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  선택 가능한 옵션이 없습니다.
                </div>
              </div>
            ) : null}
          </CommandList>
        </div>
      </Command>
    </div>
  );
};
