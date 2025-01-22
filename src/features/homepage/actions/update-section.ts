"use server";

// queries
import { defineUpdateSectionQuery } from "@/features/homepage/queries/define-update-section-query";
// types
import { Tables } from "@/types/database.types";
// utils
import { revalidatePath } from "next/cache";

type Section = Tables<"sections">;

/**
 * Action to update a section
 * @param sectionId - The ID of the section to update
 * @param updatedData - The data to update in the section
 * @returns The updated section data
 */
export async function updateSection(
  sectionId: string,
  updatedData: Partial<Section>,
): Promise<void> {
  const query = await defineUpdateSectionQuery(sectionId, updatedData);

  const { data, error } = await query;

  if (error) {
    console.error("Error updating section:", error);
    throw new Error("Failed to update section");
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned after updating section");
  }

  revalidatePath("/homepages/[homepage_id]", "layout");
}
