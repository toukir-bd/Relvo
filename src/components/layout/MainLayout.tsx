"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuOverlay from "./MenuOverlay";
import { useSmoothScroll } from "../providers/SmoothScroll";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lenis = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

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
        <div className="relative flex min-h-screen w-full flex-col overflow-x-clip">
          <div className="mx-auto w-full max-w-full">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}