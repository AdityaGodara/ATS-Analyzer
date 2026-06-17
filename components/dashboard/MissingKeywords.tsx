"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info } from "lucide-react";

interface MissingKeywordsProps {
  keywords: string[];
}

const SKILL_REASONS: Record<string, string> = {
  Docker: "Containerization is required by 70%+ of modern job postings",
  AWS: "Cloud skills significantly increase salary potential",
  PostgreSQL: "Relational DBs are essential for production-grade systems",
  TypeScript: "TypeScript is now the industry standard for large codebases",
  Kubernetes: "Container orchestration for scalable microservices",
  GraphQL: "Modern API paradigm replacing REST in many companies",
  Redis: "In-memory caching for high-performance applications",
  "CI/CD": "Automated pipelines are expected at all seniority levels",
  Jest: "Testing is a core engineering discipline",
  Tailwind: "Most popular utility-first CSS framework",
  Django: "High-level Python framework for rapid web development",
  FastAPI: "High-performance Python API framework",
  TensorFlow: "Industry-standard deep learning framework",
  PyTorch: "Leading research and production ML framework",
  "Machine Learning": "AI/ML skills command premium salaries",
};

const DEFAULT_REASON = "Commonly required in modern software development roles";

export default function MissingKeywords({ keywords }: MissingKeywordsProps) {
  if (keywords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
          <Info className="h-6 w-6 text-emerald-400" />
        </div>
        <p className="text-slate-400">
          Great! Your resume covers all key skills in our database.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {keywords.slice(0, 12).map((keyword, idx) => (
        <motion.div
          key={keyword}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.06, duration: 0.3 }}
          className="group flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 hover:border-red-500/40 hover:bg-red-500/10 transition-all"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
          <div className="min-w-0 flex-1">
            <span className="font-medium text-red-300">{keyword}</span>
            <p className="mt-0.5 text-xs text-slate-500">
              {SKILL_REASONS[keyword] ?? DEFAULT_REASON}
            </p>
          </div>
          <span className="flex-shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-400">
            Missing
          </span>
        </motion.div>
      ))}
    </div>
  );
}
