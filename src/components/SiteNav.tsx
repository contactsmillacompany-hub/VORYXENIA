"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";
import { useCart } from "./CartContext";

const links: Array<{ href: string; label: string }> = [
  { href: "/collection", label: "Collection" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/atelier", label: "Atelier" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav({ brandLabel = "VORYXENIA" }: { brandLabel?: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        initial="hidden"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={`transition-all duration-700 ${scrolled || menuOpen
            ? "bg-[#F6F5F2]/90 backdrop-blur-md border-b border-black/[0.04]"
            : "bg-transparent delay-200"
            }`}
        >
          <Container className="py-6">
            <div className="flex items-center justify-between">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  className="group relative flex items-center gap-2 text-[11px] tracking-[0.2em] text-zinc-900"
                >
                  <div className="flex flex-col gap-[3px]">
                    <span className="h-px w-4 bg-zinc-900 transition-transform group-hover:scale-x-75 origin-left" />
                    <span className="h-px w-4 bg-zinc-900 transition-transform group-hover:scale-x-100" />
                  </div>
                  <span>MENU</span>
                </button>
              </Magnetic>

              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 font-serif text-[18px] tracking-[0.35em] text-zinc-900"
              >
                {brandLabel}
              </Link>

              <div className="flex items-center gap-8">
                <Magnetic>
                  <Link
                    href="/contact"
                    className="text-[11px] tracking-[0.2em] text-zinc-900 hover:text-zinc-600 transition-colors"
                  >
                    ENQUIRE
                  </Link>
                </Magnetic>
                <CartTrigger />
              </div>
            </div>
          </Container>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[400px] bg-[#F6F5F2] px-10 py-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="font-serif text-[13px] tracking-[0.3em] text-zinc-500">
                  NAVIGATION
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-[11px] tracking-[0.2em] hover:text-zinc-500 transition-colors"
                >
                  CLOSE
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-[32px] text-zinc-900 hover:italic transition-all duration-300 block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <div className="text-[11px] tracking-[0.2em] text-zinc-500">
                  PRIVATE CLIENT SERVICE
                </div>
                <div className="mt-2 text-[13px] text-zinc-600 font-light">
                  Direct contact available for existing clients.
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function CartTrigger() {
  const { toggleDrawer, cartCount } = useCart();

  return (
    <Magnetic>
      <button
        onClick={toggleDrawer}
        className="text-[11px] tracking-[0.2em] text-zinc-900 hover:text-zinc-600 transition-colors"
      >
        BAG ({cartCount})
      </button>
    </Magnetic>
  );
}
