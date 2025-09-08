import {colors, fontSizes, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

interface AttributeItem {
  id: string;
  value: string;
  icon?: string;
  flag?: string;
}

interface AttributeSection {
  id: string;
  title: string;
  items: AttributeItem[];
}

interface ProfileAttributesProps {
  sections: AttributeSection[];
}

const AttributeTag: React.FC<{item: AttributeItem}> = ({item}) => {
  return (
    <View style={styles.attributeTag}>
      {item.flag && <Text style={styles.flagIcon}>{item.flag}</Text>}
      {item.icon && (
        <Ionicons
          name={item.icon as any}
          size={16}
          color={colors.textSecondary}
          style={styles.attributeIcon}
        />
      )}
      <Text style={styles.attributeText}>{item.value}</Text>
    </View>
  );
};

const ProfileAttributeSection: React.FC<{section: AttributeSection}> = ({
  section,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.attributesContainer}>
        {section.items.map((item) => (
          <AttributeTag key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

const ProfileAttributes: React.FC<ProfileAttributesProps> = ({sections}) => {
  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <ProfileAttributeSection key={section.id} section={section} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontFamily: "UrbanistBold",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  attributesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.xs,
  },
  attributeTag: {
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
  flagIcon: {
    marginRight: 4,
  },
  attributeIcon: {
    marginRight: 4,
  },
  attributeText: {
    fontSize: fontSizes.sm,
    color: colors.text,
  },
});

export default ProfileAttributes;
