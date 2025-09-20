import { colors } from "@/styles/colors";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

type HeaderProps = {
  label: string,
  onPress: () => void
};

export default function Button({
  label,
  onPress
}: HeaderProps) {
  return (
    <TouchableOpacity style={styles.button} onPress = {onPress}>
        <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.primary500,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center"
  },
  buttonText: {
    color: colors.neutral50,
    fontWeight: "700",
    fontSize: 15,
  }
});
