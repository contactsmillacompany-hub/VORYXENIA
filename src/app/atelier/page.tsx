import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";

export default function AtelierPage() {
  return (
    <main className="pb-24">
      <Section title="Atelier">
        <div className="grid gap-10 max-w-2xl">
          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
              <Image
                src="/images/piece-05.png"
                alt="Atelier studio detail"
                width={1800}
                height={1200}
                className="aspect-[4/5] w-full object-cover"
                priority
              />
            </div>
          </FadeIn>
          <FadeIn>
            <p>
              The atelier is quiet by design.
            </p>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p>
              Each piece is individually finished.
              <br />
              Each edition is a finite allocation.
            </p>
          </FadeIn>
          <FadeIn delay={0.32}>
            <p>
              Detailed sizing is provided privately, after enquiry.
            </p>
          </FadeIn>
        </div>
      </Section>
    </main>
  );
}
