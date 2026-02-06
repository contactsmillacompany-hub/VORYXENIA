"use client";

import { motion, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface MagneticImageProps {
    src: string;
    alt: string;
    width?: number; // Optional force width if needed
    aspectRatio?: string; // "3/4"
    className?: string;
}

export function MagneticImage({ src, alt, aspectRatio = "3/4", className = "" }: MagneticImageProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Physics springs
    const x = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });
    const y = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply magnetic pull (capped)
        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-visible group cursor-none ${className}`}
            style={{ aspectRatio }}
        >
            <motion.div
                style={{ x, y }}
                className="relative h-full w-full overflow-hidden bg-zinc-100 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover scale-[1.1] transition-transform duration-700 ease-out group-hover:scale-[1.15]"
                />
            </motion.div>
        </motion.div>
    );
}
