// actions/fetchHomepageWithSections.ts
"use server";

import { defineFetchHomepageWithSectionsQuery } from "../_queries/defineFetchHomepageWithSectionsQuery";
import { Tables } from "@/types/database.types";

type Homepage = Tables<"homepages">;

interface HomepageWithSections extends Homepage {
  sections: Array<Tables<"sections">>;
}

export async function fetchHomepageWithSections(
  homepageId: string
): Promise<HomepageWithSections> {
  const query = defineFetchHomepageWithSectionsQuery(homepageId);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching homepage with sections:", error);
    throw new Error("Failed to fetch homepage with sections");
  }

  if (!data || data.length === 0) {
    throw new Error(`No homepage found with ID: ${homepageId}`);
  }

  return data[0]; // Return the first item since we expect a single homepage
}
