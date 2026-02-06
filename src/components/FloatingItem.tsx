"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface FloatingItemProps {
    children: React.ReactNode;
    depth: number; // 0.5 = slow, 1 = normal, 1.5 = fast
    x: string; // "10%"
    y: string; // "20%"
    className?: string;
}

export function FloatingItem({ children, depth, x, y, className = "" }: FloatingItemProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll();

    // Create Physics-based Parallax
    // We map scroll 0->1 to a substantial vertical shift based on depth
    // The 'physics' comes from using spring on the transform if we wanted, 
    // but for pure parallax, transform is usually direct. 
    // To get the "Weightless" drift, we can add a spring damping.

    const targetY = useTransform(scrollYProgress, [0, 1], ["0%", `${-200 * depth}%`]);

    // Add 'inertia' to the movement using spring physics
    const physicsY = useSpring(targetY, {
        stiffness: 50,
        damping: 15,
        mass: 1.5,
    });

    return (
        <motion.div
            ref={ref}
            style={{
                left: x,
                top: y,
                y: physicsY,
                position: 'absolute'
            }}
            className={`will-change-transform z-[${Math.floor(depth * 10)}] ${className}`}
        >
            {children}
        </motion.div>
    );
}
