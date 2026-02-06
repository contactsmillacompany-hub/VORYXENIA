"use client";

import Link from "next/link";
import { Magnetic } from "@/components/Magnetic";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  tone?: "primary" | "secondary" | "ghost";
  className?: string;
}

export function ButtonLink({
  href,
  children,
  tone = "primary",
  className = "",
}: ButtonLinkProps) {
  const isPrimary = tone === "primary";

  return (
    <Magnetic>
      <Link
        href={href}
        className={`
          group relative inline-flex items-center justify-center overflow-hidden rounded-full
          px-8 py-4 text-[12px] tracking-[0.2em] transition-all duration-300
          ${isPrimary
            ? "bg-[#0E0E0E] text-white hover:bg-zinc-800"
            : tone === "secondary"
              ? "border border-zinc-200 bg-transparent text-zinc-900 hover:border-zinc-400"
              : "border border-zinc-900/10 bg-white/0 text-zinc-900 backdrop-blur-sm hover:bg-zinc-900/5" // Ghost
          }
          ${className}
        `}
      >
        <span className="relative z-10">{children}</span>
        {isPrimary && (
          <div className="absolute inset-0 -z-0 scale-x-0 bg-white/10 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-x-100 origin-left" />
        )}
      </Link>
    </Magnetic>
  );
}
