"use server";

import { defineAddSectionsQuery } from "../query";
import { TablesInsert } from "@/types/database.types";

type Section = TablesInsert<"sections">;

/**
 * Action to add new sections
 * @param sectionsData - Array of sections to add
 * @returns The newly created sections
 */
export async function addSections(sectionsData: Section[]): Promise<Section[]> {
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
