"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Container } from "@/components/Container";
import { openPieces } from "@/lib/pieces";

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-[#F6F5F2] pt-32 pb-32">
      <Container>
        <div className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
          <FadeIn>
            <h1 className="font-serif text-[12vw] leading-[0.85] tracking-[-0.04em] text-zinc-900 mix-blend-multiply sm:text-[100px]">
              Collection
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} className="max-w-xs md:pb-4">
            <p className="text-[13px] leading-relaxed tracking-[0.05em] text-zinc-600">
              Pieces are released as finite editions. Once the allocation is complete, the edition is moved to the permanent Archive.
            </p>
          </FadeIn>
        </div>

        <div className="mt-24 sm:mt-40">
          {/* Masonry-ish Grid */}
          <div className="grid grid-cols-1 gap-y-24 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {openPieces.map((piece, idx) => (
              <div key={piece.slug} className={`flex flex-col ${idx % 2 === 0 ? "sm:mt-0" : "sm:mt-32"}`}>
                <FadeIn delay={idx * 0.1}>
                  <Link href={`/collection/${piece.slug}`} className="group block">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
                      <Image
                        src={piece.imagePath}
                        alt={piece.imageAlt}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                    </div>

                    <div className="mt-6 flex justify-between items-baseline">
                      <div>
                        <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-2">
                          {piece.editionLabel}
                        </span>
                        <h2 className="font-serif text-[24px] text-zinc-900 leading-none">
                          {piece.name}
                        </h2>
                      </div>
                      <div className="text-[12px] tracking-[0.1em] text-zinc-900">
                        {piece.price}
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
