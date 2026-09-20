import type { Metadata } from "next";
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
  title: "TRINEXUS — El Hub de Innovación de la Triple Frontera",
  description:
    "TRINEXUS es el hub de innovación que conecta personas, tecnología y oportunidades en la Triple Frontera de Argentina, Brasil y Paraguay.",
  authors: [{ name: "TRINEXUS" }],
  metadataBase: new URL("https://trinexus.org"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "TRINEXUS",
    title: "TRINEXUS — El Hub de Innovación de la Triple Frontera",
    description:
      "TRINEXUS es el hub de innovación que conecta personas, tecnología y oportunidades en la Triple Frontera de Argentina, Brasil y Paraguay.",
  },
  twitter: { card: "summary_large_image" },
  other: { "theme-color": "#070B1A" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
