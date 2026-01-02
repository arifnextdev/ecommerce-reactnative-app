import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Alert,
	Dimensions,
	FlatList,
	Image,
	LayoutAnimation,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	UIManager,
	View,
} from "react-native";
import { CartItem, useCart } from "../../context/CartContext";

// Enable LayoutAnimation for Android
if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

const COLORS = {
	primary: "#D1FF8D",
	primaryDark: "#B4E66C",
	secondary: "#000000",
	background: "#FFFFFF",
	surface: "#F5F5F7", // Light grey/blue surface
	text: "#000000",
	textSecondary: "#666666",
	textMuted: "#999999",
	accent: "#FF5A5F",
	white: "#FFFFFF",
	border: "#EEEEEE",
	glass: "rgba(255, 255, 255, 0.7)",
};

export default function CartScreen() {
	const {
		cartItems: items,
		removeFromCart,
		updateQuantity,
		clearCart,
		subtotal,
	} = useCart();
	const [promoCode, setPromoCode] = useState("");
	const [isPromoApplied, setIsPromoApplied] = useState(false);

	const handleUpdateQuantity = (id: string, delta: number) => {
		// Custom haptic-like animation for quantity updates
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		updateQuantity(id, delta);
	};

	const handleRemoveItem = (id: string) => {
		Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Remove",
				style: "destructive",
				onPress: () => {
					LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
					removeFromCart(id);
				},
			},
		]);
	};

	const handleClearCart = () => {
		if (items.length === 0) return;
		Alert.alert("Clear Cart", "Remove all items from your cart?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Clear All",
				style: "destructive",
				onPress: () => {
					LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
					clearCart();
				},
			},
		]);
	};

	const applyPromo = () => {
		if (promoCode.trim().length > 0) {
			setIsPromoApplied(true);
			Alert.alert("Success!", "Promo code applied successfully.");
		}
	};

	const subtotalVal = subtotal;
	const merchantDiscount = isPromoApplied ? subtotalVal * 0.1 : 0; // 10% discount for demo
	const shipping = items.length > 0 ? 15.0 : 0;
	const total = subtotalVal - merchantDiscount + shipping;

	const renderCartItem = ({ item }: { item: CartItem }) => (
		<View style={styles.cartCard}>
			<View style={styles.cardIndicator} />
			<Image source={{ uri: item.image }} style={styles.itemImage} />
			<View style={styles.itemInfo}>
				<View style={styles.itemHeader}>
					<View style={{ flex: 1 }}>
						<Text style={styles.itemName} numberOfLines={1}>
							{item.name}
						</Text>
						<Text style={styles.itemBrand}>{item.brand}</Text>
					</View>
					<TouchableOpacity
						style={styles.deleteBtn}
						onPress={() => handleRemoveItem(item.id)}
					>
						<Ionicons name="close-circle" size={24} color={COLORS.textMuted} />
					</TouchableOpacity>
				</View>

				<View style={styles.itemDetails}>
					{item.size && (
						<View style={styles.tag}>
							<Text style={styles.tagText}>US {item.size}</Text>
						</View>
					)}
					{item.color && (
						<View style={styles.tag}>
							<View
								style={[
									styles.colorDot,
									{
										backgroundColor: item.color.includes("Orange")
											? "#FF8C00"
											: item.color.includes("White")
											? "#EEE"
											: "#333",
									},
								]}
							/>
							<Text style={styles.tagText}>{item.color}</Text>
						</View>
					)}
				</View>

				<View style={styles.itemFooter}>
					<Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
					<View style={styles.quantityController}>
						<TouchableOpacity
							style={styles.controlBtn}
							onPress={() => handleUpdateQuantity(item.id, -1)}
						>
							<Ionicons name="remove" size={16} color={COLORS.secondary} />
						</TouchableOpacity>
						<Text style={styles.quantityValue}>{item.quantity}</Text>
						<TouchableOpacity
							style={styles.controlBtn}
							onPress={() => handleUpdateQuantity(item.id, 1)}
						>
							<Ionicons name="add" size={16} color={COLORS.secondary} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			{/* Custom Premium Header */}
			<View style={styles.header}>
				<View>
					<Text style={styles.headerSubtitle}>Shopping Bag</Text>
					<Text style={styles.headerTitle}>Review Order</Text>
				</View>
				{items.length > 0 && (
					<TouchableOpacity style={styles.clearBtn} onPress={handleClearCart}>
						<MaterialCommunityIcons
							name="delete-sweep-outline"
							size={24}
							color={COLORS.accent}
						/>
					</TouchableOpacity>
				)}
			</View>

			{items.length === 0 ? (
				<View style={styles.emptyView}>
					<View style={styles.emptyIconContainer}>
						<Ionicons
							name="bag-handle-outline"
							size={80}
							color={COLORS.border}
						/>
						<View style={styles.emptyIconBadge}>
							<Ionicons name="close" size={20} color={COLORS.white} />
						</View>
					</View>
					<Text style={styles.emptyTitle}>Nothing here yet!</Text>
					<Text style={styles.emptyText}>
						Your shopping bag is empty. Start adding some cool kicks!
					</Text>
					<TouchableOpacity style={styles.emptyShopBtn}>
						<Text style={styles.emptyShopText}>Explore Kicks</Text>
					</TouchableOpacity>
				</View>
			) : (
				<>
					<FlatList
						data={items}
						renderItem={renderCartItem}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.listContainer}
						showsVerticalScrollIndicator={false}
						ListFooterComponent={
							<View style={{ paddingBottom: 40 }}>
								<View style={styles.promoSection}>
									<Text style={styles.sectionHeading}>
										Do you have a promo code?
									</Text>
									<View style={styles.promoInputGroup}>
										<Ionicons
											name="ticket-outline"
											size={20}
											color={COLORS.textMuted}
										/>
										<TextInput
											style={styles.promoInput}
											placeholder="Enter code here..."
											value={promoCode}
											onChangeText={setPromoCode}
											placeholderTextColor={COLORS.textMuted}
										/>
										<TouchableOpacity
											style={[
												styles.promoApplyBtn,
												{ opacity: promoCode.length > 0 ? 1 : 0.5 },
											]}
											onPress={applyPromo}
											disabled={promoCode.length === 0}
										>
											<Text style={styles.promoApplyText}>Apply</Text>
										</TouchableOpacity>
									</View>
								</View>

								{/* Order Summary */}
								<View style={styles.summaryPanel}>
									<View style={styles.summaryRow}>
										<Text style={styles.summaryLabel}>Subtotal</Text>
										<Text style={styles.summaryAmount}>
											${subtotal.toFixed(2)}
										</Text>
									</View>
									<View style={styles.summaryRow}>
										<Text style={styles.summaryLabel}>Shipping</Text>
										<Text style={styles.summaryAmount}>
											+${shipping.toFixed(2)}
										</Text>
									</View>
									{isPromoApplied && (
										<View style={styles.summaryRow}>
											<Text
												style={[styles.summaryLabel, { color: COLORS.accent }]}
											>
												Promo Discount (10%)
											</Text>
											<Text
												style={[styles.summaryAmount, { color: COLORS.accent }]}
											>
												-${merchantDiscount.toFixed(2)}
											</Text>
										</View>
									)}

									<View style={styles.totalContainer}>
										<View>
											<Text style={styles.totalHeading}>Total Amount</Text>
											<Text style={styles.totalItems}>
												{items.length} Premium Items
											</Text>
										</View>
										<Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
									</View>

									<TouchableOpacity
										style={styles.buyNowBtn}
										activeOpacity={0.8}
										onPress={() =>
											Alert.alert(
												"Hold on!",
												"Checkout process is being integrated."
											)
										}
									>
										<Text style={styles.buyNowText}>Complete Purchase</Text>
										<View style={styles.buyNowIcon}>
											<Ionicons
												name="chevron-forward"
												size={20}
												color={COLORS.secondary}
											/>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						}
					/>
				</>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		paddingHorizontal: 25,
		paddingVertical: 20,
	},
	headerSubtitle: {
		fontSize: 14,
		color: COLORS.textSecondary,
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 1.5,
	},
	headerTitle: {
		fontSize: 32,
		fontWeight: "900",
		color: COLORS.text,
		marginTop: 4,
	},
	clearBtn: {
		padding: 10,
		backgroundColor: "rgba(255, 90, 95, 0.1)",
		borderRadius: 15,
	},
	listContainer: {
		paddingHorizontal: 25,
		paddingBottom: 180, // Significant padding to clear the floating tab bar
	},
	cartCard: {
		backgroundColor: COLORS.white,
		borderRadius: 24,
		padding: 12,
		marginBottom: 20,
		flexDirection: "row",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.05,
		shadowRadius: 20,
		elevation: 5,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.03)",
		overflow: "hidden",
	},
	cardIndicator: {
		position: "absolute",
		left: 0,
		top: 15,
		bottom: 15,
		width: 4,
		backgroundColor: COLORS.primary,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
	},
	itemImage: {
		width: 100,
		height: 110,
		borderRadius: 18,
		backgroundColor: COLORS.surface,
	},
	itemInfo: {
		flex: 1,
		marginLeft: 15,
		justifyContent: "space-between",
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	itemName: {
		fontSize: 18,
		fontWeight: "bold",
		color: COLORS.text,
	},
	itemBrand: {
		fontSize: 12,
		color: COLORS.textMuted,
		fontWeight: "600",
	},
	deleteBtn: {
		padding: 2,
	},
	itemDetails: {
		flexDirection: "row",
		gap: 8,
		marginVertical: 10,
	},
	tag: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.surface,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
		gap: 5,
	},
	colorDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	tagText: {
		fontSize: 10,
		fontWeight: "700",
		color: COLORS.textSecondary,
	},
	itemFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	itemPrice: {
		fontSize: 20,
		fontWeight: "900",
		color: COLORS.text,
	},
	quantityController: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.surface,
		borderRadius: 14,
		padding: 4,
	},
	controlBtn: {
		width: 32,
		height: 32,
		backgroundColor: COLORS.white,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 2,
	},
	quantityValue: {
		fontSize: 16,
		fontWeight: "bold",
		marginHorizontal: 12,
		color: COLORS.text,
	},
	promoSection: {
		marginTop: 10,
		marginBottom: 30,
	},
	sectionHeading: {
		fontSize: 16,
		fontWeight: "700",
		color: COLORS.text,
		marginBottom: 12,
	},
	promoInputGroup: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.white,
		borderRadius: 18,
		paddingHorizontal: 15,
		height: 56,
		borderWidth: 1,
		borderColor: COLORS.border,
		gap: 10,
	},
	promoInput: {
		flex: 1,
		fontSize: 14,
		fontWeight: "600",
		color: COLORS.text,
	},
	promoApplyBtn: {
		backgroundColor: COLORS.secondary,
		paddingHorizontal: 18,
		paddingVertical: 10,
		borderRadius: 12,
	},
	promoApplyText: {
		color: COLORS.white,
		fontSize: 12,
		fontWeight: "bold",
	},
	summaryPanel: {
		marginTop: 20,
		backgroundColor: "rgba(255, 255, 255, 0.95)",
		padding: 25,
		borderRadius: 35,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.1,
		shadowRadius: 30,
		elevation: 10,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.5)",
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	summaryLabel: {
		fontSize: 14,
		color: COLORS.textSecondary,
		fontWeight: "500",
	},
	summaryAmount: {
		fontSize: 14,
		fontWeight: "700",
		color: COLORS.text,
	},
	totalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		marginTop: 15,
		paddingTop: 15,
		borderTopWidth: 1,
		borderTopColor: COLORS.border,
		marginBottom: 20,
	},
	totalHeading: {
		fontSize: 14,
		color: COLORS.textSecondary,
		fontWeight: "600",
	},
	totalItems: {
		fontSize: 10,
		color: COLORS.textMuted,
		marginTop: 2,
		fontWeight: "600",
	},
	totalPrice: {
		fontSize: 28,
		fontWeight: "900",
		color: COLORS.secondary,
	},
	buyNowBtn: {
		backgroundColor: COLORS.primary,
		height: 70,
		borderRadius: 25,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 8,
	},
	buyNowText: {
		fontSize: 18,
		fontWeight: "bold",
		color: COLORS.secondary,
	},
	buyNowIcon: {
		marginLeft: 10,
		width: 30,
		height: 30,
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 40,
		paddingBottom: 100,
	},
	emptyIconContainer: {
		position: "relative",
		marginBottom: 30,
	},
	emptyIconBadge: {
		position: "absolute",
		top: -5,
		right: -5,
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: COLORS.accent,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 3,
		borderColor: COLORS.background,
	},
	emptyTitle: {
		fontSize: 26,
		fontWeight: "bold",
		color: COLORS.text,
		marginBottom: 10,
	},
	emptyText: {
		fontSize: 15,
		color: COLORS.textSecondary,
		textAlign: "center",
		lineHeight: 24,
		marginBottom: 35,
	},
	emptyShopBtn: {
		backgroundColor: COLORS.secondary,
		paddingHorizontal: 40,
		paddingVertical: 18,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		elevation: 5,
	},
	emptyShopText: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 16,
	},
});
