import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moana • The Ocean Chose Her | Interactive Cinematic Preview",
  description: "Experience the interactive cinematic preview of Disney's Moana with 180° interactive head-tracking and ambient soundscapes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
