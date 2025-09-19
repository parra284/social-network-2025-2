import { AuthContext } from '@/contexts/AuthContext';
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Login() {
  const { login } = useContext(AuthContext)
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await login(email, password)
    if (response) {
      router.navigate("/(main)/home");
    }
  }

  return (
    <LinearGradient
      colors={[colors.primary50, colors.primary200, colors.primary400]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* Marca con logo */}
        <View style={styles.brandWrap}>
          <Image
            source={require("@/assets/images/app_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>Conexus</Text>
          <Text style={styles.tagline}>Conectando ideas, creando futuro</Text>
        </View>

        {/* Card de login */}
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor={colors.neutral500}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={colors.neutral500}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 14 }}>
            <Link href="/(auth)/recover" asChild>
              <TouchableOpacity>
                <Text style={styles.helper}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.helper}>Crear cuenta</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <Text style={styles.footer}>© 2025 Conexus</Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  brandWrap: { alignItems: "center", marginBottom: 34 },
  logo: {
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  brand: {
    fontSize: 32,
    fontWeight: "800",
    color:  colors.neutral800,
    letterSpacing: 1,
    textShadowColor: "#0008",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  tagline: { fontSize: 14, color: colors.neutral600, marginTop: 4 },
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
  helper: {
    textAlign: "center",
    color: colors.accent700,
    marginTop: 14,
    fontSize: 13,
    textDecorationLine: "underline",
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