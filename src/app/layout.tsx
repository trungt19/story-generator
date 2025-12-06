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
  title: "StoryForge AI | Create Unique Stories Powered by AI",
  description: "Generate captivating stories with AI. Choose your genre, set the tone, and let Claude craft unique narratives tailored to your imagination.",
  keywords: ["AI story generator", "creative writing", "story creator", "AI writing", "fiction generator"],
  authors: [{ name: "StoryForge AI" }],
  openGraph: {
    title: "StoryForge AI | Create Unique Stories Powered by AI",
    description: "Generate captivating stories with AI. Choose your genre, set the tone, and let Claude craft unique narratives.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoryForge AI | Create Unique Stories",
    description: "Generate captivating stories with AI. Choose your genre, set the tone, and let Claude craft unique narratives.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
