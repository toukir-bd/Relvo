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
  const lenis = useSmoothScroll();

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
      <Header isMenuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} onMenuClose={() => setMenuOpen(false)}/>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)}/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
