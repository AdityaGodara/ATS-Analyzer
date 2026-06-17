import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ATS Hero – Free Resume ATS Analyzer & Career Match Tool",
  description:
    "Upload your resume and instantly discover your ATS score, strongest career matches, missing skills, salary insights, and best job opportunities. 100% free, no sign-up required.",
  keywords: [
    "ATS score",
    "resume analyzer",
    "career match",
    "job search",
    "resume checker",
    "ATS optimization",
    "career advice",
    "resume tips",
    "salary insights",
    "job roles",
  ],
  authors: [{ name: "Aditya Godara" }],
  creator: "Aditya Godara",
  openGraph: {
    title: "ATS Hero – Free Resume ATS Analyzer",
    description: "Instantly analyze your resume, get ATS score, career matches, and salary insights.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS Hero – Free Resume ATS Analyzer",
    description: "Instantly analyze your resume, get ATS score, career matches, and salary insights.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
