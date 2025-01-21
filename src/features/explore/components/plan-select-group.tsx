import React from "react";
import { TextInput } from "./text-input";
import { QueryMultiSelector } from "./query-multi-select";
import { planGrammarOptions } from "@/features/explore/types/options";

export function PlanSelectorGroup() {
  return (
    <div className="flex space-x-2">
      <QueryMultiSelector
        options={planGrammarOptions}
        placeholder="기획 문법"
        queryParam="copywriting_grammar"
        width="w-[200px]"
        maxBadges={1}
      />
      <TextInput
        placeholder="악당/결핍"
        queryParam="villian_deficiency"
        width="w-[150px]"
      />
      <TextInput
        placeholder="특장점"
        queryParam="unique_selling_point"
        width="w-[150px]"
      />
    </div>
  );
}
