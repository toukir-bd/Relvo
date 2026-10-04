import "./globals.scss";
import type { Metadata } from "next";
import { urbanist, denton } from "./fonts/fonts";
import MainLayout from "../components/layout/MainLayout";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CursorTrail from "@/components/props/CursorTrail";
import DoorLoader from "@/components/props/DoorLoader";

export const metadata: Metadata = {
  title: "Relvo - Refined Experiences, Led by Vision & Originality",
  description: "Relvo - Refined Experiences, Led by Vision & Originality",
  icons: {
    icon: [
      {
        url: "/img/elements/favicon-32x32.webp",
        sizes: "32x32",
        type: "image/webp",
      },
      {
        url: "/img/elements/favicon-48x48.webp",
        sizes: "48x48",
        type: "image/webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${denton.variable}`}>
      <body className="bg-secondary text-white" cz-shortcut-listen="true">
        <DoorLoader/>
        <CursorTrail/>
        <SmoothScroll>
          <MainLayout>{children}</MainLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}