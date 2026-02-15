import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeartWhisper - Bridging Silent Emotions",
  description: "A privacy-first, real-time emotional connection app that gently uncovers and helps express unspoken emotions hiding beneath everyday conversations. Perfect for Valentine's Day.",
  keywords: ["HeartWhisper", "Emotions", "Love", "Valentine's Day", "Connection", "Privacy", "AI", "Relationship"],
  authors: [{ name: "HeartWhisper Team" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💕</text></svg>",
  },
  openGraph: {
    title: "HeartWhisper - Bridging Silent Emotions",
    description: "A privacy-first emotional connection app for expressing unspoken feelings",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeartWhisper - Bridging Silent Emotions",
    description: "A privacy-first emotional connection app for expressing unspoken feelings",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
