"use server";

import { defineDeleteSectionQuery } from "../_queries/defineDeleteSectionQuery";
import { Tables } from "@/types/database.types";

type Section = Tables<"sections">;

/**
 * Action to delete a section
 * @param sectionId - The ID of the section to delete
 * @returns The deleted section data
 */
export async function deleteSection(sectionId: string): Promise<Section> {
  const query = await defineDeleteSectionQuery(sectionId);

  const { data, error } = await query;

  if (error) {
    console.error("Error deleting section:", error);
    throw new Error("Failed to delete section");
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned after deleting section");
  }

  return data[0]; // Return the deleted section
}
