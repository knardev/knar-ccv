/**
 * @file actions/add-pages.ts
 * @description Server action for adding new pages to the database.
 * 
 * This file defines a server action:
 * - `beingAddedPagesState`: Handles the insertion of new pages into the `pages` table.
 * 
 * ## Functions
 * - beingAddedPagesState: Adds multiple pages to the database and returns the inserted rows.
 * 
 * ## Usage
 * This server action can be used to add new pages to a homepage. It handles the database interaction and ensures proper error handling.
 * 
 * Example:
 * ```typescript
 * import { beingAddedPagesState } from "@/actions/add-pages";
 * 
 * async function addPages(pages) {
 *   try {
 *     const addedPages = await beingAddedPagesState(pages);
 *     console.log("Pages added successfully:", addedPages);
 *   } catch (error) {
 *     console.error("Failed to add pages:", error);
 *   }
 * }
 * ```
 * 
 * ## Error Handling
 * - Logs detailed error messages to the console for debugging purposes.
 * - Throws an error if no data is returned or if there is a database error.
 * 
 * ## Types
 * - `Page`: Represents a single row to be inserted into the `pages` table.
 * 
 * ## Author
 * - Maintainer: @felix
 * 
 * ## Last Updated
 * - Date: 2024-12-01
 */

"use server";

import { defineAddPageQuery } from "../query";
import { TablesInsert } from "@/types/database.types";

type Page = TablesInsert<"pages">;

/**
 * Action to add new pages
 * 
 * @param pagesData - An array of page data to be inserted into the database.
 * @returns The newly created pages.
 * 
 * @throws Will throw an error if the insertion fails or if no data is returned.
 * 
 * Example usage:
 * ```typescript
 * const pages = [
 *   { category: "Main", homepage_id: "123", title: "Main Page" },
 *   { category: "Sub", homepage_id: "123", title: "Sub Page 1" }
 * ];
 * 
 * const addedPages = await beingAddedPagesState(pages);
 * console.log(addedPages);
 * ```
 */
export async function addPages(pages: Page[]): Promise<Page[]> {
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
