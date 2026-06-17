"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

export default function HeroSection({ onAnalyzeClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Blobs */}
        <motion.div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300 backdrop-blur"
        >
          <Sparkles className="h-4 w-4 animate-pulse" />
          100% Free · No Sign-up · Privacy First
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Free Resume{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            ATS Analyzer
          </span>{" "}
          &amp; Career Match Tool
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 leading-relaxed"
        >
          Upload your resume and instantly discover your ATS score, strongest career matches,
          missing skills, and best job opportunities.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
        >
          {[
            ["80+", "Skills Detected"],
            ["13+", "Career Paths"],
            ["50+", "ATS Checks"],
            ["100%", "Client-side Private"],
          ].map(([num, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="font-bold text-white">{num}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={onAnalyzeClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-violet-500/40 transition-all hover:shadow-violet-500/60"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="relative h-5 w-5" />
            <span className="relative">Analyze Resume</span>
          </motion.button>

          <motion.a
            href="#features"
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-4 text-base font-medium text-slate-300 backdrop-blur hover:border-slate-600 hover:text-white transition-all"
          >
            Learn More
            <ChevronDown className="h-4 w-4" />
          </motion.a>
        </motion.div>

        {/* Floating score preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {[
            { label: "ATS Score", value: "87/100", color: "text-violet-400" },
            { label: "Frontend Dev", value: "92% Match", color: "text-emerald-400" },
            { label: "Skills Found", value: "14", color: "text-blue-400" },
            { label: "Salary Est.", value: "₹5–8 LPA", color: "text-orange-400" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-3 backdrop-blur"
            >
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className={`mt-0.5 text-sm font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
