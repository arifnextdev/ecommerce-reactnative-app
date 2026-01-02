import React, { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
	id: string;
	name: string;
	brand?: string;
	price: number;
	image: string;
	quantity: number;
	size?: string;
	color?: string;
}

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	updateQuantity: (id: string, delta: number) => void;
	clearCart: () => void;
	subtotal: number;
	totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const addToCart = (newItem: CartItem) => {
		setCartItems((prev) => {
			const existingItem = prev.find((item) => item.id === newItem.id);
			if (existingItem) {
				return prev.map((item) =>
					item.id === newItem.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prev, { ...newItem, quantity: 1 }];
		});
	};

	const removeFromCart = (id: string) => {
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const updateQuantity = (id: string, delta: number) => {
		setCartItems((prev) =>
			prev.map((item) => {
				if (item.id === id) {
					const newQty = Math.max(1, item.quantity + delta);
					return { ...item, quantity: newQty };
				}
				return item;
			})
		);
	};

	const clearCart = () => setCartItems([]);

	const subtotal = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				subtotal,
				totalItems,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
