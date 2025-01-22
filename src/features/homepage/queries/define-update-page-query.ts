import { QueryData } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { TablesUpdate } from "@/types/database.types";

type PageUpdate = TablesUpdate<"pages">;

export const defineUpdatePageQuery = async (
  pageId: string,
  updates: PageUpdate,
) => {
  const query = createClient()
    .from("pages")
    .update(updates)
    .eq("id", pageId)
    .select(
      `
        *, 
        sections (*)
      `,
    )
    .single();

  return query;
};

export type UpatePage = QueryData<
  ReturnType<typeof defineUpdatePageQuery>
>;
