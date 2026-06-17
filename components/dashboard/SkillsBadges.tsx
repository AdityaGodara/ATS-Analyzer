"use client";

import { motion } from "framer-motion";
import type { DetectedSkill } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Backend: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Database: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Cloud & DevOps": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Tools: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "AI / ML": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Mobile: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Testing: "bg-red-500/20 text-red-300 border-red-500/30",
};

const CATEGORY_DOT: Record<string, string> = {
  Frontend: "bg-violet-400",
  Backend: "bg-blue-400",
  Database: "bg-emerald-400",
  "Cloud & DevOps": "bg-orange-400",
  Tools: "bg-pink-400",
  "AI / ML": "bg-yellow-400",
  Mobile: "bg-cyan-400",
  Testing: "bg-red-400",
};

interface SkillsBadgesProps {
  skills: DetectedSkill[];
}

export default function SkillsBadges({ skills }: SkillsBadgesProps) {
  // Group by category
  const grouped = skills.reduce<Record<string, DetectedSkill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <p>No technical skills detected. Ensure your resume lists technologies explicitly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {Object.entries(grouped).map(([category, catSkills], groupIdx) => (
        <div key={category}>
          <div className="mb-2.5 flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${CATEGORY_DOT[category] ?? "bg-slate-400"}`} />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {category}
            </h4>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-500">
              {catSkills.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {catSkills.map((skill, idx) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: groupIdx * 0.08 + idx * 0.04, duration: 0.3 }}
                className={`inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium transition-transform hover:scale-105 cursor-default ${CATEGORY_COLORS[category] ?? "bg-slate-800 text-slate-300 border-slate-700"}`}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
