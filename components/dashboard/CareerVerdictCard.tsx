"use client";

import { motion } from "framer-motion";
import {
  Trophy, Star, ArrowRight, Zap, CheckCircle2,
} from "lucide-react";
import type { CareerVerdict } from "@/types";

interface CareerVerdictCardProps {
  verdict: CareerVerdict;
}

export default function CareerVerdictCard({ verdict }: CareerVerdictCardProps) {
  const score = verdict.employabilityScore;

  const readinessColor =
    score >= 80 ? "text-emerald-400" :
    score >= 65 ? "text-blue-400" :
    score >= 50 ? "text-amber-400" : "text-red-400";

  const readinessBg =
    score >= 80 ? "bg-emerald-500/20 border-emerald-500/30" :
    score >= 65 ? "bg-blue-500/20 border-blue-500/30" :
    score >= 50 ? "bg-amber-500/20 border-amber-500/30" : "bg-red-500/20 border-red-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"
    >
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="border-b border-slate-800 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/30">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Final Career Verdict</h3>
              <p className="text-sm text-slate-400">Based on your resume analysis</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">
          {/* Employability Score */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800/50 p-6 text-center">
            <p className="mb-2 text-sm font-medium text-slate-400">Current Employability Score</p>
            <div className="relative mb-2">
              <span className="text-6xl font-black text-white">{score}</span>
              <span className="text-2xl font-bold text-slate-500">/100</span>
            </div>
            <div className="h-2 w-full max-w-[140px] overflow-hidden rounded-full bg-slate-700">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          {/* Verdict Details */}
          <div className="space-y-3">
            <VerdictRow
              icon={<Star className="h-4 w-4 text-violet-400" />}
              label="Most Suitable Role"
              value={verdict.primaryRole}
              valueClass="text-violet-300 font-semibold"
            />
            <VerdictRow
              icon={<ArrowRight className="h-4 w-4 text-blue-400" />}
              label="Secondary Role"
              value={verdict.secondaryRole}
              valueClass="text-blue-300"
            />
            <VerdictRow
              icon={<Zap className="h-4 w-4 text-yellow-400" />}
              label="Recommended Next Skill"
              value={verdict.recommendedNextSkill}
              valueClass="text-yellow-300"
            />
          </div>

          {/* Hiring Readiness — full width */}
          <div className={`sm:col-span-2 flex items-center gap-3 rounded-xl border px-5 py-4 ${readinessBg}`}>
            <CheckCircle2 className={`h-6 w-6 flex-shrink-0 ${readinessColor}`} />
            <div>
              <p className="text-xs text-slate-500 font-medium mb-0.5">Hiring Readiness</p>
              <p className={`font-bold text-lg ${readinessColor}`}>{verdict.hiringReadiness}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VerdictRow({
  icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-slate-800/50 p-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className={`text-sm ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}
