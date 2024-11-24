import { QueryData } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";

/**
 * Define the query to delete a homepage
 * @param homepageId - The ID of the homepage to delete
 * @returns Supabase query to delete the homepage
 */
export const defineDeleteHomepageQuery = async (homepageId: string) => {
  const query = createClient()
    .from("homepages")
    .delete()
    .eq("id", homepageId)
    .select();

  return query;
};

// Type for the query result
export type DeleteHomepage = QueryData<
  ReturnType<typeof defineDeleteHomepageQuery>
>;
