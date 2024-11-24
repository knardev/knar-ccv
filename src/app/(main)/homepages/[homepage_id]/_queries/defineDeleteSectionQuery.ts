import { QueryData } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";

/**
 * Define the query to delete a section
 * @param sectionId - The ID of the section to delete
 * @returns Supabase query to delete the section
 */
export const defineDeleteSectionQuery = async (sectionId: string) => {
  const query = createClient()
    .from("sections")
    .delete()
    .eq("id", sectionId)
    .select();

  return query;
};

// Type for the query result
export type DeleteSection = QueryData<
  ReturnType<typeof defineDeleteSectionQuery>
>;
