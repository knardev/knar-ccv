import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/database.types";

/**
 * Define a query to insert a new page
 *
 * @param pages - An array of section data to insert into the `pages` table
 * @returns Supabase query result containing the inserted page
 */

type PageInsert = TablesInsert<"pages">;

export const defineAddPageQuery = async (pages: PageInsert[]) => {
  const query = createClient()
    .from("pages")
    .insert(pages)
    .select();

  return query;
};

export type AddPage = QueryData<
  ReturnType<typeof defineAddPageQuery>
>;
