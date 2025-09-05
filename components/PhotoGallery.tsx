import {colors, spacing} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

interface Photo {
  id: string;
  uri: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onPhotoPress: (photoId: string) => void;
  onAddPhotoPress: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onPhotoPress,
  onAddPhotoPress,
}) => {
  return (
    <View style={styles.galleryContainer}>
      {photos.map((photo) => (
        <TouchableOpacity
          key={photo.id}
          style={styles.photoContainer}
          onPress={() => onPhotoPress(photo.id)}>
          <Image source={{uri: photo.uri}} style={styles.photo} />
          <View style={styles.photoOverlay}>
            <Ionicons
              name='close-circle'
              size={24}
              color={colors.primary}
              style={styles.removeIcon}
            />
          </View>
        </TouchableOpacity>
      ))}

      {photos.length < 6 && (
        <TouchableOpacity
          style={styles.addPhotoContainer}
          onPress={onAddPhotoPress}>
          <Ionicons name='add' size={40} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  photoContainer: {
    width: "32%",
    aspectRatio: 0.8,
    marginBottom: spacing.sm,
    position: "relative",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  photoOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 4,
  },
  removeIcon: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  addPhotoContainer: {
    width: "32%",
    aspectRatio: 0.8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
  },
});

export default PhotoGallery;
