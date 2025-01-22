"use server";

// queries
import {
  AddPage,
  defineAddPageQuery,
} from "@/features/homepage/queries/define-add-page-query";
// types
import { TablesInsert } from "@/types/database.types";
import { revalidate } from "@/utils/revalidate";

type PageInsert = TablesInsert<"pages">;

export async function addPages(pages: PageInsert[]): Promise<AddPage> {
  // Define the query for adding pages
  const query = defineAddPageQuery(pages);

  // Execute the query and handle the result
  const { data, error } = await query;

  // Log and throw an error if the query fails
  if (error) {
    console.error("Error adding pages:", error);
    throw new Error("Failed to add pages");
  }

  // Ensure data is returned, otherwise throw an error
  if (!data || data.length === 0) {
    throw new Error("No data returned after adding pages");
  }

  // Return all inserted rows
  revalidate("/homepages/[homepage_id]", "layout");
  return data;
}
