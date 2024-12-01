// actions/fetchHomepageWithSections.ts
"use server";

import { defineFetchHomepageWithPagesAndSectionsQuery } from "../_queries/defineFetchHomepageWithSectionsQuery";
import { Tables } from "@/types/database.types";
import {HomepageWithPageAndSections} from "../types";

export async function fetchHomepageWithPageAndSections(
  homepageId: string
): Promise<HomepageWithPageAndSections | null> {
  const query = defineFetchHomepageWithPagesAndSectionsQuery(homepageId);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching homepage with sections:", error);
    throw new Error("Failed to fetch homepage with sections");
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as HomepageWithPageAndSections; // Return the first item with the appropriate type
}
