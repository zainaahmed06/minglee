import {useCallback, useEffect, useState} from "react";
import {Query} from "react-native-appwrite";
import {COLLECTIONS, DATABASES, PROFILES_LIMIT} from "../constants/databases";
import {databases} from "../services/appwrite";
import {useAuth} from "../store/useAuth";
import type {Profiles} from "../types/appwrite";

export const useProfiles = () => {
  const {user} = useAuth();
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Function to fetch random profiles
  const fetchProfiles = useCallback(async () => {
    if (!user) {
      setError("Please login to see profiles");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Get random profiles, excluding the current user
      const response = await databases.listDocuments(
        DATABASES.MAIN,
        COLLECTIONS.PROFILES,
        [
          Query.limit(PROFILES_LIMIT),
          Query.notEqual("user_id", user.$id), // Exclude the current user
          // You can add filters here based on user preferences
          // For example, Query.equal('gender', 'FEMALE') if user is interested in females
        ]
      );

      const fetchedProfiles = response.documents as Profiles[];

      if (fetchedProfiles.length === 0) {
        setHasMore(false);
      } else {
        setProfiles(fetchedProfiles);
      }
    } catch (err: any) {
      console.error("Error fetching profiles:", err);
      setError(err.message || "Failed to fetch profiles");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Record a swipe (like or dislike)
  const recordSwipe = useCallback(
    async (profileId: string, isLike: boolean) => {
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      try {
        await databases.createDocument(
          DATABASES.MAIN,
          "swipes", // Make sure this collection exists in your Appwrite database
          "unique()", // Generate a unique ID
          {
            swiper_id: user.$id, // Use actual user ID from auth state
            swiped_user_id: profileId,
            is_like: isLike,
          }
        );

        // If it's a like, check if there's a match
        if (isLike && user) {
          const response = await databases.listDocuments(
            DATABASES.MAIN,
            "swipes",
            [
              Query.equal("swiper_id", profileId),
              Query.equal("swiped_user_id", user.$id), // Use actual user ID
              Query.equal("is_like", true),
            ]
          );

          // If the other person has already liked the current user
          if (response.documents.length > 0) {
            // Create a match
            await databases.createDocument(
              DATABASES.MAIN,
              "matches", // Make sure this collection exists
              "unique()", // Generate a unique ID
              {
                user1_id: user.$id, // Use actual user ID
                user2_id: profileId,
                matched_at: new Date().toISOString(),
                is_active: true,
              }
            );

            // Here you could trigger a match notification or UI feedback
            console.log("It's a match!");
          }
        }
      } catch (err) {
        console.error("Error recording swipe:", err);
      }
    },
    [user]
  );

  // Initial fetch of profiles
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return {
    profiles,
    loading,
    error,
    hasMore,
    fetchProfiles,
    recordSwipe,
  };
};
