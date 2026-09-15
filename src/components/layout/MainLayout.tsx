"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuOverlay from "./MenuOverlay";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock page scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <Header
        isScrolled={isScrolled}
        isMenuOpen={menuOpen}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
      />
      <MenuOverlay
        isOpen={menuOpen}
        isScrolled={isScrolled}
        onClose={() => setMenuOpen(false)}
      />
      <main>
        <div className="relative flex min-h-screen w-full flex-col backdrop-blur-[300px] bg-[#00150D]/80 overflow-x-hidden">
          <div className="mx-auto max-w-full w-full">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}