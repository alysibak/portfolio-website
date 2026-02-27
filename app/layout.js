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

export const metadata = {
  title: "Aly Sibak | Full-Stack Developer",
  description: "Third-year Computer Science Co-op student at the University of Guelph. Full-stack developer with production experience in React, TypeScript, Node.js, Python, and AWS. Currently seeking Summer 2026 Co-op opportunities.",
  keywords: ["Aly Sibak", "Software Developer", "Full-Stack", "React", "TypeScript", "Co-op", "University of Guelph"],
  authors: [{ name: "Aly Sibak" }],
  openGraph: {
    title: "Aly Sibak | Full-Stack Developer",
    description: "Third-year Computer Science Co-op student building production software with React, TypeScript, Node.js, and AWS.",
    url: "https://alysibak.vercel.app",
    siteName: "Aly Sibak Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}