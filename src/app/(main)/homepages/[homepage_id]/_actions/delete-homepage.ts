"use server";

import { revalidatePath } from "next/cache";
import { defineDeleteHomepageQuery } from "../_queries/defineDeleteHomepageQuery";
import { Tables } from "@/types/database.types";

/**
 * Action to delete a homepage
 * @param homepageId - The ID of the homepage to delete
 * @returns The deleted homepage data
 */
export async function deleteHomepage(
  homepageId: string,
): Promise<void> {
  const query = await defineDeleteHomepageQuery(homepageId);

  const { data, error } = query;

  if (error) {
    console.error("Error deleting homepage:", error);
    throw new Error("Failed to delete homepage");
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned after deleting homepage");
  }
}
