import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";

export default function PhilosophyPage() {
  return (
    <main className="pb-24">
      <Section title="Philosophy">
        <FadeIn>
          <p className="max-w-2xl">
            Luxury whispers.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-8 max-w-2xl">
          <FadeIn delay={0.12}>
            <p>
              We do not follow seasons.
              <br />
              We create permanence.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p>
              Restraint over trend.
              <br />
              Endurance over novelty.
            </p>
          </FadeIn>
          <FadeIn delay={0.36}>
            <p>
              Presence over visibility.
            </p>
          </FadeIn>
        </div>
      </Section>
    </main>
  );
}
