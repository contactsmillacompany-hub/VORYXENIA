"use client";

export function FloatingGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full h-[250vh] overflow-visible perspective-[1000px]">
            {children}
        </div>
    );
}
