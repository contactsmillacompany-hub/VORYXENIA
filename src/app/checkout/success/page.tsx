"use client";

import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { ButtonLink } from "@/components/ButtonLink";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function CheckoutSuccessPage() {
    useEffect(() => {
        // Luxury confetti - subtle colors
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#F6F5F2", "#18181b", "#d4d4d8"]
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#F6F5F2", "#18181b", "#d4d4d8"]
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }, []);

    return (
        <main className="min-h-screen bg-[#F6F5F2] pt-32 pb-24">
            <Container>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center max-w-2xl mx-auto">
                    <FadeIn>
                        <span className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase mb-4 block">
                            Order Confirmed
                        </span>
                        <h1 className="font-serif text-[48px] leading-tight text-zinc-900 mb-6">
                            Thank you for your patronage.
                        </h1>
                        <p className="text-[15px] text-zinc-600 leading-relaxed mb-12">
                            Your request has been received by our Atelier. A concierge will be in touch shortly to confirm details and arrange delivery.
                        </p>
                        <ButtonLink href="/">Return to Home</ButtonLink>
                    </FadeIn>
                </div>
            </Container>
        </main>
    );
}
