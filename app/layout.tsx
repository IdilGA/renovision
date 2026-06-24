import type { Metadata, Viewport } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Renovision — Visualiseer jouw toekomstige woning",
  description: "Ontwerp en visualiseer jouw interieur voordat je beslissingen neemt",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
