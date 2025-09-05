import EditButton from "@/components/EditButton";
import ProfileAttributes from "@/components/ProfileAttributes";
import ProfileBio from "@/components/ProfileBio";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileInfo from "@/components/ProfileInfo";
import ProfileInterests from "@/components/ProfileInterests";
import ProfilePreferences from "@/components/ProfilePreferences";
import ProfileSocialMedia from "@/components/ProfileSocialMedia";
import {colors} from "@/theme";
import {router} from "expo-router";
import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Profile = () => {
  // Mock data
  const profileData = {
    image:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    completionPercentage: 100,
    name: "Andrew",
    age: 27,
    gender: "Man (He/Him/His)",
    height: "185 cm",
    weight: "76 kg",
    occupation: "Product Designer at Google LLC",
    education: "Columbia University",
    location: "New York City",
    distance: "Less than a kilometer away",
    aboutMe:
      "I'm an adventurous soul who loves exploring new places, trying exotic cuisines, and meeting interesting people. My passion for travel is matched by my love for photography! Let's embark on an exciting journey together!",
    interests: [
      {id: "1", name: "Travel", icon: "✈️"},
      {id: "2", name: "Movies", icon: "🎬"},
      {id: "3", name: "Art", icon: "🎨"},
      {id: "4", name: "Technology", icon: "💻"},
      {id: "5", name: "Science", icon: "🔬"},
    ],
    socialMedia: [
      {id: "1", platform: "Facebook", icon: ""},
      {id: "2", platform: "Instagram", icon: ""},
      {id: "3", platform: "TikTok", icon: ""},
      {id: "4", platform: "Twitter", icon: ""},
      {id: "5", platform: "LinkedIn", icon: ""},
    ],
    attributes: [
      {
        id: "languages",
        title: "Languages I Know",
        items: [
          {id: "1", value: "English", flag: "🇺🇸"},
          {id: "2", value: "Chinese", flag: "🇨🇳"},
          {id: "3", value: "Spanish", flag: "🇪🇸"},
          {id: "4", value: "French", flag: "🇫🇷"},
        ],
      },
      {
        id: "relationship",
        title: "Relationship Goals",
        items: [{id: "1", value: "Dating", icon: "heart"}],
      },
      {
        id: "religion",
        title: "Religion",
        items: [{id: "1", value: "Christianity", icon: "book-outline"}],
      },
      {
        id: "anthem",
        title: "My Anthem",
        items: [
          {
            id: "1",
            value: "Girls Like You ft. Cardi B",
            icon: "musical-notes-outline",
          },
        ],
      },
      {
        id: "basics",
        title: "Basics",
        items: [
          {id: "1", value: "Capricorn", icon: "star-outline"},
          {id: "2", value: "Bachelor's", icon: "school-outline"},
          {id: "3", value: "Not Sure Yet", icon: "help-circle-outline"},
          {id: "4", value: "Vaccinated", icon: "medkit-outline"},
          {id: "5", value: "INTP", icon: "analytics-outline"},
          {id: "6", value: "Listener", icon: "ear-outline"},
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle",
        items: [
          {id: "1", value: "Cat", icon: "paw-outline"},
          {id: "2", value: "Non-Drinker", icon: "wine-outline"},
          {id: "3", value: "Non-smoker", icon: "flame-outline"},
          {id: "4", value: "Sometimes", icon: "barbell-outline"},
          {id: "5", value: "Vegetarian", icon: "leaf-outline"},
          {id: "6", value: "Active on Sundays", icon: "walk-outline"},
          {id: "7", value: "Regular Sleeper", icon: "bed-outline"},
        ],
      },
    ],
    preferences: [
      {
        id: "music",
        title: "Music Preferences",
        items: [
          {id: "1", name: "Pop", icon: "🎵"},
          {id: "2", name: "Rock", icon: "🎸"},
          {id: "3", name: "Hip-Hop", icon: "🎤"},
        ],
      },
      {
        id: "movies",
        title: "Movies Preferences",
        items: [
          {id: "1", name: "Action", icon: "🎬"},
          {id: "2", name: "Thriller", icon: "🔪"},
          {id: "3", name: "Sci-Fi", icon: "👽"},
          {id: "4", name: "Adventure", icon: "🏞️"},
          {id: "5", name: "Fantasy", icon: "🧙‍♂️"},
        ],
      },
      {
        id: "books",
        title: "Book Preferences",
        items: [
          {id: "1", name: "Fiction", icon: "📚"},
          {id: "2", name: "Comics", icon: "💬"},
          {id: "3", name: "Science", icon: "🔬"},
          {id: "4", name: "Fantasy", icon: "🧙‍♂️"},
          {id: "5", name: "Mystery/Thriller", icon: "🔍"},
        ],
      },
      {
        id: "travel",
        title: "Travel Preferences",
        items: [
          {id: "1", name: "Adventure Travel", icon: "🧗‍♂️"},
          {id: "2", name: "Beach Vacations", icon: "🏖️"},
          {id: "3", name: "Road Trips", icon: "🚗"},
          {id: "4", name: "Food Tourism", icon: "🍽️"},
          {id: "5", name: "Art Galleries", icon: "🖼️"},
        ],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          profileImage={profileData.image}
          completionPercentage={profileData.completionPercentage}
          onEditPress={() => console.log("Edit profile")}
          onSettingsPress={() => router.push("/(single)/settings")}
        />

        <ProfileInfo
          name={profileData.name}
          age={profileData.age}
          gender={profileData.gender}
          height={profileData.height}
          weight={profileData.weight}
          occupation={profileData.occupation}
          education={profileData.education}
          location={profileData.location}
          distance={profileData.distance}
        />

        <ProfileBio aboutText={profileData.aboutMe} />
        <ProfileInterests interests={profileData.interests} />
        <ProfileSocialMedia accounts={profileData.socialMedia} />
        <ProfileAttributes sections={profileData.attributes} />
        <ProfilePreferences categories={profileData.preferences} />
      </ScrollView>

      <EditButton onPress={() => console.log("Edit profile")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default Profile;
