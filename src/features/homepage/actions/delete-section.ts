"use server";

// queries
import { defineDeleteSectionQuery } from "@/features/homepage/queries/define-delete-section-query";
// utils
import { revalidatePath } from "next/cache";
// types

/**
 * Action to delete a section
 * @param sectionId - The ID of the section to delete
 * @returns The deleted section data
 */
export async function deleteSection(sectionId: string) {
  const query = await defineDeleteSectionQuery(sectionId);

  const { data, error } = query;

  if (error) {
    console.error("Error deleting section:", error);
    throw new Error("Failed to delete section");
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned after deleting section");
  }

  revalidatePath("/homepages/[homepage_id]", "layout");
}
