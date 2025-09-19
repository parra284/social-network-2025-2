// app/(auth)/login.tsx
import BrandWrap from "@/components/auth/BrandWrap";
import Card from "@/components/auth/Card";
import { AuthContext } from "@/contexts/AuthContext";
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response) {
      router.navigate("/(main)/home");
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary50, colors.primary200, colors.primary400]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <BrandWrap />

        <Card
          title="Iniciar sesión"
          inputs={[
            {
              placeholder: "Correo",
              value: email,
              onChangeText: setEmail,
              keyboardType: "email-address",
            },
            {
              placeholder: "Contraseña",
              value: password,
              onChangeText: setPassword,
              secureTextEntry: true,
            },
          ]}
          buttonLabel="Entrar"
          onPress={handleLogin}
          links={[
            { label: "¿Olvidaste tu contraseña?", href: "/(auth)/recover" },
            { label: "Crear cuenta", href: "/(auth)/register" },
          ]}
        />

        <Text style={styles.footer}>© 2025 Conexus</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  footer: {
    position: "absolute",
    bottom: 22,
    color: colors.neutral600,
    fontSize: 12,
    alignSelf: "center",
    opacity: 0.8,
  },
});
