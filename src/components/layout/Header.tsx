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
      className={`fixed inset-x-0 top-0 z-[200] transition-all duration-500 ${isScrolled
          ? "h-[60px] bg-[#061018]/90 backdrop-blur-md"
          : isMenuOpen
            ? "h-[120px] bg-[#061018]/90 backdrop-blur-md"
            : "h-[120px] bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-full max-w-full items-center justify-between px-8 lg:px-16">

        <Link href="/" className="flex items-center">
          <Image
            src="/img/elements/logo-wh.svg"
            alt="Relvo Logo"
            width={150}
            height={37}
            className={`h-auto transition-all duration-500 ${isScrolled ? "w-[110px]" : "w-[150px]"
              }`}
            priority
          />
        </Link>

        <button
          onClick={isMenuOpen ? onMenuClose : onMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`group flex cursor-pointer items-center justify-center rounded-full border-2 border-gray-700 transition-all duration-500 ${isScrolled ? "h-11 w-11" : "h-14 w-14"
            }`}
        >
          {isMenuOpen ? (
            /* X */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white transition-colors group-hover:text-[#FF8D28]"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            /* Hamburger */
            <span className="flex flex-col space-y-[3px]">
              <span className="h-[2px] w-[22px] bg-white transition-all duration-300 group-hover:w-[28px] group-hover:bg-[#FF8D28]" />
              <span className="h-[2px] w-[18px] bg-white transition-all duration-300 group-hover:w-[28px] group-hover:bg-[#FF8D28]" />
              <span className="h-[2px] w-[28px] bg-white transition-all duration-300 group-hover:bg-[#FF8D28]" />
              <span className="h-[2px] w-[24px] bg-white transition-all duration-300 group-hover:w-[28px] group-hover:bg-[#FF8D28]" />
            </span>
          )}
        </button>

      </div>
    </header>
  );
}