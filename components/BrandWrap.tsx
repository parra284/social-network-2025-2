import { colors } from "@/styles/colors";
import { Image, StyleSheet, Text, View } from "react-native";

export default function BrandWrap() {
  return (
    <View style={styles.brandWrap}>
      <Image
        source={require("@/assets/images/app_logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.brand}>Conexus</Text>
      <Text style={styles.tagline}>Conectando ideas, creando futuro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
