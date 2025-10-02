import BrandWrap from "@/components/BrandWrap";
import Form from "@/components/Form";
import { AuthContext } from "@/contexts/AuthContext";
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);    
      router.replace("/(main)/home");
    } catch (error) {
      Alert.alert("Error", "Algo salió mal. Intenta de nuevo.") 
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

        <Form
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
