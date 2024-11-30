// types/filters.ts

// Define the HomepageFilters type
export interface HomepageFilters {
  company_category?: string[];
  industry_category?: string[];
  industry_subcategory?: string[];
  design_desire_type?: string[];
  design_desire_types?: string[];
  design_mood?: string[];
  design_moods?: string[];
  primary_color?: string[];
  plan_grammar?: string[];
  villian_deficiency?: string[];
  unique_selling_point?: string[];
}

export interface SectionFilters { // 임시
  company_category?: string;
  industry_category?: string;
  industry_subcategory?: string;
  design_desire_type?: string;
  design_mood?: string;
  primary_color?: string;
  plan_grammar?: string;
  villian_deficiency?: string;
  unique_selling_point?: string;
  section_type?: string;
  search?: string;
}
