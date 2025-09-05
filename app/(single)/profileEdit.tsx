import {colors} from "@/theme";
import {router} from "expo-router";
import React, {useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

// Import components
import ActionButton from "@/components/ActionButton";
import BasicItem from "@/components/BasicItem";
import EditField from "@/components/EditField";
import EditHeader from "@/components/EditHeader";
import PhotoGallery from "@/components/PhotoGallery";
import SectionLink from "@/components/SectionLink";
import SocialMediaLink from "@/components/SocialMediaLink";

const ProfileEdit = () => {
  // State for form fields
  const [profileData, setProfileData] = useState({
    nickname: "Andrew",
    birthday: "12/27/1995",
    gender: "Man",
    pronouns: "",
    height: "",
    weight: "",
    jobTitle: "",
    company: "",
    school: "",
    location: "",
    aboutMe: "",
    socialMedia: {
      facebook: "https://facebook.com/username",
      instagram: "https://instagram.com/username",
      tiktok: "https://tiktok.com/@username",
      twitter: "https://twitter.com/username",
      linkedin: "https://www.linkedin.com/in/username",
    },
  });

  // Mock photos data
  const [photos] = useState([
    {
      id: "1",
      uri: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    },
    {
      id: "2",
      uri: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    },
    {
      id: "3",
      uri: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "4",
      uri: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    {
      id: "5",
      uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
  ]);

  // Mock interest data
  const interests = [
    {name: "Travel", icon: "✈️"},
    {name: "Movies", icon: "🎬"},
    {name: "Art", icon: "🎨"},
    {name: "Technology", icon: "💻"},
  ];

  // Form update handlers
  const handleFieldChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setProfileData({
      ...profileData,
      socialMedia: {
        ...profileData.socialMedia,
        [platform.toLowerCase()]: value,
      },
    });
  };

  // Navigation handlers
  const handleCancel = () => {
    router.back();
  };

  const handleSave = () => {
    // Save profile data
    console.log("Saving profile data:", profileData);
    router.back();
  };

  const handleAddPhoto = () => {
    console.log("Add photo pressed");
  };

  const handlePhotoPress = (photoId: string) => {
    console.log("Photo pressed:", photoId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <EditHeader
        title='Edit Profile'
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <PhotoGallery
          photos={photos}
          onPhotoPress={handlePhotoPress}
          onAddPhotoPress={handleAddPhoto}
        />

        {/* Basic Information Fields */}
        <EditField
          label='Nickname'
          value={profileData.nickname}
          onChangeText={(text) => handleFieldChange("nickname", text)}
        />

        <EditField
          label='Birthday'
          value={profileData.birthday}
          type='date'
          onPress={() => console.log("Open date picker")}
        />

        <EditField
          label='Gender'
          value={profileData.gender}
          type='select'
          onPress={() => console.log("Open gender selection")}
        />

        <EditField
          label='Pronouns'
          value={profileData.pronouns}
          type='select'
          onPress={() => console.log("Open pronouns selection")}
        />

        <EditField
          label='Height'
          value={profileData.height}
          placeholder='Height'
          type='select'
          onPress={() => console.log("Open height selection")}
        />

        <EditField
          label='Weight'
          value={profileData.weight}
          placeholder='Weight'
          type='select'
          onPress={() => console.log("Open weight selection")}
        />

        <EditField
          label='Job Title'
          placeholder='Add Job Title'
          value={profileData.jobTitle}
          onChangeText={(text) => handleFieldChange("jobTitle", text)}
        />

        <EditField
          label='Company'
          placeholder='Add Company'
          value={profileData.company}
          onChangeText={(text) => handleFieldChange("company", text)}
        />

        <EditField
          label='School'
          placeholder='Add School'
          value={profileData.school}
          type='select'
          onPress={() => console.log("Open school selection")}
        />

        <EditField
          label='Living in'
          placeholder='Add City'
          value={profileData.location}
          type='select'
          onPress={() => console.log("Open location selection")}
        />

        <EditField
          label='About Me'
          placeholder='About Me'
          value={profileData.aboutMe}
          onChangeText={(text) => handleFieldChange("aboutMe", text)}
        />

        {/* Section Links */}
        <SectionLink
          title='Interests'
          previewItems={interests.map((i) => i.name)}
          onPress={() => router.push("/(single)/interests")}
        />

        {/* Social Media Links */}
        <SocialMediaLink
          platform='Facebook'
          value={profileData.socialMedia.facebook}
          onChangeText={(text) => handleSocialMediaChange("facebook", text)}
        />
        <SocialMediaLink
          platform='Instagram'
          value={profileData.socialMedia.instagram}
          onChangeText={(text) => handleSocialMediaChange("instagram", text)}
        />
        <SocialMediaLink
          platform='TikTok'
          value={profileData.socialMedia.tiktok}
          onChangeText={(text) => handleSocialMediaChange("tiktok", text)}
        />
        <SocialMediaLink
          platform='Twitter'
          value={profileData.socialMedia.twitter}
          onChangeText={(text) => handleSocialMediaChange("twitter", text)}
        />
        <SocialMediaLink
          platform='LinkedIn'
          value={profileData.socialMedia.linkedin}
          onChangeText={(text) => handleSocialMediaChange("linkedin", text)}
        />

        {/* Section Links */}
        <SectionLink
          title='Languages I Know'
          onPress={() => router.push("/(single)/languagesSelection")}
        />
        <SectionLink
          title='Relationship Goals'
          onPress={() => router.push("/(single)/relationshipGoals")}
        />

        {/* Basic Items */}
        <BasicItem
          icon='compass-outline'
          label='Zodiac'
          value='Select'
          onPress={() => console.log("Open zodiac selection")}
        />
        <BasicItem
          icon='school-outline'
          label='Education'
          value='Select'
          onPress={() => console.log("Open education selection")}
        />
        <BasicItem
          icon='home-outline'
          label='Family Plans'
          value='Select'
          onPress={() => console.log("Open family plans selection")}
        />
        <BasicItem
          icon='medkit-outline'
          label='COVID Vaccine'
          value='Select'
          onPress={() => console.log("Open vaccine selection")}
        />
        <BasicItem
          icon='person-outline'
          label='Personality Type'
          value='Select'
          onPress={() => console.log("Open personality selection")}
        />
        <BasicItem
          icon='chatbubble-outline'
          label='Communication Style'
          value='Select'
          onPress={() => console.log("Open communication style selection")}
        />
        <BasicItem
          icon='heart-outline'
          label='Love Style'
          value='Select'
          onPress={() => console.log("Open love style selection")}
        />
        <BasicItem
          icon='leaf-outline'
          label='Food Type'
          value='Select'
          onPress={() => console.log("Open food type selection")}
        />

        {/* Section Links */}
        <SectionLink
          title='Lifestyle'
          onPress={() => router.push("/(single)/lifestyleSelection")}
        />
        <SectionLink
          title='Music Preferences'
          onPress={() => router.push("/(single)/musicPreferences")}
        />
        <SectionLink
          title='Movies Preferences'
          onPress={() => router.push("/(single)/moviePreferences")}
        />
        <SectionLink
          title='Book Preferences'
          onPress={() => router.push("/(single)/bookPreferences")}
        />
        <SectionLink
          title='Travel Preferences'
          onPress={() => router.push("/(single)/travelPreferences")}
        />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <ActionButton
            label='Cancel'
            variant='outline'
            onPress={handleCancel}
            style={styles.cancelButton}
          />
          <ActionButton
            label='Save'
            variant='primary'
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 30,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export default ProfileEdit;
