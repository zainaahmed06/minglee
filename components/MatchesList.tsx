import {useMatchedProfiles} from "@/store/useMatchedProfiles";
import {colors, radius, spacing} from "@/theme";
import {Profiles} from "@/types/appwrite";
import {
  calculateAge,
  formatDistance,
  getDisplayName,
  getProfileImageUrl,
} from "@/utils/chatHelpers";
import {Ionicons} from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

const {width} = Dimensions.get("window");
const cardWidth = (width - spacing.lg * 3) / 2; // Two cards per row with spacing

interface ProfileCardProps {
  profile: Profiles;
  onPress: (profile: Profiles) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({profile, onPress}) => {
  const displayName = getDisplayName(profile);
  const profileImage = getProfileImageUrl(profile);
  const age = profile.birth_date ? calculateAge(profile.birth_date) : null;

  // Mock distance for now - you can integrate with location services later
  const distance = Math.floor(Math.random() * 20) + 1;

  return (
    <Pressable style={styles.card} onPress={() => onPress(profile)}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: profileImage}}
          style={styles.profileImage}
          defaultSource={require("@/assets/images/MingleeLogo.png")}
        />
        {profile.is_verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name='checkmark-circle' size={20} color='#10B981' />
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.nameText} numberOfLines={1}>
          {displayName} {age && `(${age})`}
        </Text>
        <Text style={styles.distanceText} numberOfLines={1}>
          {formatDistance(distance)}
        </Text>
      </View>
    </Pressable>
  );
};

const MatchesList = () => {
  const {matchedProfiles, isLoading, error, refreshMatchedProfiles} =
    useMatchedProfiles();

  const handleProfilePress = (profile: Profiles) => {
    console.log(`Profile ${profile.user_id} pressed`);
    // Navigation logic would go here
    // router.push(`/profile/${profile.user_id}`);
  };

  const renderProfileCard = ({item}: {item: Profiles}) => (
    <ProfileCard profile={item} onPress={handleProfilePress} />
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name='heart-dislike-outline' size={60} color='#EF4444' />
        <Text style={styles.errorText}>Failed to load liked profiles</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={refreshMatchedProfiles}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading && matchedProfiles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size='large' color={colors.primary} />
        <Text style={styles.loadingText}>Loading liked profiles...</Text>
      </View>
    );
  }

  if (matchedProfiles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <LottieView
          autoPlay
          style={{height: 120, width: 120}}
          source={require("@/lotties/Match.json")}
        />
        <Text style={styles.emptyText}>No matched profiles yet</Text>
        <Text style={styles.emptySubtext}>
          Profiles that Matched with you will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={matchedProfiles}
        renderItem={renderProfileCard}
        keyExtractor={(item) => item.user_id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshMatchedProfiles}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: "space-between",
  },
  separator: {
    height: spacing.lg,
  },
  card: {
    width: cardWidth,
    backgroundColor: colors.background,
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: cardWidth * 1.2, // Aspect ratio similar to the design
  },
  profileImage: {
    borderRadius: radius.md,
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F4F6",
  },
  verifiedBadge: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  cardContent: {
    paddingHorizontal: 0,
    padding: spacing.sm,
  },
  nameText: {
    fontSize: 16,
    fontFamily: "UrbanistBold",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  distanceText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "UrbanistBold",
    color: colors.text,
    marginTop: spacing.md,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    fontFamily: "UrbanistBold",
    color: colors.text,
    marginTop: spacing.md,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
    marginTop: spacing.lg,
  },
  retryText: {
    color: "white",
    fontSize: 16,
    fontFamily: "UrbanistBold",
  },
});

export default MatchesList;
