import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CONEXA — Descubrí tu región",
  description:
    "CONEXA es la plataforma para descubrir deporte, salud, solidaridad, comercio, turismo e innovación en tu región. Empezamos en la Triple Frontera.",
  authors: [{ name: "CONEXA" }],
  metadataBase: new URL("https://conexa.org"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "CONEXA",
    title: "CONEXA — Descubrí tu región",
    description:
      "CONEXA es la plataforma para descubrir deporte, salud, solidaridad, comercio, turismo e innovación en tu región. Empezamos en la Triple Frontera.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070B1A" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
