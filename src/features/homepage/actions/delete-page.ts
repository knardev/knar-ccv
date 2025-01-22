"use server";

// queries
import {
  defineDeletePageQuery,
  DeletePage,
} from "@/features/homepage/queries/define-delete-page-query";
// utils
import { revalidatePath } from "next/cache";

/**
 * Action to delete a page
 * @param pageId - The ID of the page to delete
 * @returns The deleted page data
 */
export async function deletePage(
  pageId: string,
): Promise<void> {
  const query = await defineDeletePageQuery(pageId);

  const { data, error } = query;

  if (error) {
    console.error("Error deleting homepage:", error);
    throw new Error("Failed to delete homepage");
  }

  if (!data) {
    throw new Error("No data returned after deleting homepage");
  }

  revalidatePath("/explore/homepage/design", "page");
}
