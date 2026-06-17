"use client";

import { motion } from "framer-motion";
import { IndianRupee, Info } from "lucide-react";
import type { CareerRole } from "@/types";

interface SalaryInsightsProps {
  roles: CareerRole[];
}

const CATEGORY_COLORS: Record<string, string> = {
  "Web Development": "from-violet-500 to-indigo-500",
  Engineering: "from-blue-500 to-cyan-500",
  "Artificial Intelligence": "from-yellow-500 to-orange-500",
  "Data & Analytics": "from-emerald-500 to-teal-500",
  Infrastructure: "from-orange-500 to-red-500",
  Mobile: "from-pink-500 to-rose-500",
  "Design & Dev": "from-purple-500 to-pink-500",
};

const SALARY_DESCRIPTIONS: Record<string, string> = {
  "Frontend Developer": "High demand for React/Next.js devs in product companies",
  "React Developer": "Startups actively seeking React talent with modern stacks",
  "Full Stack Developer": "Most-hired profile in modern Indian tech companies",
  "Backend Developer": "API & infrastructure specialists command good packages",
  "Software Engineer": "Generic SWE roles span a wide range based on skills",
  "AI Engineer": "Hottest profile in 2024–25; massive demand from AI companies",
  "ML Engineer": "Production ML roles at product-based companies",
  "Data Scientist": "Analytics + ML hybrid roles growing rapidly",
  "Data Analyst": "Entry-point into data careers; abundant opportunities",
  "DevOps Engineer": "Cloud + automation skills command premium packages",
  "Cloud Engineer": "Cloud certifications dramatically increase salary potential",
  "Mobile Developer": "React Native & Flutter developers in high demand",
  "UI/UX Engineer": "Product companies value design-to-code specialists",
};

export default function SalaryInsights({ roles }: SalaryInsightsProps) {
  const top6 = roles.slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {top6.map((role, idx) => {
          const gradient = CATEGORY_COLORS[role.category] ?? "from-slate-500 to-slate-600";
          return (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all"
            >
              <div className={`bg-gradient-to-r ${gradient} h-1.5`} />
              <div className="p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-white text-sm leading-tight">{role.title}</h4>
                  <span className="flex-shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                    #{idx + 1}
                  </span>
                </div>

                <div className="mb-3 flex items-center gap-1.5">
                  <IndianRupee className="h-5 w-5 text-emerald-400" />
                  <span className="text-xl font-bold text-emerald-400">{role.salaryRange}</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {SALARY_DESCRIPTIONS[role.title] ?? "Salary varies by company and skills"}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="font-medium">Match:</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${role.matchPercentage}%` }}
                      transition={{ delay: idx * 0.08 + 0.3, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-slate-400 font-medium">{role.matchPercentage}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
      >
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
        <p className="text-xs text-amber-300/80">
          <strong>Disclaimer:</strong> Salary estimates are approximate and vary by company,
          location, experience, and market conditions. Figures represent typical fresher/entry-level
          ranges in India as of 2024–25.
        </p>
      </motion.div>
    </div>
  );
}
