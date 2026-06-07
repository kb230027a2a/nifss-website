import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "NIFSS | Nür Institute of Forensic & Strategic Studies",
    template: "%s | NIFSS",
  },
  description:
    "Pakistan's first think tank combining Forensics & Strategic Studies. Advancing forensic awareness, consultancy, and research across Pakistan.",
  keywords: [
    "forensic science", "strategic studies", "Pakistan", "think tank",
    "crime scene investigation", "forensic consultancy", "NIFSS",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "NIFSS",
    title: "NIFSS | Nür Institute of Forensic & Strategic Studies",
    description: "Pakistan's first think tank combining Forensics & Strategic Studies.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
