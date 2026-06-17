"use client";

import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Star, IndianRupee, BookOpen } from "lucide-react";
import type { CareerRole } from "@/types";

interface RoleCardsProps {
  roles: CareerRole[];
}

const RANK_COLORS = [
  "from-violet-600 to-indigo-600",
  "from-blue-600 to-cyan-600",
  "from-emerald-600 to-teal-600",
  "from-orange-600 to-amber-600",
  "from-pink-600 to-rose-600",
];

const RANK_GLOW = [
  "shadow-violet-500/30",
  "shadow-blue-500/30",
  "shadow-emerald-500/30",
  "shadow-orange-500/30",
  "shadow-pink-500/30",
];

export default function RoleCards({ roles }: RoleCardsProps) {
  return (
    <div className="space-y-4">
      {roles.map((role, idx) => (
        <motion.div
          key={role.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${RANK_COLORS[idx]} p-4`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                    #{idx + 1} Match
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white/80">
                    {role.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{role.title}</h3>
              </div>
              <div className="text-right">
                <div className={`rounded-xl bg-white/20 px-4 py-2 shadow-lg ${RANK_GLOW[idx]}`}>
                  <span className="text-3xl font-black text-white">{role.matchPercentage}%</span>
                  <p className="text-xs text-white/70">match</p>
                </div>
              </div>
            </div>

            {/* Match progress bar */}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full rounded-full bg-white/80"
                initial={{ width: 0 }}
                animate={{ width: `${role.matchPercentage}%` }}
                transition={{ delay: idx * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Why it matches */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800">
                <TrendingUp className="h-4 w-4 text-slate-400" />
              </div>
              <div>
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Why It Matches
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">{role.whyItMatches}</p>
              </div>
            </div>

            {/* Key Strengths */}
            {role.keyStrengths.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800">
                  <Star className="h-4 w-4 text-slate-400" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Key Strengths
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.keyStrengths.map((strength) => (
                      <span
                        key={strength}
                        className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-300 border border-slate-700"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {/* Salary */}
              <div className="flex items-start gap-3 rounded-xl bg-slate-800/50 p-3">
                <IndianRupee className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="text-xs text-slate-500">Fresher Salary</p>
                  <p className="font-semibold text-emerald-400">{role.salaryRange}</p>
                </div>
              </div>

              {/* Skills to learn */}
              <div className="flex items-start gap-3 rounded-xl bg-slate-800/50 p-3">
                <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400" />
                <div>
                  <p className="text-xs text-slate-500">Learn Next</p>
                  <p className="text-xs text-violet-300 font-medium">
                    {role.skillsToLearn.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills to learn list */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Skills To Learn Next
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {role.skillsToLearn.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1 text-xs text-yellow-300"
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
