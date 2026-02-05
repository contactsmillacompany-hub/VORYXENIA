import { ReactNode } from "react";
import { Container } from "@/components/Container";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-24">
      <Container>
        <h1 className="font-serif text-[32px] leading-tight tracking-[0.14em] text-zinc-900 sm:text-[40px]">
          {title}
        </h1>
        <div className="mt-10 text-[15px] leading-8 text-zinc-700">{children}</div>
      </Container>
    </section>
  );
}
