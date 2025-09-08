import {colors, fontSizes, spacing} from "@/theme";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

interface PreferenceItem {
  id: string;
  name: string;
  icon: string;
}

interface PreferenceCategory {
  id: string;
  title: string;
  items: PreferenceItem[];
}

interface ProfilePreferencesProps {
  categories: PreferenceCategory[];
}

const PreferenceTag: React.FC<{item: PreferenceItem}> = ({item}) => {
  return (
    <View style={styles.preferenceTag}>
      <Text style={styles.preferenceIcon}>{item.icon}</Text>
      <Text style={styles.preferenceName}>{item.name}</Text>
    </View>
  );
};

const PreferenceCategoryItem: React.FC<{category: PreferenceCategory}> = ({
  category,
}) => {
  return (
    <View style={styles.category}>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <View style={styles.preferencesContainer}>
        {category.items.map((item) => (
          <PreferenceTag key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

const ProfilePreferences: React.FC<ProfilePreferencesProps> = ({
  categories,
}) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <PreferenceCategoryItem key={category.id} category={category} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  category: {
    marginVertical: spacing.md,
  },
  categoryTitle: {
    fontSize: fontSizes.md,
    fontFamily: "UrbanistBold",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  preferencesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.xs,
  },
  preferenceTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  preferenceIcon: {
    marginRight: 4,
  },
  preferenceName: {
    fontSize: fontSizes.sm,
    color: colors.text,
  },
});

export default ProfilePreferences;
