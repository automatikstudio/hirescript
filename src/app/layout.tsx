import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HireScript — AI Job Description & Interview Kit Generator",
  description:
    "Write bias-free job posts, generate interview questions, and create scoring rubrics with AI. Built for HR managers and startup founders.",
  keywords: ["job description generator", "interview questions", "hiring tool", "bias-free hiring", "HR tool"],
  openGraph: {
    title: "HireScript — AI Job Description & Interview Kit Generator",
    description: "Write bias-free job posts, generate interview questions, and create scoring rubrics with AI.",
    type: "website",
    siteName: "HireScript",
    url: "https://hirescript-ten.vercel.app",
    images: [{ url: "https://hirescript-ten.vercel.app/og-image.png", width: 1200, height: 630, alt: "HireScript — AI Job Description Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HireScript — AI Job Description Generator",
    description: "Write job posts that attract the right people. AI-powered, bias-free.",
    creator: "@automatikstudio",
    images: ["https://hirescript-ten.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexend.variable} ${publicSans.variable}`}>
      <body className="font-body bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
