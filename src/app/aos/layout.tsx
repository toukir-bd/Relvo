import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Operating System",
  description: "Private operations dashboard for Relvo.",
  robots: { index: false, follow: false },
};

export default function AosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
