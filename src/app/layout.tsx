import "./globals.scss";
import type { Metadata } from "next";
import { urbanist, denton } from "./fonts/fonts";
import MainLayout from "../components/layout/MainLayout";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CursorTrail from "@/components/props/CursorTrail";
import DoorLoader from "@/components/props/DoorLoader";

export const metadata: Metadata = {
  title: "Relvo - Design. Development. Digital Experiences.",
  description: "RELVO is a design-led digital agency creating websites, mobile apps, digital products, and AI-powered solutions through thoughtful design and modern technology.",
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
  keywords: [
    "RELVO",
    "Relvo Agency",
    "Web Design Agency",
    "Web Development Agency",
    "UI UX Design",
    "Website Design",
    "Website Development",
    "Custom Website Development",
    "Mobile App Development",
    "Digital Product Design",
    "SaaS Development",
    "E-commerce Development",
    "Custom Web Application",
    "AI Solutions",
    "Custom Software Development",
  ],
  authors: [
    {
      name: "RELVO",
    },
  ],
  creator: "RELVO",
  publisher: "RELVO",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "RELVO — Design. Development. Digital Experiences.",
    description:
      "A design-led digital agency creating websites, apps, digital products, and AI-powered solutions.",
    siteName: "RELVO",
    url: "https://yourdomain.com",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RELVO — Design. Development. Digital Experiences.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RELVO — Design. Development. Digital Experiences.",
    description:
      "A design-led digital agency creating websites, apps, digital products, and AI-powered solutions.",
    images: ["https://yourdomain.com/og-image.jpg"],
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