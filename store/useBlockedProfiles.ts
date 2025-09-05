import {databases} from "@/services/appwrite";
import {useAuth} from "@/store/useAuth";
import {Profiles} from "@/types/appwrite";
import {useCallback, useEffect, useState} from "react";
import {Query} from "react-native-appwrite";

export const useBlockedProfiles = () => {
  const {user} = useAuth();
  const [blockedProfiles, setBlockedProfiles] = useState<Profiles[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockedProfiles = useCallback(async () => {
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

      console.log(
        JSON.stringify(userProfileResponse.documents[0].blocked_profiles)
      );

      if (userProfileResponse.documents.length === 0) {
        setBlockedProfiles([]);
        return;
      }

      const userProfile = userProfileResponse
        .documents[0] as unknown as Profiles;
      const blockedUserIds = userProfile.blocked_profiles || [];

      if (blockedUserIds.length === 0) {
        setBlockedProfiles([]);
        return;
      }

      // Fetch profiles of liked users
      const blockedProfilesResponse = await databases.listDocuments(
        "main",
        "profiles",
        [
          Query.equal("user_id", blockedUserIds),
          Query.limit(100), // Reasonable limit
        ]
      );

      const profiles = blockedProfilesResponse.documents.map(
        (doc) => doc as unknown as Profiles
      );
      setBlockedProfiles(profiles);
    } catch (err: any) {
      console.error("Error fetching matched profiles:", err);
      setError(err.message || "Failed to fetch matched profiles");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refreshBlockedProfiles = () => {
    fetchBlockedProfiles();
  };

  useEffect(() => {
    if (user) {
      fetchBlockedProfiles();
    }
  }, [user, fetchBlockedProfiles]);

  return {
    blockedProfiles,
    isLoading,
    error,
    refreshBlockedProfiles,
    refetch: fetchBlockedProfiles,
  };
};
