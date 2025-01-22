// actions/fetchHomepages.ts
"use server";

import {
  defineFetchHomepagesQuery,
  FetchHomepages,
} from "@/features/explore/queries/define-fetch-homepage-query";
import { parseHomepageFilters } from "@/features/explore/utils/utils";

export async function fetchHomepages(
  searchParams: URLSearchParams,
): Promise<FetchHomepages> {
  const filters = parseHomepageFilters(searchParams);

  // If no filters are provided, fetch all homepages
  const hasFilters = Object.keys(filters).length > 0;
  const query = hasFilters
    ? defineFetchHomepagesQuery(filters)
    : defineFetchHomepagesQuery({});
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching homepages:", error);
    throw new Error("Failed to fetch homepages");
  }

  let filteredData = data || [];

  // If 'design_desire_types' filter is applied, perform exact matching (무조건 똑같아야 함)
  if (filters.design_desire_types) {
    const filterValue = Array.isArray(filters.design_desire_types)
      ? filters.design_desire_types
      : [filters.design_desire_types];

    filteredData = filteredData.filter((item) => {
      const columnArray = item.design_desire_types || [];

      // 배열의 길이가 다르면 제외
      if (columnArray.length !== filterValue.length) {
        return false;
      }

      // 배열을 정렬하여 비교
      const sortedColumnArray = [...columnArray].sort();
      const sortedFilterArray = [...filterValue].sort();

      // 요소가 모두 일치하는지 확인
      return sortedColumnArray.every(
        (val, index) => val === sortedFilterArray[index],
      );
    });
  }

  return filteredData;
}
