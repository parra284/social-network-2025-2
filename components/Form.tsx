import { colors } from "@/styles/colors";
import { Href, Link } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormProps = {
  title?: string;
  inputs: InputField[];
  buttonLabel: string;
  onPress: () => void;
  links?: FormLink[];
};

type InputField = {
  label?: string,
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  minHeight?: number;
};

type FormLink = {
  label: string;
  href: Href;
};

export default function Form({
  title,
  inputs,
  buttonLabel,
  onPress,
  links = []
}: FormProps) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      setLoading(true);
      await onPress();
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.form}>
      {title ? <Text style={styles.title}>{title}</Text> : null}

      {inputs.map((input, idx) => (
        <View key={idx} style={styles.inputWrap}>
          {input.label ? (
            <Text style={styles.inputLabel}>{input.label}</Text>
          ) : null}
          <TextInput
            style={[styles.input, input.minHeight ? {minHeight: input.minHeight, textAlignVertical:"top", marginBottom: 30} : null]}
            placeholder={input.placeholder}
            placeholderTextColor={colors.neutral500}
            value={input.value}
            onChangeText={input.onChangeText}
            secureTextEntry={input.secureTextEntry}
            keyboardType={input.keyboardType}
            multiline={input.multiline}
          />
        </View>
      ))}


      <TouchableOpacity 
        style={[styles.button, {opacity: loading ? 0.6 : 1}]}  
        onPress={handlePress}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : buttonLabel}
        </Text>
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
  form: {
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
    marginBottom: 4,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  inputWrap: {
    marginTop: 18
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary700,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginTop: 6,
    backgroundColor: colors.neutral100,
    color: colors.neutral900,
  },
  button: {
    marginTop: 30,
    marginBottom: 12,
    paddingVertical: 14,
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
    marginTop: 14
  },
  helper: {
    textAlign: "center",
    color: colors.accent700,
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
