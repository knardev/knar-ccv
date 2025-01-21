import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { HomepageFilters } from "@/features/explore/types/search-filters";

// Define the query to fetch homepages with filters and related sections
export const defineFetchHomepagesQuery = async (filters: HomepageFilters) => {
  let query = createClient()
    .from("homepages")
    .select(
      `
      *,
      sections(*)
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
