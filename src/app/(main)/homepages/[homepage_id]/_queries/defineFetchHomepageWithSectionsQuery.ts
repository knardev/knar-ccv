import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

// Define the query to fetch a homepage with its pages and sections
export const defineFetchHomepageWithPagesAndSectionsQuery = async (homepageId: string) => {
  const query = createClient()
    .from("homepages")
    .select(
      `
      *,
      pages (
        *,
        sections(*)
      )
    `
    )
    .eq("id", homepageId);

  return query;
};

// Type for the query
export type FetchHomepageWithPagesAndSections = QueryData<
  ReturnType<typeof defineFetchHomepageWithPagesAndSectionsQuery>
>;
