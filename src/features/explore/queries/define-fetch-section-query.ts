import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { SectionFilters } from "@/features/explore/types/search-filters";

/**
 * 섹션 데이터 쿼리.
 * - 섹션 테이블에서 section 관련 필터(예: section_type, search)만 SQL로 처리합니다.
 * - 연결된 homepage, page 데이터는 모두 가져오지만 homepage 관련 필터는 적용하지 않습니다.
 */
export function defineFetchSectionsQuery(filters: SectionFilters) {
  const supabase = createClient();
  // sections와 연결된 homepage, page 정보를 모두 가져옴
  let query = supabase
    .from("sections")
    .select(
      `*, 
        homepage:homepages (
          profile:profiles (avatar_url, name),
          url,
          name,
          favicon_url,
          company_category,
          industry_category,
          industry_subcategory,
          design_desire_types,
          design_moods,
          primary_color,
          plan_grammar,
          villian_deficiency,
          unique_selling_point
        ), 
        page:pages (sub_category)`,
    );

  // 섹션 관련 필터: section_type
  if (filters.section_type && filters.section_type.length > 0) {
    query = query.in("type", filters.section_type);
  }

  // 섹션 관련 검색어 처리: main_copy, sub_copy, content 컬럼에 대해 ilike 조건 적용
  if (filters.search && filters.search.length > 0) {
    const searchTerm = filters.search[0];
    query = query.or(
      `main_copy.ilike.%${searchTerm}%,sub_copy.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`,
    );
  }

  return query;
}

export type FetchSections = QueryData<
  ReturnType<typeof defineFetchSectionsQuery>
>;
