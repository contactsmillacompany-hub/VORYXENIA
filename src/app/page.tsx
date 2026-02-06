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

      {/* Selected Pieces - Masonry Style */}
      <section className="py-32 sm:py-40">
        <Container>
          <div className="mb-24 flex items-end justify-between border-b border-black/[0.08] pb-8">
            <FadeIn>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] text-zinc-900">
                Selected Editions
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="hidden sm:block">
              <Link href="/collection" className="text-[11px] tracking-[0.2em] text-zinc-500 hover:text-zinc-900 transition-colors">
                VIEW ALL
              </Link>
            </FadeIn>
          </div>

          <div className="grid gap-x-12 gap-y-24 md:grid-cols-2 md:gap-y-40">
            {openPieces.slice(0, 3).map((piece, idx) => (
              <div
                key={piece.slug}
                className={`${idx % 2 === 1 ? "md:translate-y-32" : ""}`}
              >
                <FadeIn delay={idx * 0.2}>
                  <Link href={`/collection/${piece.slug}`} className="group block cursor-none">
                    {/* Note: In a real implementation we would add a custom cursor here */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                      <Image
                        src={piece.imagePath}
                        alt={piece.imageAlt}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-8 flex justify-between items-baseline">
                      <div>
                        <div className="text-[10px] tracking-[0.3em] text-zinc-500 mb-2">
                          {piece.editionLabel}
                        </div>
                        <h3 className="font-serif text-[24px] text-zinc-900">
                          {piece.name}
                        </h3>
                      </div>
                      <div className="text-[12px] tracking-[0.1em] text-zinc-700">
                        {piece.price}
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              </div>
            ))}
          </div>

          <div className="mt-40 text-center sm:hidden">
            <ButtonLink href="/collection" tone="secondary">View All Works</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Philosophy / Atelier Teaser */}
      <section className="relative overflow-hidden bg-white py-40">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/grain.png')] pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <span className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase">
                The Atelier
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-10 font-serif text-[clamp(28px,3vw,42px)] leading-tight text-zinc-900">
                "Form is edited. Finish is deliberate. Each piece is treated as a quiet object: 51% restraint, 49% precision."
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-12">
                <Magnetic>
                  <Link href="/atelier" className="inline-block border-b border-zinc-900 pb-1 text-[11px] tracking-[0.2em] text-zinc-900 transition-opacity hover:opacity-60">
                    READ PHILOSOPHY
                  </Link>
                </Magnetic>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Private Client Footer Call */}
      <section className="py-32 sm:py-48">
        <Container>
          <div className="rounded-[2px] border border-zinc-200 p-12 sm:p-24 text-center transition-colors hover:border-zinc-300">
            <FadeIn>
              <h3 className="font-serif text-[32px] sm:text-[48px] text-zinc-900 mb-6">
                Private Client
              </h3>
              <p className="mx-auto max-w-md text-[14px] leading-8 text-zinc-600 mb-12">
                Requests are handled personally. Share your intended occasion, and we will respond with availability.
              </p>
              <ButtonLink href="/contact">Request Availability</ButtonLink>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main >
  );
}
