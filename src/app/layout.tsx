import "./globals.scss";
import type { Metadata } from "next";
import { urbanist, denton } from "./fonts/fonts";
import MainLayout from "../components/layout/MainLayout";
import SmoothScroll from "@/components/providers/SmoothScroll";
import DoorLoader from "@/components/props/DoorLoader";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Relvo Dev | Web Design, Development & Digital Products in Bangladesh",
    template: "%s | Relvo Dev",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
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
    "Relvo", "relvo", "Revlo", "Revol", "Relov", "Realvo", "Relvon", "Reelvo",
    "RelvoDev", "relvoDev", "relvodev", "Relvodev",
    "Relvo Dev", "relvo Dev", "relvo dev", "Relvo dev",
    "Relvo Design",
    "Relvo Development",
    "Relvo BD",
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
    title: "Relvo Dev | Web Design, Development & Digital Products",
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relvo Dev | Web Design, Development & Digital Products",
    description: SITE_DESCRIPTION,
  },
  category: "technology",
  other: {
    "geo.region": "BD",
    "geo.placename": "Bangladesh",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["Relvo", "RelvoDev", "Relvo BD"],
      url: SITE_URL,
      logo: `${SITE_URL}/img/elements/logo.webp`,
      description: SITE_DESCRIPTION,
      email: "hello@relvodev.com",
      telephone: "+8801410485824",
      areaServed: { "@type": "Country", name: "Bangladesh" },
      sameAs: ["https://dribbble.com/toukir-bd"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: ["Relvo", "RelvoDev"],
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-BD",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${denton.variable}`}>
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
