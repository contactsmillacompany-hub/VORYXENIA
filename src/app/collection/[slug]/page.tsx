

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ButtonLink";
import { ProductActions } from "@/components/ProductActions";
import { pieces } from "@/lib/pieces";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const piece = pieces.find((p) => p.slug === slug);

  if (!piece) {
    return {
      title: "Piece Not Found",
    };
  }

  return {
    title: piece.name,
    description: piece.note,
    openGraph: {
      title: `${piece.name} | VORYXENIA`,
      description: piece.note,
      images: [
        {
          url: piece.imagePath,
          width: 800,
          height: 1000,
        },
      ],
    },
  };
}

export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = pieces.find((p) => p.slug === slug);

  if (!piece) notFound();

  return (
    <main className="min-h-screen bg-[#F6F5F2] pt-32 pb-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          {/* Images Column */}
          <div className="flex flex-col gap-4">
            <FadeIn>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
                <Image
                  src={piece.imagePath}
                  alt={piece.imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>

            {piece.secondaryImagePath && (
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
                  <Image
                    src={piece.secondaryImagePath}
                    alt="Detail view"
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            )}
          </div>

          {/* Details Column - Sticky */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <FadeIn delay={0.3}>
              <span className="block text-[10px] tracking-[0.4em] text-zinc-600 uppercase">
                {piece.editionLabel}
              </span>
              <h1 className="mt-4 font-serif text-[48px] leading-[0.9] text-zinc-900 sm:text-[64px]">
                {piece.name}
              </h1>
              <div className="mt-8 h-px w-12 bg-zinc-900" />

              <p className="mt-8 text-[15px] leading-8 text-zinc-700 font-light">
                {piece.note}
              </p>

              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-[13px] tracking-[0.2em] text-zinc-900">
                  {piece.price}
                </span>
                <span className="text-[11px] tracking-[0.1em] text-zinc-500">
                  (Inc. Taxes)
                </span>
              </div>

              <div className="mt-12 flex flex-col gap-4">
                <ProductActions
                  price={piece.price}
                  slug={piece.slug}
                  name={piece.name}
                  image={piece.imagePath}
                />
              </div>

              <div className="mt-16 space-y-8 border-t border-black/[0.06] pt-8">
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] text-zinc-900 uppercase mb-2">Details</h3>
                  <p className="text-[13px] leading-7 text-zinc-600">
                    This piece is finished individually. Slight variations are intentional and part of the edition's character.
                  </p>
                </div>
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] text-zinc-900 uppercase mb-2">Care</h3>
                  <p className="text-[13px] leading-7 text-zinc-600">
                    Archive grade dry clean only.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </main>
  );
}
