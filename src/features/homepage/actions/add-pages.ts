"use server";

// queries
import { defineAddPageQuery } from "@/features/homepage/queries/define-add-page-query";
import { TablesInsert } from "@/types/database.types";

type PageInsert = TablesInsert<"pages">;

export async function addPages(pages: PageInsert[]): Promise<PageInsert[]> {
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
  return data;
}
