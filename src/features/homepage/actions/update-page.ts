"use server";

// queries
import { defineUpdatePageQuery } from "@/features/homepage/queries/define-update-page-query";
// utils
import { revalidatePath } from "next/cache";
// types
import { TablesUpdate } from "@/types/database.types";

type PageUpdate = TablesUpdate<"pages">;

export async function updatePage(
  pageId: string,
  updatedData: PageUpdate,
) {
  const query = defineUpdatePageQuery(pageId, updatedData);

  const { data, error } = await query;

  if (error) {
    console.error("Error updating homepage:", error);
    throw new Error("Failed to update homepage");
  }
  return data;
  // revalidatePath(`/homepages/[homepage_id]`);
}
