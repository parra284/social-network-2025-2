import { useColorScheme } from "react-native";
import { COLORS } from "../constants/colors";

export function useTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? COLORS.dark : COLORS.light;
}
