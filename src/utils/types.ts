import { PostgrestResponse } from "@supabase/supabase-js";

export type QueryData<T> = T extends () => Promise<PostgrestResponse<infer U>> ? U : never;