import {databases} from "@/services/appwrite";
import {useAuth} from "@/store/useAuth";
import {Profiles} from "@/types/appwrite";
import {useCallback, useEffect, useState} from "react";
import {Query} from "react-native-appwrite";

export const useLikedProfiles = () => {
  const {user} = useAuth();
  const [likedProfiles, setLikedProfiles] = useState<Profiles[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLikedProfiles = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // First, get the current user's profile to access their liked array
      const userProfileResponse = await databases.listDocuments(
        "main",
        "profiles",
        [Query.equal("user_id", user.$id), Query.limit(1)]
      );

      console.log(
        JSON.stringify(userProfileResponse.documents[0].liked_profiles)
      );

      if (userProfileResponse.documents.length === 0) {
        setLikedProfiles([]);
        return;
      }

      const userProfile = userProfileResponse
        .documents[0] as unknown as Profiles;
      const likedUserIds = userProfile.liked_profiles || [];

      if (likedUserIds.length === 0) {
        setLikedProfiles([]);
        return;
      }

      // Fetch profiles of liked users
      const likedProfilesResponse = await databases.listDocuments(
        "main",
        "profiles",
        [
          Query.equal("user_id", likedUserIds),
          Query.limit(100), // Reasonable limit
        ]
      );

      const profiles = likedProfilesResponse.documents.map(
        (doc) => doc as unknown as Profiles
      );
      setLikedProfiles(profiles);
    } catch (err: any) {
      console.error("Error fetching liked profiles:", err);
      setError(err.message || "Failed to fetch liked profiles");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refreshLikedProfiles = () => {
    fetchLikedProfiles();
  };

  useEffect(() => {
    if (user) {
      fetchLikedProfiles();
    }
  }, [user, fetchLikedProfiles]);

  return {
    likedProfiles,
    isLoading,
    error,
    refreshLikedProfiles,
    refetch: fetchLikedProfiles,
  };
};
