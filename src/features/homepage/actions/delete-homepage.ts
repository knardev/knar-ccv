"use server";

import { defineDeleteHomepageQuery } from "@/features/homepage/queries/defineDeleteHomepageQuery";
import { Tables } from "@/types/database.types";

type Homepage = Tables<"homepages">;

/**
 * Action to delete a homepage
 * @param homepageId - The ID of the homepage to delete
 * @returns The deleted homepage data
 */
export async function deleteHomepage(
  homepageId: string,
): Promise<Homepage> {
  const query = await defineDeleteHomepageQuery(homepageId);

  const { data, error } = query;

  if (error) {
    console.error("Error deleting homepage:", error);
    throw new Error("Failed to delete homepage");
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned after deleting homepage");
  }

  return data[0]; // Return the deleted homepage
}
