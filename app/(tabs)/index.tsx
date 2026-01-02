import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";

import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	Modal,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
	primary: "#D1FF8D",
	primaryDark: "#B4E66C",
	secondary: "#000000",
	background: "#FFFFFF",
	surface: "#F5F5F7",
	text: "#000000",
	textSecondary: "#666666",
	textMuted: "#999999",
	accent: "#FF5A5F",
	white: "#FFFFFF",
	border: "#F5F5F7",
	rating: "#FFD700",
	flashSaleBg: "#FBFFF4",
};

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
		backgroundColor: COLORS.primary,
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

const FILTERS = ["All", "Running", "Sneakers", "Formal", "Casual", "Hiking"];

const FLASH_SALE = [
	{
		id: "1",
		name: "Nike Air Zoom",
		price: "$89",
		originalPrice: "$120",
		image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
		discount: "-25%",
	},
	{
		id: "2",
		name: "Puma RS-X",
		price: "$65",
		originalPrice: "$90",
		image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
		discount: "-30%",
	},
];

const PRODUCTS = [
	{
		id: "2",
		image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
		name: "Adidas Runner",
		price: "$120.00",
		originalPrice: "$160.00",
		rating: 4.8,
		reviews: 124,
	},
	{
		id: "3",
		image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
		name: "Classic Sneakers",
		price: "$85.00",
		originalPrice: "$100.00",
		rating: 4.5,
		reviews: 89,
	},
	{
		id: "4",
		image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400",
		name: "Urban Street",
		price: "$95.00",
		originalPrice: "$110.00",
		rating: 4.6,
		reviews: 56,
	},
	{
		id: "5",
		image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
		name: "Sport Pro",
		price: "$140.00",
		originalPrice: "$180.00",
		rating: 4.9,
		reviews: 210,
	},
];

export default function HomeScreen() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeFilter, setActiveFilter] = useState("All");
	const [location, setLocation] = useState("Paris, France");
	const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
	const [isDetecting, setIsDetecting] = useState(false);
	const [locationSearchQuery, setLocationSearchQuery] = useState("");
	const flatListRef = useRef<FlatList>(null);

	const POPULAR_CITIES = [
		"London, UK",
		"New York, USA",
		"Tokyo, Japan",
		"Paris, France",
		"Dubai, UAE",
		"Singapore",
		"Berlin, Germany",
	];

	const handleDetectLocation = () => {
		setIsDetecting(true);
		// Simulate GPS detection
		setTimeout(() => {
			setLocation("Dhaka, Bangladesh");
			setIsDetecting(false);
			setIsLocationModalVisible(false);
			setLocationSearchQuery("");
		}, 1500);
	};

	const filteredCities = POPULAR_CITIES.filter((city) =>
		city.toLowerCase().includes(locationSearchQuery.toLowerCase())
	);

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
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.scrollContent}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity style={styles.menuIcon}>
					<MaterialCommunityIcons name="menu-open" size={24} color="#000" />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.locationContainer}
					onPress={() => setIsLocationModalVisible(true)}
				>
					<Ionicons name="location" size={16} color={COLORS.primaryDark} />
					<Text style={styles.locationText}>{location}</Text>
					<Ionicons
						name="chevron-down"
						size={12}
						color={COLORS.textSecondary}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={styles.notificationBtn}>
					<Ionicons
						name="notifications-outline"
						size={24}
						color={COLORS.text}
					/>
					<View style={styles.badge} />
				</TouchableOpacity>
			</View>

			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<Ionicons
					name="search-outline"
					size={20}
					color="#666"
					style={styles.searchIcon}
				/>
				<TextInput
					placeholder="Search details..."
					style={styles.searchInput}
					placeholderTextColor="#666"
				/>
				<TouchableOpacity>
					<Ionicons
						name="filter-outline"
						size={20}
						color={COLORS.textSecondary}
					/>
				</TouchableOpacity>
			</View>

			{/* Filter Chips */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.filtersContainer}
			>
				{FILTERS.map((filter, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.filterChip,
							activeFilter === filter && styles.filterChipActive,
						]}
						onPress={() => setActiveFilter(filter)}
					>
						<Text
							style={[
								styles.filterText,
								activeFilter === filter && styles.filterTextActive,
							]}
						>
							{filter}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

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
									<Text style={styles.discoverButtonText}>Shop Now</Text>
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

			{/* Flash Sale Section */}
			<View style={styles.flashSaleContainer}>
				<View style={styles.flashSaleHeader}>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
						<Ionicons name="flash" size={20} color={COLORS.secondary} />
						<Text style={styles.flashSaleTitle}>Flash Sale</Text>
					</View>
					<View style={styles.countDownContainer}>
						<View style={styles.timerBox}>
							<Text style={styles.timerText}>02</Text>
						</View>
						<Text style={{ fontWeight: "bold", color: COLORS.secondary }}>
							:
						</Text>
						<View style={styles.timerBox}>
							<Text style={styles.timerText}>12</Text>
						</View>
						<Text style={{ fontWeight: "bold", color: COLORS.secondary }}>
							:
						</Text>
						<View style={styles.timerBox}>
							<Text style={styles.timerText}>45</Text>
						</View>
					</View>
				</View>

				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{FLASH_SALE.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={{
								marginRight: 15,
								width: 140,
								backgroundColor: COLORS.white,
								borderRadius: 15,
								padding: 10,
							}}
						>
							<View>
								<Image
									source={{ uri: item.image }}
									style={{
										width: "100%",
										height: 100,
										borderRadius: 10,
										marginBottom: 8,
										backgroundColor: COLORS.surface,
									}}
									resizeMode="contain"
								/>
								<View
									style={{
										position: "absolute",
										top: 5,
										left: 5,
										backgroundColor: COLORS.primary,
										paddingHorizontal: 6,
										paddingVertical: 2,
										borderRadius: 4,
									}}
								>
									<Text
										style={{
											color: COLORS.secondary,
											fontSize: 10,
											fontWeight: "bold",
										}}
									>
										{item.discount}
									</Text>
								</View>
							</View>
							<Text
								numberOfLines={1}
								style={{
									fontWeight: "600",
									marginBottom: 4,
									color: COLORS.text,
								}}
							>
								{item.name}
							</Text>
							<View
								style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
							>
								<Text style={{ fontWeight: "bold", color: COLORS.text }}>
									{item.price}
								</Text>
								<Text
									style={{
										fontSize: 10,
										color: COLORS.textMuted,
										textDecorationLine: "line-through",
									}}
								>
									{item.originalPrice}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
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

			{/* Recommended Products */}
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Recommended for you</Text>
				<TouchableOpacity>
					<Text style={styles.seeAllText}>Show all</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.catalogsGrid}>
				{PRODUCTS.map((item: any) => (
					<TouchableOpacity key={item.id} style={styles.productCard}>
						<TouchableOpacity style={styles.favoriteBtn}>
							<Ionicons name="heart-outline" size={18} color={COLORS.text} />
						</TouchableOpacity>
						<Image source={{ uri: item.image }} style={styles.productImage} />

						<View style={styles.productInfo}>
							<Text style={styles.productName}>{item.name}</Text>
							<View style={styles.ratingContainer}>
								<Ionicons name="star" size={12} color={COLORS.rating} />
								<Text style={styles.ratingText}>{item.rating}</Text>
								<Text style={styles.reviewCount}>({item.reviews})</Text>
							</View>
							<View style={styles.priceContainer}>
								<Text style={styles.price}>{item.price}</Text>
								<Text style={styles.originalPrice}>{item.originalPrice}</Text>
							</View>

							<TouchableOpacity style={styles.addButton}>
								<Text style={styles.addButtonText}>Add to Cart</Text>
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				))}
			</View>

			{/* Location Selection Modal */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={isLocationModalVisible}
				onRequestClose={() => setIsLocationModalVisible(false)}
			>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setIsLocationModalVisible(false)}
				>
					<View style={styles.modalContent}>
						<View style={styles.modalHandle} />
						<Text style={styles.modalTitle}>Select Location</Text>

						{/* Modal Search Bar */}
						<View style={styles.modalSearchContainer}>
							<Ionicons
								name="search-outline"
								size={20}
								color={COLORS.textSecondary}
							/>
							<TextInput
								style={styles.modalSearchInput}
								placeholder="Search city or country..."
								placeholderTextColor={COLORS.textMuted}
								value={locationSearchQuery}
								onChangeText={setLocationSearchQuery}
							/>
							{locationSearchQuery.length > 0 && (
								<TouchableOpacity onPress={() => setLocationSearchQuery("")}>
									<Ionicons
										name="close-circle"
										size={18}
										color={COLORS.textMuted}
									/>
								</TouchableOpacity>
							)}
						</View>

						<TouchableOpacity
							style={styles.detectLocationBtn}
							onPress={handleDetectLocation}
							disabled={isDetecting}
						>
							{isDetecting ? (
								<ActivityIndicator color={COLORS.secondary} />
							) : (
								<>
									<Ionicons
										name="navigate"
										size={20}
										color={COLORS.secondary}
									/>
									<Text style={styles.detectLocationText}>
										Use Current Location
									</Text>
								</>
							)}
						</TouchableOpacity>

						<View style={styles.separator}>
							<View style={styles.line} />
							<Text style={styles.separatorText}>Or select city</Text>
							<View style={styles.line} />
						</View>

						<ScrollView
							style={styles.citiesList}
							showsVerticalScrollIndicator={false}
						>
							{filteredCities.map((city) => (
								<TouchableOpacity
									key={city}
									style={styles.cityItem}
									onPress={() => {
										setLocation(city);
										setIsLocationModalVisible(false);
										setLocationSearchQuery("");
									}}
								>
									<Ionicons
										name="location-outline"
										size={20}
										color={COLORS.textSecondary}
									/>
									<Text
										style={[
											styles.cityText,
											location === city && styles.cityTextActive,
										]}
									>
										{city}
									</Text>
									{location === city && (
										<Ionicons
											name="checkmark-circle"
											size={20}
											color={COLORS.primaryDark}
										/>
									)}
								</TouchableOpacity>
							))}
							{filteredCities.length === 0 && (
								<View style={styles.noResultsContainer}>
									<Text style={styles.noResultsText}>No cities found</Text>
								</View>
							)}
						</ScrollView>
					</View>
				</Pressable>
			</Modal>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingTop: 60,
	},
	scrollContent: {
		paddingBottom: 160, // Enough space to clear the floating tab bar (bottom: 30 + height: 75 + margin)
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
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.surface,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
	},
	locationText: {
		fontSize: 14,
		fontWeight: "600",
		marginLeft: 4,
		marginRight: 4,
		color: COLORS.text,
	},
	notificationBtn: {
		width: 40,
		height: 40,
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	badge: {
		position: "absolute",
		top: 8,
		right: 8,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: COLORS.primaryDark,
		borderWidth: 1.5,
		borderColor: COLORS.surface,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.surface,
		marginHorizontal: 20,
		borderRadius: 15,
		paddingHorizontal: 15,
		height: 50,
		marginBottom: 15,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: COLORS.text,
	},
	filtersContainer: {
		paddingLeft: 20,
		marginBottom: 25,
	},
	filterChip: {
		paddingHorizontal: 20,
		paddingVertical: 8,
		backgroundColor: COLORS.surface,
		borderRadius: 20,
		marginRight: 10,
	},
	filterChipActive: {
		backgroundColor: COLORS.primary,
	},
	filterText: {
		fontSize: 14,
		fontWeight: "600",
		color: COLORS.textSecondary,
	},
	filterTextActive: {
		color: COLORS.secondary,
	},
	promoContainer: {
		marginBottom: 30,
		position: "relative",
	},
	promoBanner: {
		backgroundColor: COLORS.primary,
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
		color: COLORS.text,
		marginBottom: 5,
	},
	promoSubtitle: {
		fontSize: 12,
		color: COLORS.textSecondary,
		marginBottom: 10,
	},
	promoDiscount: {
		fontSize: 36,
		fontWeight: "900",
		color: COLORS.secondary,
		marginBottom: 10,
	},
	discoverButton: {
		backgroundColor: COLORS.white,
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	discoverButtonText: {
		fontSize: 12,
		fontWeight: "600",
		color: COLORS.text,
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
		backgroundColor: COLORS.secondary,
		marginHorizontal: 2,
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: COLORS.textMuted,
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
		color: COLORS.text,
	},
	countDownContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	timerBox: {
		backgroundColor: COLORS.secondary,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
	},
	timerText: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 12,
	},
	seeAllText: {
		fontSize: 12,
		color: COLORS.textSecondary,
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
		backgroundColor: COLORS.surface,
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
		color: COLORS.textSecondary,
	},
	flashSaleContainer: {
		marginHorizontal: 20,
		marginBottom: 30,
		backgroundColor: COLORS.flashSaleBg,
		borderRadius: 20,
		padding: 15,
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
	flashSaleHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	flashSaleTitle: {
		fontWeight: "bold",
		fontSize: 16,
		color: COLORS.text,
	},
	catalogsGrid: {
		flexDirection: "row",
		paddingHorizontal: 20,
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	productCard: {
		width: (width - 50) / 2,
		backgroundColor: COLORS.white,
		borderRadius: 20,
		marginBottom: 20,
		padding: 10,
		shadowColor: COLORS.secondary,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 10,
		elevation: 2,
		borderWidth: 1,
		borderColor: COLORS.surface,
	},
	favoriteBtn: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 10,
		backgroundColor: "rgba(255,255,255,0.8)",
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	productImage: {
		width: "100%",
		height: 140,
		borderRadius: 15,
		marginBottom: 10,
		backgroundColor: COLORS.surface,
	},
	productInfo: {
		gap: 4,
	},
	productName: {
		fontSize: 14,
		fontWeight: "600",
		color: COLORS.text,
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	ratingText: {
		fontSize: 12,
		fontWeight: "600",
		color: COLORS.text,
	},
	reviewCount: {
		fontSize: 12,
		color: COLORS.textSecondary,
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginTop: 4,
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.text,
	},
	originalPrice: {
		fontSize: 12,
		color: COLORS.textMuted,
		textDecorationLine: "line-through",
	},
	addButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 12,
		paddingVertical: 8,
		alignItems: "center",
		marginTop: 10,
	},
	addButtonText: {
		color: COLORS.secondary,
		fontSize: 12,
		fontWeight: "600",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: COLORS.background,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
		maxHeight: "90%",
	},
	modalHandle: {
		width: 40,
		height: 5,
		backgroundColor: COLORS.surface,
		borderRadius: 3,
		alignSelf: "center",
		marginBottom: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: COLORS.text,
		marginBottom: 20,
		textAlign: "center",
	},
	modalSearchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.surface,
		borderRadius: 15,
		paddingHorizontal: 15,
		height: 50,
		marginBottom: 20,
		gap: 10,
	},
	modalSearchInput: {
		flex: 1,
		fontSize: 16,
		color: COLORS.text,
	},
	detectLocationBtn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.primary,
		padding: 15,
		borderRadius: 15,
		gap: 10,
		marginBottom: 25,
	},
	detectLocationText: {
		fontSize: 16,
		fontWeight: "600",
		color: COLORS.secondary,
	},
	separator: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		gap: 15,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: COLORS.surface,
	},
	separatorText: {
		color: COLORS.textMuted,
		fontSize: 12,
		fontWeight: "600",
		textTransform: "uppercase",
	},
	citiesList: {
		marginBottom: 20,
	},
	cityItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.surface,
		gap: 12,
	},
	cityText: {
		flex: 1,
		fontSize: 16,
		color: COLORS.text,
	},
	cityTextActive: {
		fontWeight: "bold",
		color: COLORS.primaryDark,
	},
	noResultsContainer: {
		paddingVertical: 30,
		alignItems: "center",
	},
	noResultsText: {
		color: COLORS.textMuted,
		fontSize: 14,
	},
});
