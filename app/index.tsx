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
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function OnboardingMap() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="dark" />
			<Stack.Screen options={{ headerShown: false }} />

			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>Top promotions</Text>
					<View style={styles.highlightWrapper}>
						<View style={styles.highlight} />
						<Text style={styles.title}>nearby</Text>
						<Text style={styles.title}> now</Text>
					</View>
				</View>

				<View style={styles.mapContainer}>
					<Image
						source={require("../assets/images/map_onboarding.png")}
						style={styles.mapImage}
						resizeMode="cover"
					/>
					<View style={styles.mapOverlay}>
						<View style={styles.mapPin}>
							<View style={styles.pinCircle} />
							<View style={styles.pinPoint} />
						</View>
					</View>
				</View>

				<View style={styles.footer}>
					<Text style={styles.description}>
						Discover top promotions near you with automatic location detection.
					</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => router.push("/catalog")}
					>
						<View style={styles.buttonInner} />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		justifyContent: "space-between",
		paddingBottom: 40,
		paddingTop: 60,
	},
	header: {
		alignItems: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		color: "#000000",
		textAlign: "center",
		lineHeight: 40,
	},
	highlightWrapper: {
		flexDirection: "row",
		alignItems: "center",
		position: "relative",
	},
	highlight: {
		position: "absolute",
		left: 0,
		right: 55, // Adjust based on "nearby" word length
		height: 35,
		backgroundColor: "#D1FF8D",
		top: 5,
		borderRadius: 8,
		zIndex: -1,
	},
	mapContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		overflow: "hidden",
		borderRadius: 40,
		marginVertical: 20,
	},
	mapImage: {
		width: "100%",
		height: "100%",
		borderRadius: 40,
	},
	mapOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.1)",
	},
	mapPin: {
		width: 60,
		height: 80,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
	pinCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#FF5A5F",
		borderWidth: 5,
		borderColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	pinPoint: {
		width: 0,
		height: 0,
		backgroundColor: "transparent",
		borderStyle: "solid",
		borderLeftWidth: 10,
		borderRightWidth: 10,
		borderBottomWidth: 20,
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
		borderBottomColor: "#FF5A5F",
		transform: [{ rotate: "180deg" }],
		marginTop: -5,
	},
	footer: {
		alignItems: "center",
	},
	description: {
		fontSize: 14,
		color: "#666666",
		textAlign: "center",
		lineHeight: 20,
		marginBottom: 30,
		maxWidth: "80%",
	},
	button: {
		width: "100%",
		height: 60,
		backgroundColor: "#000000",
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonInner: {
		width: 40,
		height: 4,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
	},
});
