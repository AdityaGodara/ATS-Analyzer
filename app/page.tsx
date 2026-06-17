"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sparkles, ChevronDown } from "lucide-react";
import type { ResumeAnalysis } from "@/types";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import DropZone from "@/components/upload/DropZone";
import AnalysisDashboard from "@/components/dashboard/AnalysisDashboard";

// Sample resume text for demo purposes
const SAMPLE_RESUME_TEXT = `
John Developer
john.developer@email.com | +91 9876543210 | linkedin.com/in/johndeveloper | github.com/johndeveloper

SUMMARY
Frontend Developer with 2 years of experience building scalable web applications using React, Next.js, and TypeScript. 
Passionate about clean code, performance optimization, and modern UI/UX design.

EDUCATION
Bachelor of Technology in Computer Science
ABC University, Pune — 2022
CGPA: 8.5/10

SKILLS
Languages: JavaScript, TypeScript, Python, HTML, CSS
Frameworks: React, Next.js, Node.js, Express.js, Tailwind CSS
Databases: MongoDB, MySQL, Firebase
Tools: Git, GitHub, Vercel, Figma, Postman, VS Code
Cloud: AWS (EC2, S3), Docker

EXPERIENCE
Frontend Developer Intern — XYZ Tech Pvt. Ltd. (Jan 2022 – Jun 2022)
• Built responsive React components used by 10,000+ users
• Optimized page load time by 40% using lazy loading and code splitting
• Integrated RESTful APIs and implemented state management with Redux

PROJECTS
E-Commerce Platform (React, Node.js, MongoDB)
• Full-stack web app with cart, payment integration (Razorpay), and admin dashboard
• Deployed on Vercel with CI/CD via GitHub Actions
• Implemented JWT authentication and role-based access control

Portfolio Website (Next.js, Tailwind CSS)
• Personal portfolio with 95/100 Lighthouse performance score
• Integrated dark mode, smooth animations using Framer Motion

Task Manager App (React, Firebase)
• Real-time task management with drag-and-drop using Firebase Firestore
• Progressive Web App (PWA) with offline support

CERTIFICATIONS
• Meta Frontend Developer Certificate — Coursera (2023)
• AWS Cloud Practitioner — Amazon Web Services (2023)
• React Developer Certificate — HackerRank (2022)

ACHIEVEMENTS
• 1st Place — HackDev Hackathon 2023 (React + AI project)
• Ranked in Top 5% on LeetCode (500+ problems solved)
• Open source contributor — 3 merged PRs on popular npm packages
`;

type AppState = "landing" | "upload" | "analyzing" | "results";

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    setAppState("upload");
    setTimeout(() => {
      uploadSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleFileSelect = useCallback(async (file: File) => {
    setAppState("analyzing");
    setError(null);

    try {
      const { extractTextFromPDF } = await import("@/lib/pdf-parser");
      const { analyzeResume } = await import("@/lib/analyzer");

      const text = await extractTextFromPDF(file);

      if (!text || text.trim().length < 50) {
        throw new Error("Could not extract meaningful text from the PDF. Please ensure your resume is text-based (not a scanned image).");
      }

      // Small delay for UX (shows analyzing animation)
      await new Promise((r) => setTimeout(r, 1200));

      const result = analyzeResume(text);
      setAnalysis(result);
      setAppState("results");

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to analyze resume. Please try again.");
      setAppState("upload");
    }
  }, []);

  const handleSampleResume = async () => {
    setAppState("analyzing");
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const { analyzeResume } = await import("@/lib/analyzer");
      const result = analyzeResume(SAMPLE_RESUME_TEXT);
      setAnalysis(result);
      setAppState("results");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } catch (err) {
      console.error(err);
      setAppState("upload");
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setAppState("upload");
    setTimeout(() => {
      uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar onAnalyzeClick={scrollToUpload} />

      {/* ── Analyzing Overlay ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {appState === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-500/50"
            >
              <Zap className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="mb-2 text-2xl font-bold text-white">Analyzing Your Resume</h2>
            <p className="mb-8 text-slate-400">Running 50+ ATS checks...</p>
            <div className="w-64 overflow-hidden rounded-full bg-slate-800 h-2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["Detecting Skills", "Checking Sections", "Matching Careers", "Calculating Score"].map(
                (step, idx) => (
                  <motion.span
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.5 }}
                    className="flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1.5 text-xs text-slate-400"
                  >
                    <Sparkles className="h-3 w-3 text-violet-400" />
                    {step}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results View ──────────────────────────────────────────────────────── */}
      {appState === "results" && analysis && (
        <main className="pt-20 px-4 sm:px-6 lg:px-8">
          <AnalysisDashboard analysis={analysis} onReset={handleReset} />
        </main>
      )}

      {/* ── Landing + Upload View ─────────────────────────────────────────────── */}
      {(appState === "landing" || appState === "upload") && (
        <>
          <HeroSection onAnalyzeClick={scrollToUpload} />
          <FeaturesSection />
          <HowItWorksSection />

          {/* Upload Section */}
          <section
            ref={uploadSectionRef}
            id="upload"
            className="relative py-24"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />
            <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10 text-center"
              >
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
                  <Zap className="h-3.5 w-3.5" /> Ready to Analyze
                </span>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Upload Your Resume
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-slate-400">
                  Upload your PDF resume and receive an instant, comprehensive analysis.
                  All processing happens in your browser — completely private.
                </p>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400"
                >
                  <strong>Error:</strong> {error}
                </motion.div>
              )}

              <DropZone
                onFileSelect={handleFileSelect}
                isAnalyzing={appState === "analyzing"}
              />

              {/* Sample Resume Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={handleSampleResume}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm text-slate-400 hover:border-slate-600 hover:text-white transition-all"
                >
                  <Sparkles className="h-4 w-4 text-violet-400" />
                  Try with Sample Resume
                </button>
                <p className="mt-2 text-xs text-slate-600">
                  Loads a pre-filled demo resume to show all features
                </p>
              </motion.div>

              {/* Privacy note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 text-center text-xs text-slate-600"
              >
                🔒 Your resume never leaves your browser. No data is stored or transmitted.
              </motion.p>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
