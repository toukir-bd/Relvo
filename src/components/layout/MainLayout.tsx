"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContactActions from "./FloatingContactActions";
import CursorTrail from "@/components/props/CursorTrail";
import { useSmoothScroll } from "../providers/SmoothScroll";
import { CONTACT_MODAL_EVENT } from "@/utils/contactModal";

const MenuOverlay = dynamic(() => import("./MenuOverlay"), { ssr: false });
const ContactModal = dynamic(() => import("./ContactModal"), { ssr: false });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [contactMounted, setContactMounted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isAiInquiry, setIsAiInquiry] = useState(false);
  const [isQuestionInquiry, setIsQuestionInquiry] = useState(false);
  const lenis = useSmoothScroll();

  const closeContact = useCallback(() => {
    setContactOpen(false);
    setIsAiInquiry(false);
    setIsQuestionInquiry(false);
    if (window.location.hash === "#contact") {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  useEffect(() => {
    if (menuOpen || contactOpen) {
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
  }, [menuOpen, contactOpen, lenis]);

  useEffect(() => {
    const handleOpenRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ initialSelectedServices?: string[]; aiServices?: boolean; questionInquiry?: boolean }>).detail;
      setSelectedServices(detail?.initialSelectedServices ?? []);
      setIsAiInquiry(detail?.aiServices ?? false);
      setIsQuestionInquiry(detail?.questionInquiry ?? false);
      setMenuOpen(false);
      setContactMounted(true);
      setContactOpen(true);
    };

    const handleContactLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      let destination: URL;
      try {
        destination = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (destination.hash !== "#contact") return;
      event.preventDefault();
      window.dispatchEvent(new CustomEvent(CONTACT_MODAL_EVENT));
    };

    window.addEventListener(CONTACT_MODAL_EVENT, handleOpenRequest);
    document.addEventListener("click", handleContactLink, true);
    const initialHashFrame = window.requestAnimationFrame(() => {
      if (window.location.hash === "#contact") {
        setContactMounted(true);
        setContactOpen(true);
      }
    });

    return () => {
      window.removeEventListener(CONTACT_MODAL_EVENT, handleOpenRequest);
      document.removeEventListener("click", handleContactLink, true);
      window.cancelAnimationFrame(initialHashFrame);
    };
  }, []);

  return (
    <>
      <CursorTrail enabled={!contactOpen} />
      <Header isMenuOpen={menuOpen} onMenuOpen={() => { setMenuMounted(true); setMenuOpen(true); }} onMenuClose={() => setMenuOpen(false)}/>
      {menuMounted && <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)}/>}
      <main>
        {children}
      </main>
      <FloatingContactActions />
      <Footer />
      {contactMounted && <ContactModal
        isOpen={contactOpen}
        onClose={closeContact}
        initialSelectedServices={selectedServices}
        isAiInquiry={isAiInquiry}
        isQuestionInquiry={isQuestionInquiry}
      />}
    </>
  );
}
