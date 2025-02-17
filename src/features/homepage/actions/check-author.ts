"use server";

import { createClient } from "@/utils/supabase/server";

export const checkAuthor = async (
  homepageProfileId: string,
): Promise<boolean> => {
  const supabase = createClient();

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.warn("No authenticated user found.");
    return false;
  }

  // Fetch the user's profile to get their profile ID
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }

  // Compare the profile ID with the homepage's profile ID
  return profile?.id === homepageProfileId;
};
