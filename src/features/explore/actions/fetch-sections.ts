import {
  defineFetchSectionsQuery,
  FetchSections,
} from "@/features/explore/queries/define-fetch-section-query";
import {
  CombinedSectionFilters,
  HomepageFilters,
  SectionFilters,
} from "@/features/explore/types/search-filters";
import { parseSectionFilters } from "@/features/explore/utils/parse-section-filters";

/**
 * Fisher-Yates shuffle 알고리즘을 사용하여 배열을 랜덤하게 섞습니다.
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * URLSearchParams로부터 필터를 파싱한 후 섹션 데이터를 가져오고,
 * 가져온 섹션 데이터에 대해 JS로 homepage 관련 필터와 page_subcategory 필터를 적용합니다.
 * 만약 필터가 있는 경우에는 결과 데이터를 랜덤하게 섞어줍니다.
 */
export async function fetchSections(
  searchParams: URLSearchParams,
): Promise<FetchSections> {
  // URLSearchParams → CombinedSectionFilters 객체로 파싱 (homepage + 섹션 필터 모두 포함)
  const filters: CombinedSectionFilters = parseSectionFilters(searchParams);

  // SQL 쿼리에는 섹션 관련 필터만 전달
  const sectionFilters: SectionFilters = {
    section_type: filters.section_type,
    page_subcategory: filters.page_subcategory,
    search: filters.search,
  };

  const query = defineFetchSectionsQuery(sectionFilters);
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching sections:", error);
    throw new Error("Failed to fetch sections");
  }

  let sections = data || [];

  // JS에서 homepage 및 page 관련 필터 적용
  sections = sections.filter((section: FetchSections[number]) => {
    const homepage = section.homepage;
    // homepage가 반드시 있어야 함
    if (!homepage) return false;

    // Homepage 관련 필터 키
    const homepageFilterKeys: (keyof HomepageFilters)[] = [
      "company_category",
      "industry_category",
      "industry_subcategory",
      "design_desire_types",
      "design_moods",
      "primary_color",
      "plan_grammar",
      "villian_deficiency",
      "unique_selling_point",
    ];

    let include = true;
    homepageFilterKeys.forEach((key) => {
      if (filters[key] && filters[key]!.length > 0) {
        const homepageValue = homepage[key];
        // homepageValue가 null이면 필터 조건에 부합하지 않음
        if (homepageValue === null) {
          include = false;
        } else if (Array.isArray(homepageValue)) {
          // 배열이면, 필터의 값 중 하나라도 포함되면 OK
          const matches = homepageValue.some((val: string) =>
            filters[key]!.includes(val)
          );
          if (!matches) include = false;
        } else {
          if (!filters[key]!.includes(homepageValue)) {
            include = false;
          }
        }
      }
    });

    // page_subcategory 필터: page의 sub_category와 비교 (주석 처리되어 있음)
    // if (filters.page_subcategory && filters.page_subcategory.length > 0) {
    //   const page = section.page;
    //   if (
    //     !page || !page.sub_category ||
    //     !filters.page_subcategory.includes(page.sub_category)
    //   ) {
    //     include = false;
    //   }
    // }

    return include;
  });

  // 만약 필터가 하나라도 적용되었다면, 섹션 데이터를 랜덤으로 섞습니다.
  const hasFilters = Object.values(filters).some(
    (value) => Array.isArray(value) && value.length > 0,
  );
  if (hasFilters) {
    sections = shuffle(sections);
  }

  return sections;
}
