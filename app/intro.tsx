// app/intro.tsx
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export default function Intro() {
  const router = useRouter();
  const didNavigateRef = useRef(false);
  const fade = useRef(new Animated.Value(1)).current;

  const FIXED_DURATION_MS = 3000;

  const goNext = () => {
    if (didNavigateRef.current) return;
    didNavigateRef.current = true;

    Animated.timing(fade, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => router.replace("/login"));
  };

  useEffect(() => {
    const t = setTimeout(goNext, FIXED_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient
      colors={[colors.primary50, colors.primary200, colors.primary400]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <Animated.View style={[styles.container, { opacity: fade }]}>
        <LottieView
          source={require("../assets/animations/intro.json")}
          autoPlay
          loop={false}
          style={styles.animation}
          resizeMode="contain"
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  animation: {
    width: 220,
    height: 220,
    marginBottom: 32,
  }
});
