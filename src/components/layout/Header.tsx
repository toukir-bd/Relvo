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
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-all
        ${isScrolled
          ? "h-[70px] bg-[#051313]/70 backdrop-blur-md"
          : isMenuOpen
            ? "h-[120px] bg-[#051313]/85 backdrop-blur-md"
            : "h-[120px] transparent"
        }`}
    >
      <div className="mx-auto flex h-full max-w-full items-center justify-between px-8 lg:px-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/img/elements/logo.webp"
            alt="Relvo Logo"
            width={189}
            height={52}
            className={`transition-all duration-500`}
            priority
          />
        </Link>
        <button
          onClick={isMenuOpen ? onMenuClose : onMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`group flex cursor-pointer items-center justify-center rounded-full border border-white/30 hover:border-[#BBFF00]/50 transition-all duration-500
            ${isScrolled
              ? "h-[50px] w-[50px]"
              : "h-[56px] w-[56px]"
            }
            ${isMenuOpen
              ? "border-red-200 hover:border-red-400"
              : "border-white/10 hover:border-[#BBFF00]/50"
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
              <span className="h-[2px] w-[20px] transition-all duration-300 group-hover:w-[26px] bg-[#BBFF00]" />
              <span className="h-[2px] w-[16px] transition-all duration-300 group-hover:w-[26px] bg-[#BBFF00]" />
              <span className="h-[2px] w-[26px] transition-all duration-300 bg-[#BBFF00]" />
              <span className="h-[2px] w-[22px] transition-all duration-300 group-hover:w-[26px] bg-[#BBFF00]" />
            </span>
          )}
        </button>
      </div>
    </header>
  );
}