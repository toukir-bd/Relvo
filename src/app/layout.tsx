import "./globals.scss";
import type { Metadata } from "next";
import { urbanist, momo } from "./fonts/fonts";
import MainLayout from "../components/layout/MainLayout";
import SmoothScroll from "@/components/providers/SmoothScroll";
import DoorLoader from "@/components/props/DoorLoader";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Relvo Dev | Web Design, Software Development & Digital Products",
    template: "%s | Relvo Dev",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "16x16 32x32 48x48 64x64 128x128 192x192 256x256", type: "image/x-icon" }],
  },
  keywords: [
    "Relvo", "relvo", "RELVO", "Revlo", "Revol", "Relov", "Realvo", "Relvon", "Reelvo",
    "RelvoDev", "relvoDev", "relvodev", "Relvodev",
    "Relvo Dev", "relvo Dev", "relvo dev", "Relvo dev",
    "Relvo Design",
    "Relvo Development",
    "Relvo Software",
    "Relvo IT",
    "Relvo Ltd",
    "web design",
    "web development",
    "software development",
    "UI UX design",
    "website design and development",
    "custom software development",
    "digital product design",
    "e-commerce development",
  ],
  authors: [
    {
      name: SITE_NAME,
    },
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Relvo Dev | Web Design, Digital Products & Software Development",
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Relvo Dev | Web Design, Digital Products & Software Development",
    description: SITE_DESCRIPTION,
  },
  category: "technology",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["Relvo", "RelvoDev"],
      url: SITE_URL,
      logo: `${SITE_URL}/img/elements/logo.webp`,
      description: SITE_DESCRIPTION,
      email: "hello@relvodev.com",
      telephone: "+8801410485824",
      areaServed: "Worldwide",
      sameAs: ["https://dribbble.com/toukir-bd"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: ["Relvo", "RelvoDev"],
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${momo.variable}`}>
      <body className="bg-secondary text-white" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <DoorLoader />
        <SmoothScroll>
          <MainLayout>{children}</MainLayout>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
