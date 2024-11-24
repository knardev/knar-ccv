"use server";
import { createClient } from "../supabase/server";

/**
 * Fetch the profile data for the currently authenticated user
 * @returns The profile data or null if the user is not authenticated
 */
export const getProfileData = async () => {
  const supabase = createClient();

  // Get the currently authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.warn("No user is authenticated.");
    return null; // Return null if no user is authenticated
  }

  // Fetch the user's profile data
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single(); // Ensure only one row is returned

  if (error) {
    console.error("Error fetching profile data:", error);
    throw new Error("Failed to fetch profile data");
  }

  return data; // Return the profile data
};
