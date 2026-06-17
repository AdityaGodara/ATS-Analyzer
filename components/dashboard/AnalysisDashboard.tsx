"use client";

import { motion } from "framer-motion";
import {
  Zap, Brain, BarChart3, AlertTriangle, Lightbulb,
  Target, IndianRupee, Trophy, RefreshCw,
} from "lucide-react";
import type { ResumeAnalysis } from "@/types";
import ScoreCircle from "./ScoreCircle";
import SkillsBadges from "./SkillsBadges";
import MissingKeywords from "./MissingKeywords";
import StatsCards from "./StatsCards";
import SuggestionsList from "./SuggestionsList";
import CareerMatchChart from "./CareerMatchChart";
import RoleCards from "./RoleCards";
import SalaryInsights from "./SalaryInsights";
import CareerVerdictCard from "./CareerVerdictCard";
import DownloadButton from "./DownloadButton";

interface AnalysisDashboardProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
          <Icon className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.section>
  );
}

export default function AnalysisDashboard({ analysis, onReset }: AnalysisDashboardProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-4"
      >
        <div>
          <h1 className="text-xl font-bold text-white">Analysis Complete</h1>
          <p className="text-sm text-slate-400">
            Scroll down to explore your full career report
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DownloadButton analysis={analysis} />
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-400 hover:border-slate-600 hover:text-white transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            New Analysis
          </button>
        </div>
      </motion.div>

      {/* ATS Score */}
      <Section id="ats-score" icon={Zap} title="ATS Score" subtitle="Overall resume compatibility with Applicant Tracking Systems">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <ScoreCircle score={analysis.atsScore} label={analysis.strengthLabel} />
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Score Breakdown</h3>
            {[
              { label: "Contact Information", score: analysis.scoreBreakdown.contactScore, max: 20, color: "bg-violet-500" },
              { label: "Resume Sections", score: analysis.scoreBreakdown.sectionScore, max: 30, color: "bg-blue-500" },
              { label: "Technical Skills", score: analysis.scoreBreakdown.skillsScore, max: 35, color: "bg-emerald-500" },
              { label: "Formatting & Length", score: analysis.scoreBreakdown.formattingScore, max: 15, color: "bg-orange-500" },
            ].map((item, idx) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-semibold text-white">{item.score}/{item.max}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    className={`h-full rounded-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.score / item.max) * 100}%` }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.9, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Statistics */}
      <Section
        id="statistics"
        icon={BarChart3}
        title="Resume Statistics"
        subtitle="Quantitative analysis of your resume content"
      >
        <StatsCards
          stats={analysis.stats}
          contact={analysis.contactInfo}
          sections={analysis.sections}
        />
      </Section>

      {/* Skills Detected */}
      <Section
        id="skills"
        icon={Brain}
        title={`Skills Detected (${analysis.detectedSkills.length})`}
        subtitle="Technical skills found in your resume, grouped by category"
      >
        <SkillsBadges skills={analysis.detectedSkills} />
      </Section>

      {/* Missing Keywords */}
      <Section
        id="missing"
        icon={AlertTriangle}
        title="Missing Keywords"
        subtitle="High-value skills not detected in your resume"
      >
        <MissingKeywords keywords={analysis.missingKeywords} />
      </Section>

      {/* Suggestions */}
      <Section
        id="suggestions"
        icon={Lightbulb}
        title="Improvement Suggestions"
        subtitle="Actionable recommendations to improve your resume score"
      >
        <SuggestionsList suggestions={analysis.suggestions} />
      </Section>

      {/* Career Match Chart */}
      <Section
        id="career-chart"
        icon={Target}
        title="Career Match Analysis"
        subtitle="How well your profile matches each career path"
      >
        <CareerMatchChart matches={analysis.careerMatches} />
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {analysis.careerMatches.slice(0, 4).map((role) => (
            <div key={role.title} className="rounded-lg bg-slate-800/50 p-3 text-center">
              <p className="text-xs text-slate-500 truncate">{role.title}</p>
              <p className="text-lg font-bold text-violet-400">{role.matchPercentage}%</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Top 5 Roles */}
      <Section
        id="top-roles"
        icon={Target}
        title="Top 5 Recommended Roles"
        subtitle="Best career paths based on your skill profile"
      >
        <RoleCards roles={analysis.topRoles} />
      </Section>

      {/* Salary Insights */}
      <Section
        id="salary"
        icon={IndianRupee}
        title="Salary Insights (India)"
        subtitle="Fresher salary ranges for your matched roles"
      >
        <SalaryInsights roles={analysis.careerMatches} />
      </Section>

      {/* Career Verdict */}
      <Section
        id="verdict"
        icon={Trophy}
        title="Final Career Verdict"
        subtitle="Your overall employability assessment"
      >
        <CareerVerdictCard verdict={analysis.careerVerdict} />
      </Section>

      {/* Bottom download */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-4 py-4"
      >
        <DownloadButton analysis={analysis} />
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-400 hover:border-slate-600 hover:text-white transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          Analyze Another Resume
        </button>
      </motion.div>
    </div>
  );
}
