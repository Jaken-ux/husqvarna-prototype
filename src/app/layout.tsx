import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Husqvarna Dealer Portal — Prototype",
  description: "Interactive prototype for the Husqvarna dealer portal redesign.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
