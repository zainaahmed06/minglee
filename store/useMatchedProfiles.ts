import {databases} from "@/services/appwrite";
import {useAuth} from "@/store/useAuth";
import {Profiles} from "@/types/appwrite";
import {useCallback, useEffect, useState} from "react";
import {Query} from "react-native-appwrite";

export const useMatchedProfiles = () => {
  const {user} = useAuth();
  const [matchedProfiles, setMatchedProfiles] = useState<Profiles[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatchedProfiles = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // First, get the current user's profile to access their matched array
      const userProfileResponse = await databases.listDocuments(
        "main",
        "profiles",
        [Query.equal("user_id", user.$id), Query.limit(1)]
      );

      if (userProfileResponse.documents.length === 0) {
        setMatchedProfiles([]);
        return;
      }

      // Add safe checks for matched_profiles
      const userProfile = userProfileResponse
        .documents[0] as unknown as Profiles;

      if (!userProfile || userProfile === undefined) {
        console.log("User profile not found");
        setMatchedProfiles([]);
        return;
      }

      console.log("User profile found:", JSON.stringify(userProfile));
      const matchedUserIds = userProfile.matched_profiles || [];

      if (matchedUserIds.length === 0) {
        setMatchedProfiles([]);
        return;
      }

      // Fetch profiles of liked users
      const matchedProfilesResponse = await databases.listDocuments(
        "main",
        "profiles",
        [
          Query.equal("user_id", matchedUserIds),
          Query.limit(100), // Reasonable limit
        ]
      );

      const profiles = matchedProfilesResponse.documents.map(
        (doc) => doc as unknown as Profiles
      );
      setMatchedProfiles(profiles);
    } catch (err: any) {
      console.error("Error fetching matched profiles:", err);
      setError(err.message || "Failed to fetch matched profiles");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refreshMatchedProfiles = () => {
    fetchMatchedProfiles();
  };

  useEffect(() => {
    if (user) {
      fetchMatchedProfiles();
    }
  }, [user, fetchMatchedProfiles]);

  return {
    matchedProfiles,
    isLoading,
    error,
    refreshMatchedProfiles,
    refetch: fetchMatchedProfiles,
  };
};
