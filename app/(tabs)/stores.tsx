import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const { width } = Dimensions.get("window");

const CATEGORIES = [
	{ id: "1", name: "All store", icon: "view-grid-outline" },
	{ id: "2", name: "Food", icon: "food-apple-outline" },
	{ id: "3", name: "Home & Garden", icon: "home-outline" },
	{ id: "4", name: "Electronics", icon: "laptop" },
	{ id: "5", name: "Fashion", icon: "tshirt-crew-outline" },
];

const POPULAR_STORES = [
	{
		id: "1",
		name: "Fresh Food",
		icon: "cart-outline",
		color: "#FF5A5F",
		categoryId: "2",
	},
	{
		id: "2",
		name: "Fashion Store",
		icon: "shopping-outline",
		color: "#D1FF8D",
		categoryId: "5",
	},
	{
		id: "3",
		name: "Tech World",
		icon: "truck-delivery-outline",
		color: "#FFECC7",
		categoryId: "4",
	},
	{
		id: "4",
		name: "Home Depot",
		icon: "storefront-outline",
		color: "#DBF4FF",
		categoryId: "3",
	},
	{
		id: "5",
		name: "Creative",
		icon: "palette-outline",
		color: "#E4FFDA",
		categoryId: "3",
	},
	{
		id: "6",
		name: "E-Bazar",
		icon: "shopping-search",
		color: "#FFD9D9",
		categoryId: "1",
	},
	{
		id: "7",
		name: "Shopping",
		icon: "basket-outline",
		color: "#F5F5F7",
		categoryId: "2",
	},
	{
		id: "8",
		name: "Shop cr",
		icon: "credit-card-outline",
		color: "#FFF5E1",
		categoryId: "4",
	},
];

const ALL_STORES = [
	{
		id: "1",
		name: "adidas",
		catalogues: 1,
		logo: "https://www.google.com/s2/favicons?domain=adidas.com&sz=128",
		categoryId: "5",
	},
	{
		id: "2",
		name: "amazon",
		catalogues: 3,
		logo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128",
		categoryId: "4",
	},
	{
		id: "3",
		name: "Auchan",
		catalogues: 4,
		logo: "https://www.google.com/s2/favicons?domain=auchan.fr&sz=128",
		categoryId: "2",
	},
	{
		id: "4",
		name: "Nike",
		catalogues: 2,
		logo: "https://www.google.com/s2/favicons?domain=nike.com&sz=128",
		categoryId: "5",
	},
	{
		id: "5",
		name: "IKEA",
		catalogues: 5,
		logo: "https://www.google.com/s2/favicons?domain=ikea.com&sz=128",
		categoryId: "3",
	},
	{
		id: "6",
		name: "Carrefour",
		catalogues: 2,
		logo: "https://www.google.com/s2/favicons?domain=carrefour.com&sz=128",
		categoryId: "2",
	},
	{
		id: "7",
		name: "Apple",
		catalogues: 1,
		logo: "https://www.google.com/s2/favicons?domain=apple.com&sz=128",
		categoryId: "4",
	},
	{
		id: "8",
		name: "Zara",
		catalogues: 3,
		logo: "https://www.google.com/s2/favicons?domain=zara.com&sz=128",
		categoryId: "5",
	},
];

export default function StoresScreen() {
	const [selectedCategory, setSelectedCategory] = useState("1");

	const filteredPopularStores =
		selectedCategory === "1"
			? POPULAR_STORES
			: POPULAR_STORES.filter((store) => store.categoryId === selectedCategory);

	const filteredAllStores =
		selectedCategory === "1"
			? ALL_STORES
			: ALL_STORES.filter((store) => store.categoryId === selectedCategory);

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity style={styles.menuIcon}>
					<MaterialCommunityIcons name="sort-variant" size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Stores</Text>
				<View style={{ width: 40 }} />
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Search */}
				<View style={styles.searchContainer}>
					<Ionicons
						name="search"
						size={20}
						color="#666"
						style={styles.searchIcon}
					/>
					<TextInput
						placeholder="Search for stores"
						style={styles.searchInput}
						placeholderTextColor="#666"
					/>
					<TouchableOpacity style={styles.filterButton}>
						<Ionicons name="options-outline" size={20} color="#000" />
					</TouchableOpacity>
				</View>

				{/* Categories */}
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.categoriesList}
				>
					{CATEGORIES.map((cat) => (
						<TouchableOpacity
							key={cat.id}
							style={[
								styles.categoryChip,
								selectedCategory === cat.id && styles.categoryChipActive,
							]}
							onPress={() => setSelectedCategory(cat.id)}
						>
							<MaterialCommunityIcons
								name={cat.icon as any}
								size={16}
								color="#000"
								style={{ marginRight: 6 }}
							/>
							<Text style={styles.categoryText}>{cat.name}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>

				{/* Popular Stores */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Popular stores</Text>
					{filteredPopularStores.length > 0 ? (
						<View style={styles.popularGrid}>
							{filteredPopularStores.map((item) => (
								<View key={item.id} style={styles.popularAppItem}>
									<View style={styles.popularAppIcon}>
										<Text
											style={{
												fontWeight: "bold",
												color: item.color,
												fontSize: 20,
											}}
										>
											{item.name.substring(0, 2)}
										</Text>
									</View>
									<Text style={styles.popularAppName}>{item.name}</Text>
								</View>
							))}
						</View>
					) : (
						<Text style={styles.emptyText}>
							No popular stores in this category
						</Text>
					)}
				</View>

				{/* All Stores */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>All stores</Text>
					{filteredAllStores.length > 0 ? (
						<View style={styles.allStoresList}>
							{filteredAllStores.map((store) => (
								<View key={store.id} style={styles.storeCard}>
									<View style={styles.storeLeft}>
										<View style={styles.storeLogoWrapper}>
											<Image
												source={{ uri: store.logo }}
												style={styles.storeLogo}
											/>
										</View>
										<View>
											<Text style={styles.storeName}>{store.name}</Text>
											<Text style={styles.storeCatalogues}>
												{store.catalogues} Catalogues
											</Text>
										</View>
									</View>
									<TouchableOpacity>
										<MaterialCommunityIcons
											name="cart-outline"
											size={24}
											color="#000"
										/>
									</TouchableOpacity>
								</View>
							))}
						</View>
					) : (
						<Text style={styles.emptyText}>
							No stores found in this category
						</Text>
					)}
					<View style={{ height: 100 }} />
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9F9F9",
		paddingTop: 60,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	menuIcon: {
		padding: 8,
		backgroundColor: "#eee",
		borderRadius: 8,
		marginRight: 15,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#EEEEEE",
		marginHorizontal: 20,
		borderRadius: 15,
		paddingLeft: 15,
		paddingRight: 5,
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
		height: "100%",
	},
	filterButton: {
		backgroundColor: "#fff",
		padding: 8,
		borderRadius: 10,
		marginVertical: 5,
		marginRight: 5,
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 1,
	},
	categoriesList: {
		paddingLeft: 20,
		paddingRight: 10,
		marginBottom: 25,
	},
	categoryChip: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: "#FFFFFF",
		marginRight: 10,
		borderWidth: 1,
		borderColor: "#eee",
	},
	categoryChipActive: {
		backgroundColor: "#D1FF8D",
		borderColor: "#D1FF8D",
	},
	categoryText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#000",
	},
	section: {
		marginBottom: 25,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 15,
	},
	popularGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		// justifyContent: "space-evenly",
	},
	popularAppItem: {
		width: "25%",
		alignItems: "center",
		marginBottom: 15,
	},
	popularAppIcon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 5,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
	},
	popularAppName: {
		fontSize: 11,
		color: "#333",
	},
	allStoresList: {
		// paddingHorizontal: 20,
	},
	storeCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#FFFFFF",
		padding: 15,
		borderRadius: 20,
		marginBottom: 15,
		elevation: 0,
	},
	storeLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	storeLogoWrapper: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#000",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 15,
		overflow: "hidden",
	},
	storeLogo: {
		width: 50,
		height: 50,
		resizeMode: "cover",
	},
	storeName: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
	},
	storeCatalogues: {
		fontSize: 13,
		color: "#666",
		marginTop: 2,
	},
	emptyText: {
		fontSize: 14,
		color: "#888",
		fontStyle: "italic",
		textAlign: "center",
		marginTop: 10,
	},
});
