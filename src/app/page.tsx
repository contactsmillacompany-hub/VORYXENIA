"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ButtonLink";
import { Magnetic } from "@/components/Magnetic";
import { openPieces } from "@/lib/pieces";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { FloatingGrid } from "@/components/FloatingGrid";
import { FloatingItem } from "@/components/FloatingItem";
import { MagneticImage } from "@/components/MagneticImage";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="bg-[#F6F5F2]">
      {/* Hero Section */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full">
          <HeroSlideshow />
        </motion.div>

        <Container className="relative flex h-full flex-col justify-end pb-24 sm:pb-32">
          <div className="max-w-[90vw]">
            <h1 className="font-serif text-[12vw] leading-[0.85] tracking-[-0.04em] text-white mix-blend-overlay sm:text-[140px] overflow-hidden text-center sm:text-left">
              <span className="sr-only">VORYXENIA</span>
              <motion.span
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1, delayChildren: 0.5 }} // Slower start
                aria-hidden
              >
                {Array.from("VORYXENIA").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: "110%" },
                      visible: { y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }, // Elegant ease
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <FadeIn delay={1.2} className="max-w-md">
                <p className="text-[13px] tracking-[0.2em] text-white/70 uppercase leading-relaxed text-center sm:text-left">
                  Silent confidence. Minimal form. <br />
                  Designed to remain.
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="flex gap-6">
                  <ButtonLink href="/collection">Collection</ButtonLink>
                  <ButtonLink href="/contact" tone="secondary">
                    Private Enquiry
                  </ButtonLink>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>

        {/* Scroll Indicator - Bottom Centered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference z-20"
        >
          <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase">Explore</span>
          <div className="h-12 w-[1px] bg-white/20 overflow-hidden relative">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-white"
            />
          </div>
        </motion.div>
      </div>

      {/* Antigravity Floating Gallery */}
      <section className="relative min-h-[250vh] bg-[#F6F5F2]">
        <FloatingGrid>
          {/* Layer 0: Deep Background (Slow) */}
          <FloatingItem depth={0.2} x="10%" y="10%" className="w-[40vw] opacity-20 filter grayscale blur-[1px]">
            <MagneticImage src="/images/atelier-01.jpg" alt="Atelier Ambience" aspectRatio="4/3" />
          </FloatingItem>

          <FloatingItem depth={0.3} x="55%" y="60%" className="w-[35vw] opacity-20 mix-blend-multiply">
            <MagneticImage src="/images/fabric-ivory-01.jpg" alt="Fabric Detail" aspectRatio="1/1" />
          </FloatingItem>

          {/* Layer 1: Midground (Normal) */}
          <FloatingItem depth={1.0} x="15%" y="40%" className="w-[30vw]">
            <Link href="/collection/midnight-wool-cape">
              <MagneticImage src="/images/piece-05.png" alt="Midnight Wool Cape" aspectRatio="3/4" />
              <div className="absolute -bottom-12 left-0 font-serif text-3xl">01. The Cape</div>
            </Link>
          </FloatingItem>

          <FloatingItem depth={1.0} x="60%" y="15%" className="w-[28vw]">
            <Link href="/collection/ivory-silk-tunic">
              <MagneticImage src="/images/piece-01.png" alt="Ivory Tunic" aspectRatio="3/4" />
              <div className="absolute -bottom-12 right-0 font-serif text-3xl">02. The Tunic</div>
            </Link>
          </FloatingItem>

          {/* Layer 2: Foreground (Fast - Drifting) */}
          <FloatingItem depth={1.4} x="50%" y="85%" className="w-[25vw] z-20">
            <Link href="/collection/charcoal-wrap-skirt">
              <MagneticImage src="/images/piece-02.png" alt="Charcoal Skirt" aspectRatio="3/4" />
              <div className="absolute -left-12 top-1/2 -rotate-90 font-serif text-3xl">03. The Wrap</div>
            </Link>
          </FloatingItem>
        </FloatingGrid>
      </section>

      {/* Philosophy / Atelier Teaser - Minimalist */}
      <section className="relative py-48 bg-white z-30">
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="font-serif text-[clamp(42px,5vw,64px)] leading-[0.9] text-zinc-900 mb-12">
                Gravity is optional. <br /> Form is absolute.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-12">
                <ButtonLink href="/collection">Enter VORYXENIA</ButtonLink>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main >
  );
}
