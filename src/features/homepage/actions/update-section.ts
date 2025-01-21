"use server";

import { defineUpdateSectionQuery } from "../_queries/defineUpdateSectionQuery";
import { Tables } from "@/types/database.types";

type Section = Tables<"sections">;

/**
 * Action to update a section
 * @param sectionId - The ID of the section to update
 * @param updatedData - The data to update in the section
 * @returns The updated section data
 */
export async function updateSection(
  sectionId: string,
  updatedData: Partial<Section>
): Promise<Section> {
  const query = await defineUpdateSectionQuery(sectionId, updatedData);

  const { data, error } = await query;

  if (error) {
    console.error("Error updating section:", error);
    throw new Error("Failed to update section");
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned after updating section");
  }

  return data[0]; // Return the updated section
}
