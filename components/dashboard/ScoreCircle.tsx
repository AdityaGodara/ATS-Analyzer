"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScoreCircleProps {
  score: number;
  label: string;
}

const SCORE_COLORS: Record<string, { stroke: string; glow: string; text: string }> = {
  Excellent: { stroke: "#22c55e", glow: "rgba(34,197,94,0.35)", text: "text-emerald-400" },
  Good: { stroke: "#6366f1", glow: "rgba(99,102,241,0.35)", text: "text-indigo-400" },
  Average: { stroke: "#f59e0b", glow: "rgba(245,158,11,0.35)", text: "text-amber-400" },
  "Needs Improvement": { stroke: "#ef4444", glow: "rgba(239,68,68,0.35)", text: "text-red-400" },
};

export default function ScoreCircle({ score, label }: ScoreCircleProps) {
  const colors = SCORE_COLORS[label] ?? SCORE_COLORS["Average"];
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40"
          style={{ background: colors.glow }}
        />

        <svg width="210" height="210" className="relative -rotate-90">
          {/* Background ring */}
          <circle
            cx="105"
            cy="105"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="14"
          />
          {/* Score arc */}
          <motion.circle
            cx="105"
            cy="105"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
            style={{
              filter: `drop-shadow(0 0 8px ${colors.stroke})`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl font-black text-white tabular-nums"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-sm text-slate-400 font-medium">out of 100</span>
        </div>
      </div>

      {/* Strength Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2"
      >
        <div
          className="h-2 w-2 rounded-full"
          style={{ background: colors.stroke, boxShadow: `0 0 8px ${colors.stroke}` }}
        />
        <span className={`text-lg font-bold ${colors.text}`}>{label}</span>
      </motion.div>

      {/* Score bar breakdown */}
      <div className="w-full max-w-[200px]">
        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: colors.stroke }}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-xs text-slate-500">
          <span>0</span>
          <span>ATS Score</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
