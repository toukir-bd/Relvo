"use client";
import Link from "next/link";
import Image from "next/image";
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
      <Link href="/" className="absolute left-4 top-5 z-30 flex w-auto items-center sm:left-6 sm:top-7 lg:left-10 lg:top-9">
        <Image
          src="/img/elements/logo.webp"
          alt="Relvo Logo"
          width={160}
          height={45}
          className="h-auto w-[112px] transition-all duration-500 sm:w-[140px] lg:w-[160px]"
          priority
        />
      </Link>
      <button onClick={isMenuOpen ? onMenuClose : onMenuOpen} aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className={`group fixed right-4 top-5 z-100 flex h-11 w-11 cursor-pointer items-center justify-center gap-2 rounded-full sm:right-6 sm:top-7 sm:h-[50px] sm:w-[50px] lg:right-10 lg:top-9
          border border-white/30 hover:border-primary/50 transition-all duration-500"
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
    </header>
  );
}
