"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
          aria-label="Ask about AI services"
          onClick={() => openContactModal(["Custom Software Development"])}
          className="btn-relvo !h-11 !px-1.5 !text-xs sm:!h-[50px] sm:!text-sm"
        >
          <span className="btnText hidden min-[390px]:inline">AI Services</span>
          <span className="iconArea !ms-0 !h-8 !w-8 min-[390px]:!ms-2 sm:!h-9 sm:!w-9 sm:!ms-2">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
          </span>
        </button>
        <button onClick={isMenuOpen ? onMenuClose : onMenuOpen} aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className={`group relative z-[100] flex h-11 w-11 cursor-pointer items-center justify-center gap-2 rounded-full sm:h-[50px] sm:w-[50px]
          border border-white/30 hover:border-primary/50 transition-all duration-500 backdrop-blur-[100px] bg-secondary/10
          ${isMenuOpen
            ? "border-red-200 hover:border-red-400"
            : "border-white/10 hover:border-primary/50"
          }
        `}
      >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white transition-colors group-hover:text-red-400"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            <span className="flex flex-col space-y-[3px]">
              <span className="h-[2px] w-[20px] transition-all duration-300 group-hover:w-[26px] bg-primary" />
              <span className="h-[2px] w-[16px] transition-all duration-300 group-hover:w-[26px] bg-primary" />
              <span className="h-[2px] w-[26px] transition-all duration-300 bg-primary" />
              <span className="h-[2px] w-[22px] transition-all duration-300 group-hover:w-[26px] bg-primary" />
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
