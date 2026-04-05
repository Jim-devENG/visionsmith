import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisionSmith | Forge Your Vision Into Reality",
  description: "The discipline platform for those who refuse to drift. Clarity, structure, and execution—for the life you actually want.",
  keywords: ["discipline", "productivity", "goals", "vision", "self-mastery", "execution"],
  openGraph: {
    title: "VisionSmith | Forge Your Vision Into Reality",
    description: "The discipline platform for those who refuse to drift. Clarity, structure, and execution—for the life you actually want.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
