"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

interface TextInputProps {
  placeholder?: string;
  queryParam: string;
  width?: string;
}

export function TextInput({
  placeholder = "Enter text...",
  queryParam,
  width = "w-[150px]",
}: TextInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  // Initialize from query parameters
  useEffect(() => {
    const paramValue = searchParams.get(queryParam) || "";
    setValue(paramValue);
  }, [searchParams, queryParam]);

  const updateQuery = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set(queryParam, val);
    } else {
      params.delete(queryParam);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateQuery(value);
    }
  };

  const handleBlur = () => {
    updateQuery(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      value={value}
      className={`${width}`}
    />
  );
}
