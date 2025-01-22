"use server";

// queries
import { fetchHomepageWithPageAndSections } from "@/features/homepage/actions/fetch-homepage-with-page-and-sections";

export async function fetchAllData(homepage_id: string) {
  const data = await fetchHomepageWithPageAndSections(homepage_id);

  return { data };
}
