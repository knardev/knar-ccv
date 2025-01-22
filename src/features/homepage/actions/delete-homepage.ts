"use server";

// queries
import { defineDeleteHomepageQuery } from "@/features/homepage/queries/define-delete-homepage-query";
// utils
import { revalidatePath } from "next/cache";

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

  revalidatePath("/explore/homepage/design", "page");
}
