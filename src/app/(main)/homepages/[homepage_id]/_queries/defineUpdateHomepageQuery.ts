import { QueryData } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/database.types";

type Homepage = Tables<"homepages">;

export const defineUpdateHomepageQuery = async (
  homepageId: string,
  updates: Partial<Homepage>
) => {
  const query = createClient()
    .from("homepages")
    .update(updates)
    .eq("id", homepageId);

  return query;
};

export type UpateHomepage = QueryData<
  ReturnType<typeof defineUpdateHomepageQuery>
>;