import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { Container } from "@/components/Container";
import { PerformanceGuard } from "@/components/PerformanceGuard";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CartProvider } from "@/components/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | VORYXENIA",
    default: "VORYXENIA",
  },
  description: "Silent confidence. Minimal form. Designed to remain.",
  openGraph: {
    title: "VORYXENIA",
    description: "Silent confidence. Minimal form. Designed to remain.",
    url: "https://voryxenia.com",
    siteName: "VORYXENIA",
    images: [
      {
        url: "/images/og-image.jpg", // Assuming this will exist or using a placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VORYXENIA",
    description: "Silent confidence. Minimal form. Designed to remain.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} antialiased`}
      >
        <SmoothScroll>
          <CartProvider>
            <PerformanceGuard />
            <SiteNav />
            <CartDrawer />
            <div className="min-h-screen bg-[var(--background)]">
              {children}
              <footer className="py-16 sm:py-24">
                <Container>
                  <div className="text-[11px] tracking-[0.22em] text-zinc-500">
                    Designed to remain.
                  </div>
                </Container>
              </footer>
            </div>
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
