"use client";

import { useCart } from "@/components/CartContext";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { ButtonLink } from "@/components/ButtonLink";
import Image from "next/image";
import { placeOrder } from "./actions";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, cartCount, clearCart } = useCart();
    const [state, action, isPending] = useActionState(placeOrder, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            clearCart();
            router.push("/checkout/success");
        }
    }, [state, clearCart, router]);

    if (items.length === 0 && !state?.success) {
        return (
            <main className="min-h-screen bg-[#F6F5F2] pt-32 pb-24">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
                        <h1 className="font-serif text-[32px] text-zinc-900">Your bag is empty.</h1>
                        <ButtonLink href="/collection">View Collection</ButtonLink>
                    </div>
                </Container>
            </main>
        );
    }

    const subtotal = items.reduce(
        (acc, item) => acc + parseInt(item.price.replace(/[^\d]/g, "")),
        0
    );

    return (
        <main className="min-h-screen bg-[#F6F5F2] pt-32 pb-24">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase mb-8">
                            Order Summary
                        </h2>
                        <div className="flex flex-col gap-8 mb-8 border-b border-black/5 pb-8">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-6">
                                    <div className="relative w-24 aspect-[3/4] bg-white">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between py-1">
                                        <div>
                                            <h3 className="font-serif text-lg text-zinc-900 leading-none mb-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                                                {item.size} — {item.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-[11px] tracking-[0.2em] text-zinc-500">TOTAL (Inc. Taxes)</span>
                            <span className="font-serif text-2xl text-zinc-900">
                                ₹ {subtotal.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div>
                        <h2 className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase mb-8">
                            Shipping Details
                        </h2>
                        <form action={action} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-[11px] uppercase tracking-wider text-zinc-500">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="bg-transparent border-b border-zinc-300 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-[11px] uppercase tracking-wider text-zinc-500">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="bg-transparent border-b border-zinc-300 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="address" className="text-[11px] uppercase tracking-wider text-zinc-500">
                                    Shipping Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    required
                                    className="bg-transparent border-b border-zinc-300 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="city" className="text-[11px] uppercase tracking-wider text-zinc-500">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        required
                                        className="bg-transparent border-b border-zinc-300 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="zip" className="text-[11px] uppercase tracking-wider text-zinc-500">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="zip"
                                        id="zip"
                                        required
                                        className="bg-transparent border-b border-zinc-300 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Pass cart items as hidden field to satisfy action signature (simulated) */}
                            <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-zinc-900 text-white py-4 text-[12px] tracking-[0.2em] hover:bg-zinc-800 transition-colors disabled:opacity-50"
                                >
                                    {isPending ? "PROCESSING..." : "PLACE ORDER"}
                                </button>
                            </div>

                            {state?.errors && (
                                <div className="p-4 bg-red-50 text-red-600 text-[13px]">
                                    <p>Please fix the errors:</p>
                                    <ul className="list-disc list-inside mt-2">
                                        {Object.entries(state.errors).map(([key, msgs]) => (
                                            <li key={key}>{msgs[0]}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </Container>
        </main>
    );
}
