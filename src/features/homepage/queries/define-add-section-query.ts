import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/database.types";

/**
 * Define a query to insert multiple sections
 *
 * @param sectionsData - An array of section data to insert into the `sections` table
 * @returns Supabase query result containing the inserted sections
 */

type SectionInsert = TablesInsert<"sections">;

export const defineAddSectionsQuery = async (sectionsData: SectionInsert[]) => {
  const query = createClient()
    .from("sections")
    .insert(sectionsData)
    .select("*");

  return query;
};

export type AddSections = QueryData<
  ReturnType<typeof defineAddSectionsQuery>
>;
