// components/CustomColorSelectItem.tsx
import React from "react";
import { Option } from "../../app/(main)/explore/_types/options";
import { Enums } from "@/types/database.types";

// Define a color map for the primary colors
type PrimaryColor = Enums<"primary_color">;
const colorMap: Record<PrimaryColor, string> = {
  빨강: "#BE123C",
  파랑: "#1D4ED8",
  초록: "#15803D",
  노랑: "#EAB308",
  검정: "#000000",
  하양: "#FFFFFF",
  회색: "#334155",
  보라: "#7E22CE",
  주황: "#C2410C",
};

export const ColorSelectItem: React.FC<{ option: Option }> = ({ option }) => {
  return (
    <div className="flex items-center">
      <span
        className="w-4 h-4 rounded-full mr-2"
        style={{
          backgroundColor: colorMap[option.value as PrimaryColor] || "#CCCCCC",
        }}
      />
      {option.label}
    </div>
  );
};
