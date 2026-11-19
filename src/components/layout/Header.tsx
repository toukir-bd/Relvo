"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { openContactModal } from "@/utils/contactModal";
interface HeaderProps {
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}

export default function Header({
  isMenuOpen,
  onMenuOpen,
  onMenuClose,
}: HeaderProps) {
  return (
    <header>
      <Link href="/" className="absolute left-4 top-5 z-30 flex w-[112px] items-center sm:left-6 sm:top-7 sm:w-[140px] lg:left-10 lg:top-9 lg:w-[160px]">
        <span className="relative block aspect-[32/9] w-full">
        <Image
          src="/img/elements/logo.webp"
          alt="Relvo Logo"
          fill
          sizes="(max-width: 640px) 112px, (max-width: 1024px) 140px, 160px"
          className="object-contain transition-all duration-500"
          priority
        />
        </span>
      </Link>
      <div className="fixed right-4 top-5 z-[100] flex items-center gap-2 sm:right-6 sm:top-7 lg:right-10 lg:top-9">
        <button
          type="button"
          aria-label="Take AI Services"
          onClick={() => openContactModal(["Custom Software Development"], { aiServices: true })}
          className="header-ai-button group inline-flex cursor-pointer items-center gap-3 rounded-full bg-secondary/70 p-1.5 text-sm font-medium text-white backdrop-blur-[5px] transition hover:text-primary sm:ps-4 lg:ps-7"
        >
          <span className="header-ai-label hidden text-base font-normal tracking-wide md:inline lg:text-[18px]">Take AI Services</span>
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 transition group-hover:border-primary/35 group-hover:bg-black/35 group-hover:text-primary sm:h-12 sm:w-12">
            <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </span>
        </button>
        <button
          type="button"
          onClick={isMenuOpen ? onMenuClose : onMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-secondary/70 p-1.5 text-sm font-medium text-white backdrop-blur-[5px] transition hover:text-primary sm:ps-4 lg:ps-7"
        >
          <span className="hidden text-base font-normal tracking-wide md:inline lg:text-[18px]">Menus</span>
          <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border transition sm:h-12 sm:w-12 ${isMenuOpen ? "border-red-400/25 bg-red-500/[0.04] text-red-400 group-hover:border-red-400/40 group-hover:bg-red-500/[0.08]" : "border-white/20 text-primary group-hover:border-primary/35 group-hover:bg-black/35"}`}>
            {isMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.7} />
            ) : (
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="h-px w-4 bg-primary transition-all duration-300 group-hover:w-5" />
                <span className="h-px w-3 bg-primary transition-all duration-300 group-hover:w-5" />
                <span className="h-px w-5 bg-primary transition-all duration-300 group-hover:w-5" />
                <span className="h-px w-[17px] bg-primary transition-all duration-300 group-hover:w-5" />
              </span>
            )}
          </span>
        </button>
      </div>
    </header>
  );
}
