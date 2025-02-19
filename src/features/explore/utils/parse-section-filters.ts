import { CombinedSectionFilters } from "@/features/explore/types/search-filters";

/**
 * URLSearchParams를 순회하며, CombinedSectionFilters에 해당하는 모든 키의 값을 배열로 모아 반환합니다.
 */
export function parseSectionFilters(
  searchParams: URLSearchParams,
): CombinedSectionFilters {
  const validKeys: (keyof CombinedSectionFilters)[] = [
    // Homepage 필터 키
    "company_category",
    "industry_category",
    "industry_subcategory",
    "design_desire_types",
    "design_moods",
    "primary_color",
    "plan_grammar",
    "villian_deficiency",
    "unique_selling_point",
    // 섹션 필터 키
    "section_type",
    "page_subcategory",
    "search",
  ];

  const filters: CombinedSectionFilters = {};
  validKeys.forEach((key) => {
    const values = searchParams.getAll(key as string);
    if (values.length > 0) {
      filters[key] = values;
    }
  });

  return filters;
}
