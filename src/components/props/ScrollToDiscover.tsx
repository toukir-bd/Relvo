"use client";

import { ArrowDown } from "lucide-react";

export default function ScrollToDiscover() {
    const scrollToDiscover = () => {
        document
            .getElementById("discover-us")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <button
            type="button"
            onClick={scrollToDiscover}
            className="group inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-white transition hover:text-[#BBFF00] bg-black/20 p-1 pe-5 rounded-full"
        >
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 transition group-hover:border-[#BBFF00]/35 group-hover:bg-black/35 group-hover:text-[#BBFF00]">
                <ArrowDown className="scroll-arrow absolute h-4 w-4" />
            </span>
            <span className="text-[16px] font-thin tracking-wide">Scroll to Discover Us</span>
        </button>
    );
}