import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useContext, useMemo, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../hooks/useTheme";

export default function Register() {
  const theme = useTheme();
  
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = useMemo(() => StyleSheet.create({
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
      color: theme.neutral800,
      letterSpacing: 1,
      textShadowColor: "#0008",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
    },
    tagline: { fontSize: 14, color: theme.neutral600, marginTop: 4 },
    card: {
      width: "100%",
      maxWidth: 420,
      backgroundColor: theme.neutral50,
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
      color: theme.neutral900,
      marginBottom: 12,
      textAlign: "center",
      letterSpacing: 0.5,
    },
    input: {
      width: "100%",
      height: 48,
      borderWidth: 1,
      borderColor: theme.neutral300,
      borderRadius: 12,
      paddingHorizontal: 14,
      marginTop: 14,
      backgroundColor: theme.neutral100,
      color: theme.neutral900,
    },
    button: {
      marginTop: 20,
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary500,
      shadowColor: theme.primary300,
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
      color: theme.neutral50,
      fontSize: 16,
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    helper: {
      textAlign: "center",
      color: theme.accent700,
      marginTop: 14,
      fontSize: 13,
      textDecorationLine: "underline",
    },
    footer: {
      position: "absolute",
      bottom: 22,
      color: theme.neutral600,
      fontSize: 12,
      alignSelf: "center",
      opacity: 0.8,
    },
  }), [theme]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const success = await register(
        {
          email: email.trim(),
          name: name.trim(),
          username: username.trim(),
          id: '' // Se asigna automáticamente
        },
        password
      );

      if (success) {
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
      } else {
        Alert.alert('Error', 'No se pudo crear la cuenta. Intenta de nuevo.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error?.message || 'Ocurrió un error inesperado. Intenta de nuevo.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
};

  return (
    <LinearGradient
      colors={[theme.primary50, theme.primary200, theme.primary400]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* Marca con logo */}
        <View style={styles.brandWrap}>
          <Image
            source={require("../../assets/images/app_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>Conexus</Text>
          <Text style={styles.tagline}>Conectando ideas, creando futuro</Text>
        </View>

        {/* Card de registro */}
        <View style={styles.card}>
          <Text style={styles.title}>Crear cuenta</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor={theme.neutral500}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor={theme.neutral500}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Nombre Completo"
            placeholderTextColor={theme.neutral500}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={theme.neutral500}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor={theme.neutral500}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 14 }}>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.helper}>Iniciar sesión</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <Text style={styles.footer}>© 2025 Conexus</Text>
      </View>
    </LinearGradient>
  );
}
