import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { HomepageFilters } from "@/features/explore/types/search-filters";

// Define the query to fetch homepages with filters and related sections
export const defineFetchHomepagesQuery = (filters: HomepageFilters) => {
  let query = createClient()
    .from("homepages")
    .select(
      `
      *,
      sections(*),
      profile:profiles(*)
    `,
    ); // Include related sections

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      switch (key) {
        case "villian_deficiency":
        case "unique_selling_point":
          // Use ilike for partial matching
          query = query.ilike(key, `%${value}%`);
          break;
        case "search":
          // Search across multiple fields
          query = query.or(
            `name.ilike.%${value}%,description.ilike.%${value}%`,
          );
          break;
        case "design_desire_types":
          // 교집합
          query = query.overlaps(key, value);
          break;
        case "design_moods":
          // 합집합
          query = query.overlaps(key, value);
          break;
        default:
          if (Array.isArray(value)) {
            query = query.in(key, value);
          } else {
            // Exact match for strings
            query = query.eq(key, value);
          }
          break;
      }
    }
  });

  // Add sorting by created_at in descending order for homepages
  query = query.order("created_at", { ascending: false });

  return query;
};

// Type for the query
export type FetchHomepages = QueryData<
  ReturnType<typeof defineFetchHomepagesQuery>
>;

/*
{
  id: '080bfc81-b4be-4aea-a2ff-25c8da720912',
  created_at: '2025-01-07T14:04:43.346501',
  name: '한국타이어 회사소개',
  description: '',
  url: 'https://www.hankooktire.com',
  industry_category: null,
  industry_subcategory: null,
  plan_grammar: null,
  design_desire_type: null,
  design_mood: null,
  primary_color: null,
  villian_deficiency: null,
  unique_selling_point: null,
  company_category: '대기업',
  favicon_url: 'https://oguzdjlnwsdproeuoywm.supabase.co/storage/v1/object/public/images/favicons/giigle.ico?t=2024-12-03T10%3A51%3A34.172Z',
  profile_id: '6efc6d80-e4a2-4482-b60a-d388cfc00259',
  visitor_needs: null,
  design_desire_types: [ '권위중시', '자극중시' ],
  design_moods: [ '전문적인', '강렬한', '안정적인', '고급스러운' ],
  profile: {
    id: '6efc6d80-e4a2-4482-b60a-d388cfc00259',
    user_id: '5009cd7f-5bcb-47e4-8c8f-2e024354768a',
    created_at: '2024-11-16T19:56:39.236553+00:00',
    account_role: 'ADMIN'
  },
  sections: [
    {
      id: '72ca4a07-5fae-419f-a8c9-f0dc116e35a8',
      type: null,
      content: null,
      page_id: null,
      sub_copy: null,
      image_url: [Array],
      main_copy: null,
      created_at: '2025-01-07T14:04:43.567928',
      profile_id: '6efc6d80-e4a2-4482-b60a-d388cfc00259',
      homepage_id: '080bfc81-b4be-4aea-a2ff-25c8da720912',
      page_sequence: null
    },
    {
      id: '7ca8c73a-cafe-4054-affe-9723d344f39a',
      type: null,
      content: null,
      page_id: null,
      sub_copy: null,
      image_url: [Array],
      main_copy: null,
      created_at: '2025-01-07T14:04:43.567928',
      profile_id: '6efc6d80-e4a2-4482-b60a-d388cfc00259',
      homepage_id: '080bfc81-b4be-4aea-a2ff-25c8da720912',
      page_sequence: null
    },
    ...,
    {
      id: 'e7aba39c-f18e-4a42-bf0d-37825891f7f6',
      type: null,
      content: null,
      page_id: null,
      sub_copy: null,
      image_url: [Array],
      main_copy: null,
      created_at: '2025-01-07T14:04:43.567928',
      profile_id: '6efc6d80-e4a2-4482-b60a-d388cfc00259',
      homepage_id: '080bfc81-b4be-4aea-a2ff-25c8da720912',
      page_sequence: null
    }
  ]
}
*/
