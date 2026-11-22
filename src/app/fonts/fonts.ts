
import localFont from "next/font/local";
export const urbanist = localFont({
  src: [
    {
      path: "/Urbanist-100.ttf",
      weight: "100"
    },
    {
      path: "/Urbanist-200.ttf",
      weight: "200"
    },
    {
      path: "/Urbanist-300.ttf",
      weight: "300"
    },
    {
      path: "/Urbanist-400.ttf",
      weight: "400"
    },
    {
      path: "/Urbanist-500.ttf",
      weight: "500"
    },
    {
      path: "/Urbanist-600.ttf",
      weight: "600"
    },
    {
      path: "/Urbanist-700.ttf",
      weight: "700"
    },
    {
      path: "/Urbanist-800.ttf",
      weight: "800"
    },
    {
      path: "/Urbanist-900.ttf",
      weight: "900"
    },
  ],
  variable: "--font-urbanist",
  display: "swap",
  preload: false,
});

export const momo = localFont({
  src: [
    {
      path: "/momo.ttf",
      weight: "400"
    }
  ],
  variable: "--font-momo",
  display: "swap",
  preload: true,
});
