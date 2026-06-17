"use client";

import { motion } from "framer-motion";
import {
  FileText, Hash, Zap, LayoutList, Clock,
  Mail, Phone, Link2, GitBranch, GraduationCap,
  Briefcase, Code, Award, Trophy, AlignLeft,
} from "lucide-react";
import type { ResumeStats, ContactInfo, SectionInfo } from "@/types";

interface StatsCardsProps {
  stats: ResumeStats;
  contact: ContactInfo;
  sections: SectionInfo;
}

export default function StatsCards({ stats, contact, sections }: StatsCardsProps) {
  const mainStats = [
    {
      icon: FileText,
      label: "Total Words",
      value: stats.totalWords.toLocaleString(),
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: Hash,
      label: "Total Characters",
      value: stats.totalCharacters.toLocaleString(),
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Zap,
      label: "Skills Found",
      value: stats.skillsFound.toString(),
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      icon: LayoutList,
      label: "Sections Found",
      value: `${stats.sectionsFound} / 7`,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Clock,
      label: "Reading Time",
      value: `~${stats.estimatedReadingTime} min`,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  const contactChecks = [
    { icon: Mail, label: "Email", has: contact.hasEmail },
    { icon: Phone, label: "Phone", has: contact.hasPhone },
    { icon: Link2, label: "LinkedIn", has: contact.hasLinkedIn },
    { icon: GitBranch, label: "GitHub", has: contact.hasGitHub },
  ];

  const sectionChecks = [
    { icon: AlignLeft, label: "Summary", has: sections.hasSummary },
    { icon: GraduationCap, label: "Education", has: sections.hasEducation },
    { icon: Briefcase, label: "Experience", has: sections.hasExperience },
    { icon: Zap, label: "Skills", has: sections.hasSkills },
    { icon: Code, label: "Projects", has: sections.hasProjects },
    { icon: Award, label: "Certifications", has: sections.hasCertifications },
    { icon: Trophy, label: "Achievements", has: sections.hasAchievements },
  ];

  return (
    <div className="space-y-6">
      {/* Main stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {mainStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center hover:border-slate-700 transition-colors"
          >
            <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact & Section Checks */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Contact */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h4 className="mb-4 text-sm font-semibold text-slate-300">Contact Information</h4>
          <div className="grid grid-cols-2 gap-2.5">
            {contactChecks.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.08 }}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${
                  item.has ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-slate-800/50 border border-slate-700/50"
                }`}
              >
                <item.icon className={`h-4 w-4 ${item.has ? "text-emerald-400" : "text-slate-600"}`} />
                <span className={`text-sm ${item.has ? "text-emerald-300" : "text-slate-500"}`}>{item.label}</span>
                <span className="ml-auto text-xs">{item.has ? "✓" : "✗"}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h4 className="mb-4 text-sm font-semibold text-slate-300">Resume Sections</h4>
          <div className="grid grid-cols-2 gap-2.5">
            {sectionChecks.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.06 }}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  item.has ? "bg-violet-500/10 border border-violet-500/20" : "bg-slate-800/50 border border-slate-700/50"
                }`}
              >
                <item.icon className={`h-4 w-4 ${item.has ? "text-violet-400" : "text-slate-600"}`} />
                <span className={`text-xs ${item.has ? "text-violet-300" : "text-slate-500"}`}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
