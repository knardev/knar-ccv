// Homepage 관련 검색 필터
export interface HomepageFilters {
  company_category?: string[];
  industry_category?: string[];
  industry_subcategory?: string[];
  design_desire_types?: string[];
  design_moods?: string[];
  primary_color?: string[];
  plan_grammar?: string[];
  villian_deficiency?: string[];
  unique_selling_point?: string[];
}

// 섹션 관련 검색 필터
export interface SectionFilters {
  section_type?: string[];
  page_subcategory?: string[];
  search?: string[];
}

// SQL에서는 섹션 관련 필터만 사용하지만, URL의 쿼리 파라미터에는
// Homepage 관련 필터도 함께 있을 수 있으므로 Combined 타입으로 정의합니다.
export interface CombinedSectionFilters
  extends SectionFilters, HomepageFilters {}
