// actions/fetchHomepages.ts
"use server";

import { defineFetchHomepagesQuery } from "../query";
import { parseHomepageFilters } from "../utils";
import { Tables } from "@/types/database.types";

type Homepage = Tables<"homepages">;

interface HomepageWithSections extends Homepage {
  sections: Array<Tables<"sections">>;
}

export async function fetchHomepages(
  searchParams: URLSearchParams
): Promise<HomepageWithSections[]> {
  const filters = parseHomepageFilters(searchParams);
  // If no filters are provided, fetch all homepages
  const hasFilters = Object.keys(filters).length > 0;
  const query = hasFilters
    ? defineFetchHomepagesQuery(filters)
    : defineFetchHomepagesQuery({});
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching homepages:", error);
    throw new Error("Failed to fetch homepages");
  }

  return data || [];
}