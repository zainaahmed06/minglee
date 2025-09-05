import {Ionicons} from "@expo/vector-icons";
import React, {useRef, useState} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import {useProfiles} from "../hooks/useProfiles";
import {colors, spacing} from "../theme";
import type {Profiles} from "../types/appwrite";
import {ProfileCard} from "./ProfileCard";

export const ProfileSwiper: React.FC = () => {
  const {profiles, loading, error, fetchProfiles, recordSwipe} = useProfiles();
  const swiperRef = useRef<Swiper<Profiles>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handle swiping right (like)
  const handleSwipeRight = (cardIndex: number) => {
    const profile = profiles[cardIndex];
    recordSwipe(profile.$id, true);
  };

  // Handle swiping left (dislike)
  const handleSwipeLeft = (cardIndex: number) => {
    const profile = profiles[cardIndex];
    recordSwipe(profile.$id, false);
  };

  // Handle when all cards are swiped
  const handleAllSwiped = () => {
    fetchProfiles();
    setCurrentIndex(0);
  };

  // Button handlers for manual swiping
  const handleLikePress = () => {
    swiperRef.current?.swipeRight();
  };

  const handleDislikePress = () => {
    swiperRef.current?.swipeLeft();
  };

  if (loading && profiles.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color={colors.primary} />
        <Text style={styles.loadingText}>Finding people near you...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name='alert-circle-outline' size={50} color={colors.danger} />
        <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        <Text style={styles.errorSubText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfiles}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (profiles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name='search-outline' size={50} color={colors.primary} />
        <Text style={styles.emptyText}>No more profiles to show</Text>
        <Text style={styles.emptySubText}>
          Try again later or adjust your preferences
        </Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchProfiles}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={profiles}
        renderCard={(card) => (
          <ProfileCard
            profile={card}
            onLike={() => swiperRef.current?.swipeRight()}
            onDislike={() => swiperRef.current?.swipeLeft()}
          />
        )}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        onSwipedAll={handleAllSwiped}
        cardIndex={currentIndex}
        backgroundColor={colors.background}
        stackSize={2}
        stackSeparation={20}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        animateCardOpacity
        animateOverlayLabelsOpacity
        infinite={false}
        showSecondCard
        disableBottomSwipe
        disableTopSwipe
        overlayLabels={{
          left: {
            title: "NOPE",
            style: {
              label: {
                backgroundColor: colors.danger,
                color: colors.textInverse,
                fontSize: 24,
                borderRadius: 10,
                padding: 10,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            title: "LIKE",
            style: {
              label: {
                backgroundColor: colors.success,
                color: colors.textInverse,
                fontSize: 24,
                borderRadius: 10,
                padding: 10,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: 30,
              },
            },
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  errorText: {
    marginTop: spacing.md,
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  errorSubText: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  retryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 50,
  },
  retryButtonText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  emptyText: {
    marginTop: spacing.md,
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  emptySubText: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  refreshButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 50,
  },
  refreshButtonText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: "600",
  },
  // Removed buttons container styles as they're now in ProfileCard
});
