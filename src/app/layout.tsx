
import "./globals.scss";
import type { Metadata } from "next";
import { mont, denton } from "./fonts/fonts";
import MainLayout from "../components/layout/MainLayout";
import BgBackdrop from "@/components/props/BgBackdrop";

export const metadata: Metadata = {
  title: "Relvo - Crafting Digital Experiences",
  description: "Relvo - Crafting Digital Experiences",
  icons: {
    icon: "/img/elements/favicon.webp",
    shortcut: "/img/elements/favicon.webp",
    apple: "/img/elements/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mont.variable} ${denton.variable}`}>
      <body className="text-white bg-[#10273A]">
        <MainLayout>{children}</MainLayout>
        <BgBackdrop />
      </body>
    </html>
  );
}