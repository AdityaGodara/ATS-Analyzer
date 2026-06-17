"use client";

import { motion } from "framer-motion";
import {
  FileText, Zap, Target, Download, TrendingUp,
  CheckCircle, BarChart3, Sparkles, Brain, Shield,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "ATS Score",
    description: "Instant 0–100 ATS compatibility score with detailed breakdown by category.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Brain,
    title: "Skills Detection",
    description: "Automatically detects 80+ technical skills grouped by category.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Target,
    title: "Career Matching",
    description: "AI-powered matching against 13+ tech career paths with percentages.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    description: "Fresher salary ranges for matched roles in the Indian job market.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: CheckCircle,
    title: "Improvement Tips",
    description: "Actionable suggestions with High/Medium/Low priority ratings.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: BarChart3,
    title: "Resume Statistics",
    description: "Word count, reading time, sections found, and contact completeness.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Sparkles,
    title: "Missing Keywords",
    description: "See which high-value skills are absent and why they matter.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "Career Verdict",
    description: "Final employability score, best-fit role, and hiring readiness assessment.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Download,
    title: "Download Report",
    description: "Export a professional PDF report with all analysis results.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
            <Sparkles className="h-3.5 w-3.5" /> Everything You Need
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Comprehensive Resume Analysis
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Every feature is designed to give you a competitive edge in your job search.
            No sign-up required. 100% private.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.4 }}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
