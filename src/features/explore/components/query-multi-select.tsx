// components/QueryMultiSelector.tsx
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BaseMultiSelector,
  BaseMultiSelectorProps,
} from "@/components/ui-custom/base-multi-select";

interface QueryMultiSelectorProps
  extends Omit<BaseMultiSelectorProps, "values" | "onValuesChange"> {
  queryParam: string;
}

export const QueryMultiSelector: React.FC<QueryMultiSelectorProps> = ({
  queryParam,
  ...rest
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValues = React.useMemo(() => {
    return searchParams.getAll(queryParam);
  }, [searchParams, queryParam]);

  const handleValuesChange = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove all existing instances of the query parameter
    params.delete(queryParam);

    // Add each selected value as a separate query parameter
    values.forEach((value) => {
      params.append(queryParam, value);
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <BaseMultiSelector
      {...rest}
      values={selectedValues}
      onValuesChange={handleValuesChange}
    />
  );
};
