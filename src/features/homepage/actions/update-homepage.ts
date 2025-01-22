"use server";

// queries
import { defineUpdateHomepageQuery } from "@/features/homepage/queries/define-update-homepage-query";
// utils
import { revalidatePath } from "next/cache";
// types
import { Tables } from "@/types/database.types";

type Homepage = Tables<"homepages">;

export async function updateHomepage(
  homepageId: string,
  updatedData: Partial<Homepage>,
) {
  const query = defineUpdateHomepageQuery(homepageId, updatedData);

  const { data, error } = await query;

  if (error) {
    console.error("Error updating homepage:", error);
    throw new Error("Failed to update homepage");
  }
  revalidatePath(`/homepages/${homepageId}`);
}
