import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "Aly Sibak | Full-Stack Developer",
  description: "Third-year CS Co-op student at U of G. Building production software with React, TypeScript, Python, and AWS.",
  keywords: ["Aly Sibak", "Software Developer", "Full-Stack", "React", "TypeScript", "Co-op", "University of Guelph"],
  authors: [{ name: "Aly Sibak" }],
  openGraph: {
    title: "Aly Sibak | Full-Stack Developer",
    description: "Third-year Computer Science Co-op student building production software.",
    url: "https://alysibak.vercel.app",
    siteName: "Aly Sibak Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}