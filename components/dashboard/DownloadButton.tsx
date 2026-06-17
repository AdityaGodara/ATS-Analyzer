"use client";

import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { useState } from "react";
import type { ResumeAnalysis } from "@/types";

interface DownloadButtonProps {
  analysis: ResumeAnalysis;
}

export default function DownloadButton({ analysis }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const { generateATSReport } = await import("@/lib/report-generator");
      generateATSReport(analysis);
    } catch (err) {
      console.error("Failed to generate report:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isGenerating}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-violet-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400/0 via-white/10 to-indigo-400/0 opacity-0 hover:opacity-100 transition-opacity" />
      {isGenerating ? (
        <>
          <Sparkles className="h-4.5 w-4.5 animate-spin" />
          Generating Report...
        </>
      ) : (
        <>
          <Download className="h-4.5 w-4.5" />
          Download ATS Report
        </>
      )}
    </motion.button>
  );
}
