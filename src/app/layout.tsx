import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PARAM BRAHMAND | Earth Intelligence Operating System",
  description:
    "Sovereign Multimodal Earth Observation & Scientific Intelligence Platform. ISRO SAC PS 26167 · SIH 2026.",
  authors: [{ name: "Team TensorTitans" }],
  keywords: [
    "ISRO",
    "Earth Observation",
    "Remote Sensing",
    "Multimodal AI",
    "SAR",
    "Cartosat",
    "GeoTIFF",
    "WGS84",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#03050A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-void-0 text-space-white antialiased selection:bg-cyan-accent selection:text-void-0">
        {children}
      </body>
    </html>
  );
}
