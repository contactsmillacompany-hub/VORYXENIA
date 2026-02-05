"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import Image from "next/image";
import { useEffect } from "react";

export function CartDrawer() {
    const { isDrawerOpen, toggleDrawer, items, removeItem } = useCart();

    // Prevent background scroll when open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isDrawerOpen]);

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleDrawer}
                        className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[400px] bg-[#F6F5F2] shadow-2xl flex flex-col"
                    >
                        <div className="flex justify-between items-center p-8 border-b border-black/5">
                            <span className="font-serif text-[18px] text-zinc-900">Your Bag ({items.length})</span>
                            <button
                                onClick={toggleDrawer}
                                className="text-[11px] tracking-[0.2em] text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                                CLOSE
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-10">
                            {items.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-center">
                                    <p className="text-zinc-400 text-sm">Your bag is empty.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-6">
                                        <div className="relative w-20 aspect-[3/4] flex-shrink-0 bg-white">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1 justify-between py-1">
                                            <div>
                                                <h3 className="font-serif text-lg text-zinc-900 leading-none mb-2">
                                                    {item.name}
                                                </h3>
                                                <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                                                    {item.size} / {item.price}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="self-start text-[10px] text-zinc-400 hover:text-red-500 underline decoration-zinc-200 underline-offset-4 transition-colors"
                                            >
                                                REMOVE
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-8 border-t border-black/5 bg-white">
                            <div className="flex justify-between items-end mb-6">
                                <span className="text-[11px] tracking-[0.2em] text-zinc-500">SUBTOTAL</span>
                                <span className="font-serif text-xl text-zinc-900">
                                    {/* Simplified total calculation assuming standard string format or just display 'Calculated at checkout' for MVP if parsing is hard */}
                                    Calculated at checkout
                                </span>
                            </div>
                            <a
                                href="/checkout"
                                onClick={toggleDrawer}
                                className="block w-full bg-zinc-900 text-white py-4 text-[12px] tracking-[0.2em] hover:bg-zinc-800 transition-colors text-center"
                            >
                                CHECKOUT
                            </a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence >
    );
}
