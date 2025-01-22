// actions/fetchHomepageWithSections.ts
"use server";

// queries
import {
  defineFetchHomepageWithPagesAndSectionsQuery,
  FetchHomepageWithPagesAndSections,
} from "@/features/homepage/queries/define-fetch-homepage-with-sections-query";

export async function fetchHomepageWithPageAndSections(
  homepageId: string,
): Promise<FetchHomepageWithPagesAndSections[number] | null> {
  const query = defineFetchHomepageWithPagesAndSectionsQuery(homepageId);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching homepage with sections:", error);
    throw new Error("Failed to fetch homepage with sections");
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as FetchHomepageWithPagesAndSections[number]; // Return the first item with the appropriate type
}
