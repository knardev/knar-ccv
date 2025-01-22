import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/database.types";

type Section = Tables<"sections">;

/**
 * Define the query to update a section
 * @param sectionId - The ID of the section to update
 * @param updates - The updates to apply to the section
 * @returns Supabase query to update the section
 */
export const defineUpdateSectionQuery = (
  sectionId: string,
  updates: Partial<Section>,
) => {
  const query = createClient()
    .from("sections")
    .update(updates)
    .eq("id", sectionId)
    .select();

  return query;
};

// Type for the query result
export type UpdateSection = QueryData<
  ReturnType<typeof defineUpdateSectionQuery>
>;
