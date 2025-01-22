"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  BaseSelect,
  BaseSelectorProps,
} from "@/components/ui-custom/base-select";

interface QuerySelectProps extends Omit<BaseSelectorProps, "value"> {
  // value is set internally
  queryParam: string;
  dependentQueryParam?: string;
  getOptions?: (dependentValue: string) => { value: string; label: string }[];
}

export function QuerySelect({
  queryParam,
  dependentQueryParam,
  getOptions,
  ...rest
}: QuerySelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValue = searchParams.get(queryParam) || "";

  const dependentValue = dependentQueryParam
    ? searchParams.get(dependentQueryParam) || ""
    : null;

  const currentOptions =
    getOptions && dependentValue !== null
      ? getOptions(dependentValue)
      : rest.options;

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(queryParam, value);
    } else {
      params.delete(queryParam);
    }

    router.push(`?${params.toString()}`, { scroll: false });

    if (rest.onValueChange) {
      // additional callback
      rest.onValueChange(value);
    }
  };

  return (
    <BaseSelect
      {...rest}
      options={currentOptions}
      value={selectedValue}
      onValueChange={handleSelect}
    />
  );
}
