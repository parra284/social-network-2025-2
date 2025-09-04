// Index.tsx
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Marca con logo */}
      <View style={styles.brandWrap}>
        <Image
          source={require("../assets/images/app_logo.png")} // coloca tu logo en esta ruta
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
          placeholderTextColor="#A0AEC0"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} activeOpacity={0.9}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.helper}>¿Olvidaste tu contraseña?</Text>
      </View>

      <Text style={styles.footer}>© 2025 Conexus</Text>
    </View>
  );
}

const NAVY = "#1E293B"; // azul profundo
const BLUE = "#3B82F6"; // azul acento
const BG_DARK = "#0F172A"; // fondo oscuro elegante
const CARD_BG = "#1E293B"; // tarjeta oscura
const INPUT_BG = "#334155"; // gris-azulado para inputs
const TEXT_LIGHT = "#F1F5F9"; // texto claro

const styles = StyleSheet.create({
  // Fondo oscuro elegante
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  // Marca con logo
  brandWrap: { alignItems: "center", marginBottom: 34 },
  logo: {
    width: 100,
    height: 100
  },
  brand: {
    fontSize: 32,
    fontWeight: "800",
    color: TEXT_LIGHT,
    letterSpacing: 1,
  },
  tagline: { fontSize: 14, color: "#94A3B8", marginTop: 4 },

  // Card
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_LIGHT,
    marginBottom: 12,
    textAlign: "center",
  },

  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginTop: 14,
    backgroundColor: INPUT_BG,
    color: TEXT_LIGHT,
  },

  button: {
    marginTop: 20,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BLUE,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  helper: {
    textAlign: "center",
    color: "#CBD5E1",
    marginTop: 14,
    fontSize: 13,
  },

  footer: {
    position: "absolute",
    bottom: 22,
    color: "#94A3B8",
    fontSize: 12,
  },
});
