import { useState, useEffect } from "react";
import { getProfileData } from "@/utils/auth/get-profile";
import { Tables } from "@/types/database.types";

type Profile = Tables<"profiles">;

export const useProfileData = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const data = await getProfileData();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to fetch profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return { profile, isLoading, error };
};
