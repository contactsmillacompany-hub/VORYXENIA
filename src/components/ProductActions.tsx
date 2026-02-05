"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";
import { useCart } from "./CartContext";

type Size = "S" | "M" | "L" | "XL";

export function ProductActions({
    price,
    slug,
    name,
    image,
}: {
    price: string;
    slug: string;
    name: string;
    image: string;
}) {
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const { addItem } = useCart();
    const [showToast, setShowToast] = useState(false);

    const handleAddToBag = () => {
        if (!selectedSize) return;

        addItem({
            slug,
            name,
            price,
            size: selectedSize,
            image,
        });

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Size Selector */}
            <div className="flex flex-col gap-3">
                <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                    Select Size
                </span>
                <div className="flex gap-6">
                    {(["S", "M", "L", "XL"] as Size[]).map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`relative py-1 text-[13px] tracking-[0.1em] transition-colors ${selectedSize === size ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                                }`}
                        >
                            {size}
                            {selectedSize === size && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 bottom-0 h-px bg-zinc-900"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-4">
                <Magnetic>
                    <button
                        onClick={handleAddToBag}
                        disabled={!selectedSize}
                        className={`w-full py-4 text-[12px] tracking-[0.2em] transition-all duration-300 ${selectedSize
                            ? "bg-zinc-900 text-white hover:bg-zinc-800"
                            : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                            }`}
                    >
                        {selectedSize ? `ADD TO BAG - ${price}` : "SELECT A SIZE"}
                    </button>
                </Magnetic>

                <p className="text-center text-[10px] tracking-[0.1em] text-zinc-400">
                    Complimentary shipping worldwide.
                </p>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-50 bg-zinc-900 text-white px-6 py-4 shadow-xl"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-[12px] tracking-[0.1em] uppercase">Added to Bag</span>
                            <span className="text-[11px] text-zinc-400">
                                {selectedSize} — Prepare for checkout
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
