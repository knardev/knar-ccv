import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

/**
 * Define the query to delete a homepage
 * @param pageId - The ID of the homepage to delete
 * @returns Supabase query to delete the homepage
 */
export const defineDeletePageQuery = async (pageId: string) => {
  const query = createClient()
    .from("pages")
    .delete()
    .eq("id", pageId)
    .select()
    .single();

  return query;
};

// Type for the query result
export type DeletePage = QueryData<
  ReturnType<typeof defineDeletePageQuery>
>;
