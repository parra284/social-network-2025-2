// components/Card.tsx
import { colors } from "@/styles/colors";
import { Href, Link } from "expo-router";
import React from "react";
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type CardProps = {
  title: string;
  inputs: InputField[];
  buttonLabel: string;
  onPress: () => void;
  links?: CardLink[];
};

type InputField = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

type CardLink = {
  label: string;
  href: Href;
};

export default function Card({
  title,
  inputs,
  buttonLabel,
  onPress,
  links = [],
}: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {inputs.map((input, idx) => (
        <TextInput
          key={idx}
          style={styles.input}
          placeholder={input.placeholder}
          placeholderTextColor={colors.neutral500}
          value={input.value}
          onChangeText={input.onChangeText}
          secureTextEntry={input.secureTextEntry}
          keyboardType={input.keyboardType}
        />
      ))}

      <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>

      {links.length > 0 && (
        <View style={styles.linksWrap}>
          {links.map((link, idx) => (
            <Link key={idx} href={link.href} asChild>
              <TouchableOpacity>
                <Text style={styles.helper}>{link.label}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.neutral50,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.neutral900,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginTop: 14,
    backgroundColor: colors.neutral100,
    color: colors.neutral900,
  },
  button: {
    marginTop: 20,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary500,
    shadowColor: colors.primary300,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: colors.neutral50,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  linksWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  helper: {
    textAlign: "center",
    color: colors.accent700,
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
