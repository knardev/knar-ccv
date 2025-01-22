"use server";

// queries
import { defineAddSectionsQuery } from "@/features/homepage/queries/define-add-section-query";
// types
import { Section, SectionInsert } from "@/features/homepage/types/types";

/**
 * Action to add new sections
 * @param sectionsData - Array of sections to add
 * @returns The newly created sections
 */
export async function addSections(
  sectionsData: SectionInsert[],
): Promise<Section[]> {
  const query = defineAddSectionsQuery(sectionsData);

  const { data, error } = await query;

  if (error) {
    console.error("Error adding sections:", error);
    throw new Error("Failed to add sections");
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned after adding sections");
  }

  return data; // Return all inserted rows
}
