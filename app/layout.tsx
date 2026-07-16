import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VisionSmith",
  description: "A structured system for self-governance, discipline, clarity, and execution.",
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
