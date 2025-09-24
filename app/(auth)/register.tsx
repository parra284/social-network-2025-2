import BrandWrap from "@/components/BrandWrap";
import Form from "@/components/Form";
import { AuthContext } from "@/contexts/AuthContext";
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function Register() {
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      await register(
        {
          email: formData.email.trim(),
          name: formData.name.trim(),
          username: formData.username.trim(),
          id: '', // Se asigna automáticamente
        },
        formData.password
      );

      Alert.alert(
        'Cuenta creada',
        'Tu cuenta ha sido creada exitosamente',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(main)/home')
          }
        ]
      );

    } catch (error) {
      Alert.alert("Error", "No se pudo crear la cuenta. Intenta de nuevo.");
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
        {/* Marca con logo */}
        <BrandWrap />

        {/* Form de registro */}
        <Form
          title="Registrarse"
          inputs={[
            {
              placeholder: "Correo",
              value: formData.email,
              onChangeText: (value) => handleInputChange('email', value),
              keyboardType: "email-address",
            },
            {
              placeholder: "Usuario",
              value: formData.username,
              onChangeText: (value) => handleInputChange('username', value)
            },
            {
              placeholder: "Nombre",
              value: formData.name,
              onChangeText: (value) => handleInputChange('name', value)
            },
            {
              placeholder: "Contraseña",
              value: formData.password,
              onChangeText: (value) => handleInputChange('password', value),
              secureTextEntry: true,
            },
            {
              placeholder: "Confirmar contraseña",
              value: formData.confirmPassword,
              onChangeText: (value) => handleInputChange('confirmPassword', value),
              secureTextEntry: true,
            },
          ]}
          buttonLabel="Registrarse"
          onPress={handleRegister}
          links={[
            { label: "Iniciar sesión", href: "/(auth)/login" },
          ]}
        />

        <Text style={styles.footer}>© 2025 Conexus</Text>
      </View>
    </LinearGradient>
  );
};

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
    color: colors.neutral800,
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
