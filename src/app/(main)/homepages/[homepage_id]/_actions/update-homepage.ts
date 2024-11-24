"use server";

import { defineUpdateHomepageQuery } from "../_queries/defineUpdateHomepageQuery";
import { Tables } from "@/types/database.types";

type Homepage = Tables<"homepages">;

export async function updateHomepage(
  homepageId: string,
  updatedData: Partial<Homepage>
) {
  const query = defineUpdateHomepageQuery(homepageId, updatedData);

  const { data, error } = await query;

  if (error) {
    console.error("Error updating homepage:", error);
    throw new Error("Failed to update homepage");
  }
}
