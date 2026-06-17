import type { ResumeAnalysis } from "@/types";
import jsPDF from "jspdf";

export function generateATSReport(analysis: ResumeAnalysis): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const addText = (
    text: string,
    size: number,
    style: "normal" | "bold" = "normal",
    color: [number, number, number] = [30, 30, 30],
    align: "left" | "center" | "right" = "left"
  ) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.setTextColor(...color);
    doc.text(text, align === "center" ? pageWidth / 2 : align === "right" ? pageWidth - margin : margin, y, {
      align,
      maxWidth: contentWidth,
    });
  };

  const addLine = (thickness = 0.3) => {
    doc.setLineWidth(thickness);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  };

  const checkNewPage = (needed = 10) => {
    if (y + needed > 280) {
      doc.addPage();
      y = 20;
    }
  };

  // ── Header ──────────────────────────────────────────────────────────────────
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("ATS Hero", margin, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text("Resume ATS Analysis Report", margin, 28);

  const now = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  doc.text(`Generated: ${now}`, pageWidth - margin, 28, { align: "right" });

  y = 52;

  // ── ATS Score ───────────────────────────────────────────────────────────────
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 28, 3, 3, "F");

  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(99, 102, 241);
  doc.text(`${analysis.atsScore}`, margin + 10, y + 18);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("/ 100  ATS Score", margin + 28, y + 18);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  const strengthColor: [number, number, number] =
    analysis.atsScore >= 90 ? [22, 163, 74] :
    analysis.atsScore >= 75 ? [37, 99, 235] :
    analysis.atsScore >= 60 ? [234, 179, 8] : [239, 68, 68];
  doc.setTextColor(...strengthColor);
  doc.text(analysis.strengthLabel, pageWidth - margin - 5, y + 18, { align: "right" });
  y += 36;

  // ── Score Breakdown ──────────────────────────────────────────────────────────
  checkNewPage(40);
  addText("Score Breakdown", 13, "bold", [15, 23, 42]);
  y += 6;
  addLine();

  const breakdowns = [
    { label: "Contact Information", score: analysis.scoreBreakdown.contactScore, max: 20 },
    { label: "Resume Sections", score: analysis.scoreBreakdown.sectionScore, max: 30 },
    { label: "Technical Skills", score: analysis.scoreBreakdown.skillsScore, max: 35 },
    { label: "Formatting & Length", score: analysis.scoreBreakdown.formattingScore, max: 15 },
  ];

  for (const item of breakdowns) {
    checkNewPage(8);
    addText(`${item.label}`, 10, "normal", [60, 60, 60]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(99, 102, 241);
    doc.text(`${item.score}/${item.max}`, pageWidth - margin, y - 1, { align: "right" });
    y += 6;
  }
  y += 2;

  // ── Resume Statistics ────────────────────────────────────────────────────────
  checkNewPage(30);
  addText("Resume Statistics", 13, "bold", [15, 23, 42]);
  y += 6;
  addLine();

  const stats = [
    ["Total Words", String(analysis.stats.totalWords)],
    ["Total Characters", String(analysis.stats.totalCharacters)],
    ["Skills Detected", String(analysis.stats.skillsFound)],
    ["Sections Found", String(analysis.stats.sectionsFound)],
    ["Reading Time", `~${analysis.stats.estimatedReadingTime} min`],
  ];

  for (const [label, value] of stats) {
    checkNewPage(7);
    addText(`• ${label}:`, 10, "normal", [60, 60, 60]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(value, pageWidth - margin, y - 1, { align: "right" });
    y += 6;
  }
  y += 2;

  // ── Detected Skills ──────────────────────────────────────────────────────────
  checkNewPage(20);
  addText("Detected Skills", 13, "bold", [15, 23, 42]);
  y += 6;
  addLine();

  const skillsByCategory = analysis.detectedSkills.reduce<Record<string, string[]>>(
    (acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s.name);
      return acc;
    },
    {}
  );

  for (const [cat, skills] of Object.entries(skillsByCategory)) {
    checkNewPage(10);
    addText(`${cat}:`, 10, "bold", [99, 102, 241]);
    y += 5;
    const skillLine = skills.join(" · ");
    const lines = doc.splitTextToSize(skillLine, contentWidth);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 2;
  }

  // ── Missing Keywords ─────────────────────────────────────────────────────────
  checkNewPage(20);
  y += 2;
  addText("Missing Keywords", 13, "bold", [15, 23, 42]);
  y += 6;
  addLine();

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(239, 68, 68);
  for (const keyword of analysis.missingKeywords.slice(0, 10)) {
    checkNewPage(7);
    doc.text(`✗ ${keyword}`, margin, y);
    y += 6;
  }
  y += 2;

  // ── Improvement Suggestions ──────────────────────────────────────────────────
  checkNewPage(20);
  addText("Improvement Suggestions", 13, "bold", [15, 23, 42]);
  y += 6;
  addLine();

  for (const suggestion of analysis.suggestions.slice(0, 8)) {
    checkNewPage(14);
    const priorityColor: [number, number, number] =
      suggestion.priority === "high" ? [239, 68, 68] :
      suggestion.priority === "medium" ? [234, 179, 8] : [34, 197, 94];

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...priorityColor);
    doc.text(`[${suggestion.priority.toUpperCase()}]`, margin, y);
    doc.setTextColor(30, 30, 30);
    doc.text(suggestion.title, margin + 20, y);
    y += 5;

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const descLines = doc.splitTextToSize(suggestion.description, contentWidth - 5);
    doc.text(descLines, margin + 3, y);
    y += descLines.length * 4.5 + 3;
  }

  // ── Career Matches ───────────────────────────────────────────────────────────
  doc.addPage();
  y = 20;

  addText("Career Match Analysis", 13, "bold", [15, 23, 42]);
  y += 6;
  addLine();

  for (const role of analysis.careerMatches.slice(0, 7)) {
    checkNewPage(12);
    addText(`${role.title}`, 11, "bold", [30, 30, 30]);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(99, 102, 241);
    doc.text(`${role.matchPercentage}%`, pageWidth - margin, y - 2, { align: "right" });
    y += 5;

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const lines = doc.splitTextToSize(role.whyItMatches, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 4.5 + 4;
  }

  // ── Top Roles ────────────────────────────────────────────────────────────────
  checkNewPage(30);
  addText("Top 5 Recommended Roles", 13, "bold", [15, 23, 42]);
  y += 6;
  addLine();

  for (const role of analysis.topRoles) {
    checkNewPage(30);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, contentWidth, 25, 2, 2, "F");

    addText(role.title, 11, "bold", [15, 23, 42]);
    y += 5;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(99, 102, 241);
    doc.text(`Match: ${role.matchPercentage}%  |  Salary: ${role.salaryRange}`, margin + 2, y);
    y += 5;

    const lines = doc.splitTextToSize(role.whyItMatches, contentWidth - 4);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(8.5);
    doc.text(lines.slice(0, 2), margin + 2, y);
    y += lines.slice(0, 2).length * 4.5 + 5;
  }

  // ── Final Career Verdict ─────────────────────────────────────────────────────
  checkNewPage(40);
  y += 2;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, 44, 4, 4, "F");

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Final Career Verdict", margin + 6, y + 10);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  const verdict = analysis.careerVerdict;
  doc.text(`Employability Score: ${verdict.employabilityScore}/100`, margin + 6, y + 18);
  doc.text(`Primary Role: ${verdict.primaryRole}`, margin + 6, y + 25);
  doc.text(`Secondary Role: ${verdict.secondaryRole}`, margin + 6, y + 32);
  doc.text(`Next Skill to Learn: ${verdict.recommendedNextSkill}`, margin + 6, y + 39);

  doc.setTextColor(99, 102, 241);
  doc.setFont("helvetica", "bold");
  doc.text(verdict.hiringReadiness, pageWidth - margin - 6, y + 39, { align: "right" });
  y += 52;

  // ── Footer ───────────────────────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generated by ATS Hero · atshero.vercel.app · Page ${i} of ${totalPages}`,
      pageWidth / 2,
      290,
      { align: "center" }
    );
  }

  doc.save("ATS-Hero-Report.pdf");
}
