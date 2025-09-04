import {colors, fontSizes, radius, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {router} from "expo-router";
import React, {useState} from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Types for preferences
interface PreferenceItem {
  id: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  showChevron?: boolean;
  rightContent?: React.ReactNode;
}

interface TogglePreferenceProps {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

interface SelectorButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

interface SliderPreferenceProps {
  title: string;
  subtitle: string;
  value: number;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  unit: string;
  onValueChange: (value: number) => void;
}

interface RangeSliderProps {
  title: string;
  subtitle: string;
  minValue: number;
  maxValue: number;
  minimumValue: number;
  maximumValue: number;
  onMinValueChange: (value: number) => void;
  onMaxValueChange: (value: number) => void;
}

// Header component
const DiscoveryHeader: React.FC = () => (
  <View style={styles.header}>
    <Pressable
      style={styles.backButton}
      onPress={() => router.back()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Ionicons name='arrow-back' size={24} color={colors.text} />
    </Pressable>
    <Text style={styles.headerTitle}>Discovery Preferences</Text>
    <View style={styles.placeholder} />
  </View>
);

// Preference item component
const PreferenceItemComponent: React.FC<{item: PreferenceItem}> = ({item}) => (
  <Pressable style={styles.preferenceItem} onPress={item.onPress}>
    <View style={styles.preferenceContent}>
      <Text style={styles.preferenceTitle}>{item.title}</Text>
      <Text style={styles.preferenceSubtitle}>{item.subtitle}</Text>
    </View>
    {item.rightContent ||
      (item.showChevron !== false && (
        <Ionicons
          name='chevron-forward'
          size={16}
          color={colors.textTertiary}
        />
      ))}
  </Pressable>
);

// Toggle preference component
const TogglePreference: React.FC<TogglePreferenceProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
}) => (
  <View style={styles.preferenceItem}>
    <View style={styles.preferenceContent}>
      <Text style={styles.preferenceTitle}>{title}</Text>
      <Text style={styles.preferenceSubtitle}>{subtitle}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{false: colors.border, true: colors.primary}}
      thumbColor={value ? colors.background : colors.textTertiary}
    />
  </View>
);

// Selector button component
const SelectorButton: React.FC<SelectorButtonProps> = ({
  title,
  isSelected,
  onPress,
}) => (
  <Pressable
    style={[styles.selectorButton, isSelected && styles.selectorButtonSelected]}
    onPress={onPress}>
    <Text
      style={[
        styles.selectorButtonText,
        isSelected && styles.selectorButtonTextSelected,
      ]}>
      {title}
    </Text>
  </Pressable>
);

// Distance unit selector component
const DistanceUnitSelector: React.FC<{
  selectedUnit: "km" | "mi";
  onUnitChange: (unit: "km" | "mi") => void;
}> = ({selectedUnit, onUnitChange}) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Show Distances in</Text>
    <View style={styles.selectorContainer}>
      <SelectorButton
        title='Km.'
        isSelected={selectedUnit === "km"}
        onPress={() => onUnitChange("km")}
      />
      <SelectorButton
        title='Mi.'
        isSelected={selectedUnit === "mi"}
        onPress={() => onUnitChange("mi")}
      />
    </View>
  </View>
);

// Slider preference component
const SliderPreference: React.FC<SliderPreferenceProps> = ({
  title,
  subtitle,
  value,
  minimumValue,
  maximumValue,
  step = 1,
  unit,
  onValueChange,
}) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sliderHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sliderValue}>
        {value} {unit}
      </Text>
    </View>
    <View style={styles.sliderContainer}>
      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={value}
        step={step}
        onValueChange={onValueChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        // thumbStyle={styles.sliderThumb}
      />
    </View>
    <Text style={styles.preferenceSubtitle}>{subtitle}</Text>
  </View>
);

// Range slider component (simplified dual slider)
const RangeSlider: React.FC<RangeSliderProps> = ({
  title,
  subtitle,
  minValue,
  maxValue,
  minimumValue,
  maximumValue,
  onMinValueChange,
  onMaxValueChange,
}) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sliderHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sliderValue}>
        {minValue} - {maxValue}
      </Text>
    </View>
    <View style={styles.rangeSliderContainer}>
      <Text style={styles.rangeLabel}>Min: {minValue}</Text>
      <Slider
        style={styles.rangeSlider}
        minimumValue={minimumValue}
        maximumValue={maxValue - 1}
        value={minValue}
        step={1}
        onValueChange={onMinValueChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        // thumbStyle={styles.sliderThumb}
      />
    </View>
    <View style={styles.rangeSliderContainer}>
      <Text style={styles.rangeLabel}>Max: {maxValue}</Text>
      <Slider
        style={styles.rangeSlider}
        minimumValue={minValue + 1}
        maximumValue={maximumValue}
        value={maxValue}
        step={1}
        onValueChange={onMaxValueChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        // thumbStyle={styles.sliderThumb}
      />
    </View>
    <Text style={styles.preferenceSubtitle}>{subtitle}</Text>
  </View>
);

const Discovery: React.FC = () => {
  // State for preferences
  const [goGlobal, setGoGlobal] = useState(false);
  const [showMe] = useState("Women");
  const [distanceUnit, setDistanceUnit] = useState<"km" | "mi">("km");
  const [distanceRange, setDistanceRange] = useState(200);
  const [ageMin, setAgeMin] = useState(20);
  const [ageMax, setAgeMax] = useState(25);

  const preferenceItems: PreferenceItem[] = [
    {
      id: "location",
      title: "Location",
      subtitle: "Change your location to find datify members in other cities.",
      onPress: () => {
        console.log("Navigate to Location settings");
        // Implement location selection
      },
    },
    {
      id: "show-me",
      title: "Show Me",
      subtitle: showMe,
      onPress: () => {
        console.log("Navigate to Show Me settings");
        // Implement gender preference selection
      },
      rightContent: (
        <View style={styles.showMeRight}>
          <Text style={styles.showMeValue}>{showMe}</Text>
          <Ionicons
            name='chevron-forward'
            size={16}
            color={colors.textTertiary}
          />
        </View>
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.background} />

      <DiscoveryHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Location and Show Me preferences */}
        <View style={styles.preferencesContainer}>
          {preferenceItems.map((item) => (
            <PreferenceItemComponent key={item.id} item={item} />
          ))}
        </View>

        {/* Go Global toggle */}
        <View style={styles.preferencesContainer}>
          <TogglePreference
            title='Go Global'
            subtitle='Going global will allow you to see people from all over the world.'
            value={goGlobal}
            onValueChange={setGoGlobal}
          />
        </View>

        {/* Distance unit selector */}
        <DistanceUnitSelector
          selectedUnit={distanceUnit}
          onUnitChange={setDistanceUnit}
        />

        {/* Distance range slider */}
        <SliderPreference
          title='Distance Range'
          subtitle='Set the maximum distance for potential matches.'
          value={distanceRange}
          minimumValue={1}
          maximumValue={500}
          step={1}
          unit={distanceUnit}
          onValueChange={setDistanceRange}
        />

        {/* Age range slider */}
        <RangeSlider
          title='Age Range'
          subtitle='Define the preferred age range for potential matches.'
          minValue={ageMin}
          maxValue={ageMax}
          minimumValue={18}
          maximumValue={100}
          onMinValueChange={setAgeMin}
          onMaxValueChange={setAgeMax}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  preferencesContainer: {
    marginTop: spacing.lg,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  preferenceContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  preferenceTitle: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  preferenceSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  showMeRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  showMeValue: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  sectionContainer: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.md,
  },
  selectorContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  selectorButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectorButtonText: {
    fontSize: fontSizes.md,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  selectorButtonTextSelected: {
    color: "white",
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  sliderValue: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.text,
  },
  sliderContainer: {
    marginBottom: spacing.md,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderThumb: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
  },
  rangeSliderContainer: {
    marginBottom: spacing.md,
  },
  rangeSlider: {
    width: "100%",
    height: 40,
    marginTop: spacing.xs,
  },
  rangeLabel: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default Discovery;
