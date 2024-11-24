import { HomepageFilters, SectionFilters } from "./_types/search-filters";

export function parseHomepageFilters(
  searchParams: URLSearchParams
): HomepageFilters {

  // Initialize filters with type HomepageFilters
  const filters: HomepageFilters = {};

  // Get valid keys dynamically from HomepageFilters
  const validKeys: (keyof HomepageFilters)[] = [
    "company_category",
    "industry_category",
    "industry_subcategory",
    "design_desire_type",
    "design_mood",
    "primary_color",
    "plan_grammar",
    "villian_deficiency",
    "unique_selling_point",
  ];

  // Convert entries to an array and process
  Array.from(searchParams.entries()).forEach(([key, value]) => {
    if (validKeys.includes(key as keyof HomepageFilters)) {
      if (!filters[key as keyof HomepageFilters]) {
        // Initialize as an array
        filters[key as keyof HomepageFilters] = [];
      }

      // Push the value to the array
      (filters[key as keyof HomepageFilters] as string[]).push(value);
    }
  });
  // 동일한 키가 있을 경우 배열로 저장함
  // filters { primary_color: [ '빨강', '파랑' ] }
  return filters;
}

export function parseSectionFilters(
  searchParams: URLSearchParams
): SectionFilters {
  // Initialize filters with type SectionFilters
  const filters: SectionFilters = {};

  // Get valid keys dynamically from SectionFilters
  const validKeys: (keyof SectionFilters)[] = [
    "industry_category",
    "industry_subcategory",
    "design_desire_type",
    "design_mood",
    "primary_color",
    "plan_grammar",
    "villian_deficiency",
    "unique_selling_point",
    "section_type",
    "search",
  ];

  // Convert entries to an array and process
  Array.from(searchParams.entries()).forEach(([key, value]) => {
    if (value && validKeys.includes(key as keyof SectionFilters)) {
      filters[key as keyof SectionFilters] = value;
    }
  });

  return filters;
}


export function normalizeQueryParams(
  params: Record<string, string | string[] | undefined>
): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Add each value in the array as a separate entry
      value.forEach((v) => {
        searchParams.append(key, v);
      });
    } else if (typeof value === "string") {
      // Add single string values directly
      searchParams.append(key, value);
    }
    // Skip undefined values
  });
  // 동일한 키가 있을 경우 배열로 저장됨
  // URLSearchParams { 'primary_color' => '빨강', 'primary_color' => '파랑' }
  return searchParams;
}
