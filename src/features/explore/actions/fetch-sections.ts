// actions/fetchSections.ts
"use server";

// queries
import { defineFetchSectionsQuery } from "@/features/explore/queries/define-fetch-section-query";
// utils
import { parseSectionFilters } from "@/features/explore/utils/utils";
// types
import { Tables } from "@/types/database.types";

type Section = Tables<"sections">;

export async function fetchSections(
  searchParams: URLSearchParams,
): Promise<Section[]> {
  const filters = parseSectionFilters(searchParams);

  // If no filters are provided, fetch all sections
  const hasFilters = Object.keys(filters).length > 0;
  const query = hasFilters
    ? defineFetchSectionsQuery(filters)
    : defineFetchSectionsQuery({});

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching sections:", error);
    throw new Error("Failed to fetch sections");
  }

  return data || [];
}
