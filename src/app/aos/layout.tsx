import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Operating System",
  description: "Private operations dashboard for Relvo.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
};

export default function AosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
