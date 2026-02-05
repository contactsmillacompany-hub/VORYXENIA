import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { closedPieces } from "@/lib/pieces";

export default function ArchivePage() {
  return (
    <main className="pb-24">
      <Section title="Archive">
        <FadeIn>
          <p className="max-w-2xl">
            Closed editions remain visible. They do not return.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-10 sm:gap-12 md:grid-cols-2">
          {closedPieces.map((p, idx) => (
            <FadeIn key={p.slug} delay={0.08 * idx}>
              <article className="rounded-[32px] border border-black/[0.06] bg-white p-6 opacity-70 sm:p-8">
                <div className="relative overflow-hidden rounded-[26px] border border-black/[0.06] bg-[#F6F5F2]">
                  <Image
                    src={p.imagePath}
                    alt={p.imageAlt}
                    width={2000}
                    height={2500}
                    className="aspect-[4/5] w-full object-contain p-10 grayscale sm:p-14"
                  />
                </div>

                <div className="mt-7">
                  <div className="flex items-baseline justify-between gap-6">
                    <div className="text-[11px] tracking-[0.26em] text-zinc-500">
                      {p.editionLabel}
                    </div>
                    <div className="text-[12px] tracking-[0.18em] text-zinc-700">
                      {p.price}
                    </div>
                  </div>
                  <div className="mt-3 font-serif text-[20px] tracking-[0.10em] text-zinc-800">
                    {p.name}
                  </div>
                  <div className="mt-4 text-[14px] leading-7 text-zinc-700">
                    {p.note}
                  </div>
                  <div className="mt-8 text-[11px] tracking-[0.26em] text-zinc-500">
                    EDITION CLOSED
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>
    </main>
  );
}
