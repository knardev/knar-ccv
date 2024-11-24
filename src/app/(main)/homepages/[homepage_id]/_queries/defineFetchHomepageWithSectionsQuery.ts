import { QueryData } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";

// Define the query to fetch a homepage with its sections
export const defineFetchHomepageWithSectionsQuery = async (homepageId: string) => {
  const query = createClient()
    .from("homepages")
    .select(
      `
      *,
      sections(*)
    `
    )
    .eq("id", homepageId);

  return query;
};

// Type for the query
export type FetchHomepageWithSections = QueryData<
  ReturnType<typeof defineFetchHomepageWithSectionsQuery>
>;


