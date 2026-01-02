import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface TabIconProps {
	focused: boolean;
	iconName: keyof typeof MaterialCommunityIcons.glyphMap;
	label: string;
}

function TabIcon({ focused, iconName, label }: TabIconProps) {
	// Increase width slightly to accommodate longer labels like "Profile"
	const width = useSharedValue(focused ? 90 : 50);
	const opacity = useSharedValue(focused ? 1 : 0);

	useEffect(() => {
		const config = {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		};
		// Instant layout change
		width.value = focused ? 90 : 50;
		// Animated opacity
		opacity.value = withTiming(focused ? 1 : 0, config);
	}, [focused]);

	const animatedStyle = useAnimatedStyle(() => ({
		width: width.value,
		backgroundColor: withTiming(focused ? "#D1FF8D" : "transparent", {
			duration: 300,
		}),
	}));

	const labelStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateX: interpolate(opacity.value, [0, 1], [10, 0]) }],
	}));

	return (
		<Animated.View style={[styles.tabItem, animatedStyle]}>
			<MaterialCommunityIcons
				name={iconName}
				size={24}
				color={focused ? "#000000" : "#FFFFFF"}
				style={{ flexShrink: 0 }}
			/>
			{focused && (
				<Animated.Text numberOfLines={1} style={[styles.tabLabel, labelStyle]}>
					{label}
				</Animated.Text>
			)}
		</Animated.View>
	);
}

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: styles.tabBar,
				tabBarShowLabel: false,
				// Remove manual ItemStyle to rely on our custom component centering
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							iconName={focused ? "home-variant" : "home-variant-outline"}
							label="Home"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							iconName={focused ? "card-text" : "card-text-outline"}
							label="Card"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="cart"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							iconName={focused ? "cart" : "cart-outline"}
							label="Cart"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="stores"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							iconName={focused ? "storefront" : "storefront-outline"}
							label="Stores"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							iconName={focused ? "emoticon-happy" : "emoticon-happy-outline"}
							label="Profile"
						/>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		position: "absolute",
		bottom: 30,
		left: 20,
		right: 20,
		marginHorizontal: 10,
		backgroundColor: "#000000",
		borderRadius: 25, // Rounded pill shape
		height: 75,
		paddingHorizontal: 25,
		borderTopWidth: 0,
		elevation: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	tabItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 35,
		height: 50,
		borderRadius: 15,
		overflow: "hidden", // Prevent content from spilling during animation
	},
	tabLabel: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "700",
		marginLeft: 5,
		// Prevent text wrap/overflow
		includeFontPadding: false,
		textAlignVertical: "center",
	},
});
