
import { QueryData } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";
import { HomepageFilters, SectionFilters } from "./_types/search-filters";

// Define the query to fetch homepages with filters and related sections
export const defineFetchHomepagesQuery = async (filters: HomepageFilters) => {
  let query = createClient()
    .from("homepages")
    .select(
      `
      *,
      sections(*)
    `
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
            `name.ilike.%${value}%,description.ilike.%${value}%`
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


export const defineFetchSectionsQuery = async (filters: SectionFilters) => {
  const homepageQuery = createClient().from("homepages").select("id");

  // Apply homepage-related filters to get matching homepage IDs
  Object.entries(filters).forEach(([key, value]) => {
    if (value && key !== "section_type" && key !== "search") {
      switch (key) {
        case "villian_deficiency":
        case "unique_selling_point":
          homepageQuery.ilike(key, `%${value}%`);
          break;
        default:
          homepageQuery.eq(key, value);
          break;
      }
    }
  });

  // Fetch matching homepage IDs
  const { data: homepages, error: homepageError } = await homepageQuery;

  if (homepageError) {
    console.error("Error fetching homepages for sections:", homepageError);
    throw new Error("Failed to fetch matching homepages for sections");
  }

  const homepageIds = homepages?.map((homepage) => homepage.id) || [];

  // If no matching homepages are found, return an empty query
  if (homepageIds.length === 0) {
    return createClient()
      .from("sections")
      .select("*")
      .eq("id", "00000000-0000-0000-0000-000000000000"); // Use a dummy condition that will never be true
  }

  // Create the sections query based on homepage IDs and section-specific filters
  let sectionQuery = createClient().from("sections").select("*");

  // Filter by matching homepage IDs
  sectionQuery = sectionQuery.in("homepage_id", homepageIds);

  // Apply section-specific filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      switch (key) {
        case "section_type":
          sectionQuery = sectionQuery.eq("type", value);
          break;
        case "search":
          sectionQuery = sectionQuery.or(
            `type.ilike.%${value}%,image_url.ilike.%${value}%`
          );
          break;
        default:
          // Ignore homepage-related filters already handled
          break;
      }
    }
  });

  return sectionQuery;
};

// Type for the query
export type FetchSections = QueryData<
  ReturnType<typeof defineFetchSectionsQuery>
>;
