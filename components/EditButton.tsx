import {colors} from "@/theme";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";

interface EditButtonProps {
  onPress: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}>
      <Ionicons name='pencil' size={24} color='white' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default EditButton;
