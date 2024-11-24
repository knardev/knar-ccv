// queries/addHomepageQuery.ts
import { QueryData } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/database.types";

type Homepage = TablesInsert<"homepages">;

/**
 * Define a query to insert a new homepage
 * @param homepageData - Data to insert into the homepages table
 * @returns Supabase query to insert the homepage
 */
export const defineAddHomepageQuery = async (homepageData: Homepage) => {
  const query = createClient()
    .from("homepages")
    .insert(homepageData)
    .select();

  return query;
};

export type AddHomepage = QueryData<
  ReturnType<typeof defineAddHomepageQuery>
>;

type Section = TablesInsert<"sections">;

/**
 * Define a query to insert multiple sections
 * @param sectionsData - Array of sections to insert
 * @returns Supabase query to insert the sections
 */
export const defineAddSectionsQuery = async (sectionsData: Section[]) => {
  const query = createClient().from("sections").insert(sectionsData).select();

  return query;
};

export type AddSections = QueryData<ReturnType<typeof defineAddSectionsQuery>>;
