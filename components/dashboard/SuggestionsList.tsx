"use client";

import { motion } from "framer-motion";
import {
  Linkedin, Github, Mail, Phone, FileText, Briefcase, Code,
  Award, Trophy, Zap, AlignLeft, BarChart2, GraduationCap, Pen,
} from "lucide-react";
import type { Suggestion } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Linkedin, Github, Mail, Phone, FileText, Briefcase, Code,
  Award, Trophy, Zap, AlignLeft, BarChart2, GraduationCap, Pen,
};

const PRIORITY_STYLES = {
  high: {
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
    border: "border-red-500/20 hover:border-red-500/40",
    bg: "hover:bg-red-500/5",
  },
  medium: {
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    border: "border-amber-500/20 hover:border-amber-500/40",
    bg: "hover:bg-amber-500/5",
  },
  low: {
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    bg: "hover:bg-emerald-500/5",
  },
};

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  const sorted = [...suggestions].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-3">
      {sorted.map((suggestion, idx) => {
        const styles = PRIORITY_STYLES[suggestion.priority];
        const IconComp = ICON_MAP[suggestion.icon] ?? Zap;

        return (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.35 }}
            className={`flex items-start gap-4 rounded-xl border bg-slate-900/40 p-4 transition-all cursor-default ${styles.border} ${styles.bg}`}
          >
            <div className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border ${styles.badge}`}>
              <IconComp className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-white">{suggestion.title}</span>
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${styles.badge}`}>
                  {suggestion.priority}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{suggestion.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
