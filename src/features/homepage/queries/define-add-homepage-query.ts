import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/database.types";

/**
 * Define a query to insert a new homepage
 *
 * @param homepageData - The data to insert into the `homepages` table
 * @returns Supabase query result containing the inserted homepage
 */
type HomepageInsert = TablesInsert<"homepages">;

export const defineAddHomepageQuery = async (homepageData: HomepageInsert) => {
  const query = createClient()
    .from("homepages")
    .insert(homepageData)
    .select();

  return query;
};

export type AddHomepage = QueryData<
  ReturnType<typeof defineAddHomepageQuery>
>;
