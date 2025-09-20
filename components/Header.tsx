import { colors } from "@/styles/colors";
import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

type HeaderProps = {
  title: string
};

export default function Header({
  title
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 10,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    color: colors.primary500,
    letterSpacing: 0.5,
  },
});
