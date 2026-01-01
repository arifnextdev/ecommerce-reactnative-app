import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";

import {
	Dimensions,
	FlatList,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const { width } = Dimensions.get("window");

const STORES = [
	{
		id: "1",
		name: "Adidas",
		logo: "https://www.google.com/s2/favicons?domain=adidas.com&sz=128",
	},
	{
		id: "2",
		name: "Puma",
		logo: "https://www.google.com/s2/favicons?domain=puma.com&sz=128",
	},
	{
		id: "3",
		name: "Nike",
		logo: "https://www.google.com/s2/favicons?domain=nike.com&sz=128",
	},
	{
		id: "4",
		name: "NB",
		logo: "https://www.google.com/s2/favicons?domain=newbalance.com&sz=128",
	},
	{
		id: "5",
		name: "Fila",
		logo: "https://www.google.com/s2/favicons?domain=fila.com&sz=128",
	},
	{
		id: "6",
		name: "Reebok",
		logo: "https://www.google.com/s2/favicons?domain=reebok.com&sz=128",
	},
	{
		id: "7",
		name: "Vans",
		logo: "https://www.google.com/s2/favicons?domain=vans.com&sz=128",
	},
	{
		id: "8",
		name: "Converse",
		logo: "https://www.google.com/s2/favicons?domain=converse.com&sz=128",
	},
	{
		id: "9",
		name: "UA",
		logo: "https://www.google.com/s2/favicons?domain=underarmour.com&sz=128",
	},
	{
		id: "10",
		name: "Asics",
		logo: "https://www.google.com/s2/favicons?domain=asics.com&sz=128",
	},
];

const PROMOS = [
	{
		id: "1",
		title: "Good regulation",
		subtitle: "For Jan 2025",
		discount: "50",
		image: require("../../assets/images/promo_sneaker.png"),
		backgroundColor: "#D1FF8D",
	},
	{
		id: "2",
		title: "Orange Rush",
		subtitle: "Speed Collection",
		discount: "40",
		image: {
			uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
		},
		backgroundColor: "#FFECC7",
	},
	{
		id: "3",
		title: "Neon Pulse",
		subtitle: "Electric Design",
		discount: "35",
		image: {
			uri: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
		},
		backgroundColor: "#DBF4FF",
	},
	{
		id: "4",
		title: "Cloud Walker",
		subtitle: "Pure Comfort",
		discount: "30",
		image: {
			uri: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
		},
		backgroundColor: "#FFD9D9",
	},
	{
		id: "5",
		title: "Retro Vibe",
		subtitle: "Classic Style",
		discount: "20",
		image: {
			uri: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
		},
		backgroundColor: "#E4FFDA",
	},
];

const CATALOGS = [
	{
		id: "2",
		image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
		name: "Adidas Runner",
	},
	{
		id: "3",
		image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
		name: "Classic Sneakers",
	},
	{
		id: "4",
		image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400",
		name: "Urban Street",
	},
	{
		id: "5",
		image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
		name: "Sport Pro",
	},
];

export default function HomeScreen() {
	const [activeIndex, setActiveIndex] = useState(0);
	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			const nextIndex = (activeIndex + 1) % PROMOS.length;
			flatListRef.current?.scrollToIndex({
				index: nextIndex,
				animated: true,
			});
			setActiveIndex(nextIndex);
		}, 3000);

		return () => clearInterval(interval);
	}, [activeIndex]);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity style={styles.menuIcon}>
					<MaterialCommunityIcons name="menu" size={24} color="#000" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.locationContainer}>
					<Ionicons name="location-outline" size={16} color="#000" />
					<Text style={styles.locationText}>Paris</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.filterIcon}>
					<Ionicons name="options-outline" size={24} color="#000" />
				</TouchableOpacity>
			</View>

			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<Ionicons
					name="search"
					size={20}
					color="#666"
					style={styles.searchIcon}
				/>
				<TextInput
					placeholder="Search..."
					style={styles.searchInput}
					placeholderTextColor="#666"
				/>
			</View>

			{/* Promo Banner */}
			<View style={styles.promoContainer}>
				<FlatList
					ref={flatListRef}
					data={PROMOS}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
						const offset = e.nativeEvent.contentOffset.x;
						const index = Math.round(offset / (width - 40));
						setActiveIndex(index);
					}}
					renderItem={({ item }) => (
						<View
							style={[
								styles.promoBanner,
								{ backgroundColor: item.backgroundColor },
							]}
						>
							<View style={styles.promoContent}>
								<Text style={styles.promoTitle}>{item.title}</Text>
								<Text style={styles.promoSubtitle}>{item.subtitle}</Text>
								<Text style={styles.promoDiscount}>
									{item.discount}
									<Text style={{ fontSize: 16 }}>% OFF</Text>
								</Text>
								<TouchableOpacity style={styles.discoverButton}>
									<Text style={styles.discoverButtonText}>I discover</Text>
								</TouchableOpacity>
							</View>
							<Image
								source={item.image}
								style={styles.promoImage}
								resizeMode="contain"
							/>
						</View>
					)}
					keyExtractor={(item) => item.id}
				/>

				{/* Pagination Dots */}
				<View style={styles.pagination}>
					{PROMOS.map((_, index) => (
						<View
							key={index}
							style={[styles.dot, activeIndex === index && styles.dotActive]}
						/>
					))}
				</View>
			</View>

			{/* Favorite Stores */}
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Your favorite stores</Text>
				<TouchableOpacity>
					<Text style={styles.seeAllText}>See all</Text>
				</TouchableOpacity>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.storesList}
			>
				{STORES.map((store) => (
					<View key={store.id} style={styles.storeContainer}>
						<View style={styles.storeIconWrapper}>
							<Image source={{ uri: store.logo }} style={styles.storeIcon} />
						</View>
						<Text style={styles.storeName}>{store.name}</Text>
					</View>
				))}
			</ScrollView>

			{/* New Catalogs */}
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>New catalogs for you</Text>
				<TouchableOpacity>
					<Text style={styles.seeAllText}>See all</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.catalogsGrid}>
				{CATALOGS.map((item: any) => (
					<View key={item.id} style={styles.catalogCard}>
						<Image source={{ uri: item.image }} style={styles.catalogImage} />
					</View>
				))}
			</View>

			<View style={{ height: 100 }} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		paddingTop: 60,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	menuIcon: {
		width: 40,
		height: 40,
		backgroundColor: "#F5F5F7",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	locationText: {
		fontSize: 14,
		fontWeight: "600",
		marginLeft: 4,
	},
	filterIcon: {
		width: 40,
		height: 40,
		backgroundColor: "#F5F5F7",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F5F5F7",
		marginHorizontal: 20,
		borderRadius: 15,
		paddingHorizontal: 15,
		height: 50,
		marginBottom: 20,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: "#000",
	},
	promoContainer: {
		marginBottom: 30,
		position: "relative",
	},
	promoBanner: {
		backgroundColor: "#D1FF8D",
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 25,
		height: 200,
		flexDirection: "row",
		padding: 25,
		justifyContent: "space-between",
		alignItems: "center",
		overflow: "hidden",
		width: width - 40,
	},
	promoContent: {
		flex: 1.2,
		justifyContent: "center",
	},
	promoTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 5,
	},
	promoSubtitle: {
		fontSize: 12,
		color: "#333",
		marginBottom: 10,
	},
	promoDiscount: {
		fontSize: 36,
		fontWeight: "900",
		color: "#FF5A5F",
		marginBottom: 10,
	},
	discoverButton: {
		backgroundColor: "#FFFFFF",
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	discoverButtonText: {
		fontSize: 12,
		fontWeight: "600",
		color: "#000",
	},
	promoImage: {
		width: 180,
		height: 180,
	},
	pagination: {
		position: "absolute",
		bottom: 10,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	dotActive: {
		width: 20,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#000",
		marginHorizontal: 2,
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#AAAAAA",
		marginHorizontal: 2,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
	},
	seeAllText: {
		fontSize: 12,
		color: "#666",
	},
	storesList: {
		paddingLeft: 20,
		paddingRight: 10,
		marginBottom: 30,
	},
	storeContainer: {
		alignItems: "center",
		marginRight: 20,
	},
	storeIconWrapper: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#F5F5F7",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	storeIcon: {
		width: 30,
		height: 30,
		resizeMode: "contain",
	},
	storeName: {
		fontSize: 12,
		color: "#666",
	},
	catalogsGrid: {
		flexDirection: "row",
		paddingHorizontal: 20,
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	catalogCard: {
		width: (width - 60) / 2,
		height: 200,
		backgroundColor: "#F5F5F7",
		borderRadius: 25,
		overflow: "hidden",
		marginBottom: 20,
		borderWidth: 2,
		borderColor: "#88e04dff",
	},
	catalogImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
});
