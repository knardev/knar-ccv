// actions/fetchHomepageWithSections.ts
"use server";

// queries
import {
  defineFetchSectionWithHomepageQuery,
  FetchSectionWithHomepage,
} from "@/features/section/queries/define-fetch-section-with-homepage-query";

export async function fetchSectionWithHomepage(
  sectionId: string,
): Promise<FetchSectionWithHomepage | null> {
  const query = defineFetchSectionWithHomepageQuery(sectionId);

  const { data, error } = await query;
  console.log(data);

  if (error) {
    console.error("Error fetching section:", error);
    throw new Error("Failed to fetch section");
  }

  if (!data) {
    return null;
  }

  return data as FetchSectionWithHomepage;
}
