import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<CartProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="catalog" />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</CartProvider>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
