import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

// Define the query to fetch a homepage with its pages and sections
export const defineFetchSectionWithHomepageQuery = (
  sectionId: string,
) => {
  const query = createClient()
    .from("sections")
    .select(`
      *,
      homepage:homepages (
        *
      )
    `)
    .eq("id", sectionId)
    .single();

  return query;
};

// Type for the query
export type FetchSectionWithHomepage = QueryData<
  ReturnType<typeof defineFetchSectionWithHomepageQuery>
>;
