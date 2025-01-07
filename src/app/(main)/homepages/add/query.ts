/**
 * @file query.ts
 * @description Queries for inserting new data into the `homepages`, `sections`, and `pages` tables in the database.
 * 
 * This file contains three primary queries:
 * 1. `defineAddHomepageQuery`: Inserts a new homepage into the `homepages` table.
 * 2. `defineAddSectionsQuery`: Inserts multiple sections into the `sections` table.
 * 3. `defineAddPageQuery`: Inserts a new page into the `pages` table.
 * 
 * ## Functions
 * - `defineAddHomepageQuery`: Adds a new homepage record.
 * - `defineAddSectionsQuery`: Adds multiple sections in a single query.
 * - `defineAddPageQuery`: Adds a new page record.
 * 
 * ## Types
 * - `AddHomepage`: Type for the result of the `defineAddHomepageQuery` function.
 * - `AddSections`: Type for the result of the `defineAddSectionsQuery` function.
 * - `AddPage`: Type for the result of the `defineAddPageQuery` function.
 * 
 * ## Usage
 * These queries can be used in actions or services to interact with the database for adding new records.
 * 
 * ## Author
 * - Maintainer: @felix
 * 
 * ## Last Updated
 * - Date: 2024-12-01
 */

import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/database.types";

// Type definitions
type Homepage = TablesInsert<"homepages">;
type Section = TablesInsert<"sections">;
type Page = TablesInsert<"pages">;

/**
 * Define a query to insert a new homepage
 * 
 * @param homepageData - The data to insert into the `homepages` table
 * @returns Supabase query result containing the inserted homepage
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

/**
 * Define a query to insert multiple sections
 * 
 * @param sectionsData - An array of section data to insert into the `sections` table
 * @returns Supabase query result containing the inserted sections
 */
export const defineAddSectionsQuery = async (sectionsData: Section[]) => {
  const query = createClient()
    .from("sections")
    .insert(sectionsData)
    .select();

  return query;
};

export type AddSections = QueryData<
  ReturnType<typeof defineAddSectionsQuery>
>;

/**
 * Define a query to insert a new page
 * 
 * @param pages - An array of section data to insert into the `pages` table
 * @returns Supabase query result containing the inserted page
 */
export const defineAddPageQuery = async (pages: Page[]) => {
  const query = createClient()
    .from("pages")
    .insert(pages)
    .select();

  return query;
};

export type AddPage = QueryData<
  ReturnType<typeof defineAddPageQuery>
>;
