"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, BarChart3, Download } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Resume",
    description: "Drag & drop your PDF resume. We never store your data — everything runs in your browser.",
    color: "from-violet-500 to-indigo-500",
    glow: "shadow-violet-500/20",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Instant Analysis",
    description: "Our engine parses your resume and runs 50+ checks across skills, sections, formatting, and more.",
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "View Dashboard",
    description: "Explore your ATS score, career matches, salary insights, and improvement suggestions.",
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
  },
  {
    number: "04",
    icon: Download,
    title: "Download Report",
    description: "Export a professional PDF report to share with mentors or track your improvements.",
    color: "from-orange-500 to-amber-500",
    glow: "shadow-orange-500/20",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Get your complete resume analysis in under 10 seconds. No account needed.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-12 hidden h-[calc(100%-6rem)] w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/30 via-slate-700 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-2">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                className={`flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition-all ${idx % 2 === 0 ? "lg:mr-12" : "lg:ml-12 lg:mt-12"}`}
              >
                <div className="flex-shrink-0">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg ${step.glow}`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-bold tracking-widest text-slate-600">
                      STEP {step.number}
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold text-white text-lg">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
