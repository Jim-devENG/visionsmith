import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VisionSmith — Every chaos has a pattern.",
  description:
    "VisionSmith teaches builders how to think before they build. A practice in clarity, structure, and pattern for founders, creators, and leaders building something that has to hold up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
