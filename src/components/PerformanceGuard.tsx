"use client";

import { useEffect } from "react";

export function PerformanceGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (typeof performance === "undefined") return;
    const original = performance.measure?.bind(performance);
    if (!original) return;

    performance.measure = ((...args: Parameters<Performance["measure"]>) => {
      try {
        return original(...args);
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        if (message.includes("cannot have a negative time stamp")) return;
        throw e;
      }
    }) as Performance["measure"];

    return () => {
      performance.measure = original as Performance["measure"];
    };
  }, []);

  return null;
}
