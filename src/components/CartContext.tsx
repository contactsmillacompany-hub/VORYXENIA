"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
    id: string; // e.g. "ivory-column-coat-M"
    slug: string;
    name: string;
    price: string;
    size: string;
    image: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "id" | "quantity">) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    toggleDrawer: () => void;
    isDrawerOpen: boolean;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Hydrate from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("voryxenia-cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("voryxenia-cart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: Omit<CartItem, "id" | "quantity">) => {
        const id = `${newItem.slug}-${newItem.size}`;
        setItems((prev) => {
            const existing = prev.find((i) => i.id === id);
            if (existing) {
                return prev.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...newItem, id, quantity: 1 }];
        });
        setIsDrawerOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, clearCart, toggleDrawer, isDrawerOpen, cartCount }}
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
