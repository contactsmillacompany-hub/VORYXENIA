"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function HeroSlideshow() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax effects
    // Background moves slower than foreground
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const foregroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div ref={ref} className="absolute inset-0 h-full w-full bg-[#111] overflow-hidden">

            {/* 1. Atmospheric Background (The Atelier) */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-[0.4]"
            >
                <Image
                    src="/images/atelier-01.jpg"
                    alt="The Atelier"
                    fill
                    className="object-cover grayscale contrast-[1.2]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900/50" />
            </motion.div>

            {/* 2. The Hero Subject (Centered, Imposing) */}
            <motion.div
                style={{ scale: foregroundScale }}
                className="absolute inset-0 flex items-end justify-center pb-0"
            >
                <div className="relative w-full h-[85%] md:h-[95%] max-w-[1200px]">
                    <Image
                        src="/images/piece-05.png"
                        alt="Midnight Wool Cape"
                        fill
                        priority
                        className="object-contain object-bottom drop-shadow-2xl"
                    />
                </div>
            </motion.div>

            {/* 3. Luxury Grain Overlay */}
            <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay pointer-events-none" />

            {/* 4. Vignette for Focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        </div>
    );
}
