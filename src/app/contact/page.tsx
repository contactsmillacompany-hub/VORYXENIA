"use client";

import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Container } from "@/components/Container";
import { Magnetic } from "@/components/Magnetic";

import { submitEnquiry } from "./actions";
import { useActionState } from "react";

export default function ContactPage() {
  const [state, action, isPending] = useActionState(submitEnquiry, {
    message: "",
    success: false,
  });

  return (
    <main className="min-h-screen bg-[#F6F5F2] pt-32 pb-24 flex flex-col justify-center">
      <Container>
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <FadeIn>
              <h1 className="font-serif text-[clamp(42px,5vw,64px)] leading-[0.9] text-zinc-900">
                Private <br /> Enquiry
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-md text-[14px] leading-7 text-zinc-600">
                We invite you to share your request. Whether for a specific edition or a private appointment, all correspondence is handled personally.
              </p>
            </FadeIn>

            <div className="mt-16 space-y-12">
              <FadeIn delay={0.4}>
                <div>
                  <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-2">Email</span>
                  <a href="mailto:atelier@voryxenia.com" className="font-serif text-2xl text-zinc-900 hover:italic transition-all">
                    atelier@voryxenia.com
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div>
                  <span className="block text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-2">Location</span>
                  <p className="text-zinc-900">
                    By appointment.<br />
                    New Delhi / London
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-12 shadow-sm">
            <FadeIn delay={0.3}>
              {state.success ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-serif text-2xl text-zinc-900">Request Received</p>
                  <p className="mt-4 text-[13px] text-zinc-600">
                    We will review your enquiry and respond shortly.
                  </p>
                </div>
              ) : (
                <form action={action} className="flex flex-col gap-10">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full border-b border-zinc-200 py-2 text-zinc-900 outline-none transition-colors focus:border-zinc-900 bg-transparent"
                      placeholder="Your name"
                    />
                    {state.errors?.name && (
                      <p className="text-xs text-red-500">{state.errors.name[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full border-b border-zinc-200 py-2 text-zinc-900 outline-none transition-colors focus:border-zinc-900 bg-transparent"
                      placeholder="email@example.com"
                    />
                    {state.errors?.email && (
                      <p className="text-xs text-red-500">{state.errors.email[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
                      Enquiry
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      className="w-full border-b border-zinc-200 py-2 text-zinc-900 outline-none transition-colors focus:border-zinc-900 bg-transparent resize-none"
                      placeholder="Details regarding your request..."
                    />
                    {state.errors?.message && (
                      <p className="text-xs text-red-500">{state.errors.message[0]}</p>
                    )}
                  </div>
                  {state.message && !state.success && (
                    <p className="text-xs text-red-500">{state.message}</p>
                  )}

                  <div className="pt-4">
                    <Magnetic>
                      <button type="submit" disabled={isPending} className="w-full bg-zinc-900 text-white py-4 text-[12px] tracking-[0.2em] hover:bg-zinc-800 transition-colors disabled:opacity-50">
                        {isPending ? "SENDING..." : "SEND REQUEST"}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </Container>
    </main>
  );
}
