"use client";
import Link from "next/link";
import Image from "next/image";
interface HeaderProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}

export default function Header({
  isScrolled,
  isMenuOpen,
  onMenuOpen,
  onMenuClose,
}: HeaderProps) {
  return (
    <header>
      <Link href="/" className="absolute top-10 left-10 z-30 flex items-center w-auto">
        <Image
          src="/img/elements/logo.webp"
          alt="Relvo Logo"
          width={160}
          height={45}
          className={`transition-all duration-500`}
          priority
        />
      </Link>
      <button onClick={isMenuOpen ? onMenuClose : onMenuOpen} aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className={`group cursor-pointer flex justify-center items-center h-[50px] w-[50px] gap-2 fixed top-10 right-10 z-100 rounded-full 
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