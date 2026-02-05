"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
    {
        src: "/images/fabric-ivory-01.jpg",
        alt: "Raw ivory wool texture",
        position: "center 30%", // Focusing on texture
    },
    {
        src: "/images/piece-05.png",
        alt: "Sculpted tunic silhouette",
        position: "center center",
    },
    {
        src: "/images/atelier-01.jpg",
        alt: "Atelier atmosphere",
        position: "center center",
    },
];

export function HeroSlideshow() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 6000); // 6 seconds per slide

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 h-full w-full bg-zinc-900">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }} // Slow, cinematic cross-fade
                    className="absolute inset-0 h-full w-full"
                >
                    <Image
                        src={slides[index].src}
                        alt={slides[index].alt}
                        fill
                        priority={index === 0}
                        className="object-cover opacity-[0.85]"
                        style={{ objectPosition: slides[index].position }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlay Gradient for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#F6F5F2]" />
            <div className="absolute inset-0 bg-[#F6F5F2]/10 mix-blend-overlay pointer-events-none" />

            {/* Slide Indicators */}
            <div className="absolute bottom-12 right-12 z-10 flex gap-4">
                {slides.map((_, i) => (
                    <div key={i} className="relative h-[2px] w-12 bg-white/20 overflow-hidden rounded-full">
                        {i === index && (
                            <motion.div
                                layoutId="activeSlide"
                                className="absolute inset-0 bg-white"
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 6, ease: "linear" }}
                            />
                        )}
                        {i < index && <div className="absolute inset-0 bg-white/60" />}
                    </div>
                ))}

                {/* Current Slide Number */}
                <div className="absolute -top-8 right-0 font-serif text-white/80 text-xl tracking-widest">
                    0{index + 1}
                </div>
            </div>
        </div>
    );
}
