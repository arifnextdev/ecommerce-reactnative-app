import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function CatalogCenter() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<StatusBar style="dark" />
			<Stack.Screen options={{ headerShown: false }} />

			{/* Top illustration section */}
			<View style={styles.illustrationContainer}>
				{/* Placeholder for character illustration */}
				<View style={styles.characterWrapper}>
					<Image
						source={require("../assets/images/shopping_character.png")}
						style={styles.characterPlaceholder}
						resizeMode="cover"
						width={width * 1.3}
						height={width * 1.3}
					/>

					{/* Recreating subtle circles from design */}
					<View style={styles.decoratorCircle} />
					<View
						style={[
							styles.decoratorCircle,
							{ top: "20%", right: "10%", borderColor: "#FFD700" },
						]}
					/>
				</View>
			</View>

			{/* Bottom Content Card */}
			<View style={styles.card}>
				<View style={styles.cardHandle} />

				<Text style={styles.title}>PromoVault Deals Catalog Center</Text>
				<Text style={styles.description}>
					Welcome to PromoVault! You will find all the catalogs here!
				</Text>

				<TouchableOpacity
					style={styles.button}
					onPress={() => router.replace("/(tabs)")}
				>
					<Text style={styles.buttonText}>Get started</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D1FF8D", // Light green top
	},
	illustrationContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 40,
	},
	characterWrapper: {
		width: width * 0.8,
		height: width * 0.8,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	characterPlaceholder: {
		width: "100%",
		height: "100%",
	},
	decoratorCircle: {
		position: "absolute",
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#A8D66D",
		left: "10%",
		top: "40%",
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		padding: 30,
		paddingBottom: 50,
		alignItems: "center",
	},
	cardHandle: {
		width: 40,
		height: 4,
		backgroundColor: "#F0F0F0",
		borderRadius: 2,
		marginBottom: 30,
	},
	title: {
		fontSize: 26,
		fontWeight: "800",
		color: "#000000",
		textAlign: "center",
		marginBottom: 15,
		lineHeight: 32,
	},
	description: {
		fontSize: 16,
		color: "#666666",
		textAlign: "center",
		lineHeight: 24,
		marginBottom: 40,
		maxWidth: "85%",
	},
	button: {
		width: "100%",
		height: 60,
		backgroundColor: "#000000",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "600",
	},
});
