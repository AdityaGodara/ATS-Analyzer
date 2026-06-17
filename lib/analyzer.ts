import type { ResumeAnalysis } from "@/types";
import {
  detectContactInfo,
  detectSections,
  detectSkills,
  findMissingKeywords,
  calculateStats,
  calculateATSScore,
  getStrengthLabel,
  generateSuggestions,
} from "@/lib/ats-engine";
import { matchCareers, generateCareerVerdict } from "@/lib/career-matcher";

export function analyzeResume(rawText: string): ResumeAnalysis {
  const contact = detectContactInfo(rawText);
  const sections = detectSections(rawText);
  const detectedSkills = detectSkills(rawText);
  const missingKeywords = findMissingKeywords(detectedSkills);
  const stats = calculateStats(rawText, detectedSkills, sections);
  const scoreBreakdown = calculateATSScore(contact, sections, detectedSkills, rawText);
  const atsScore = scoreBreakdown.total;
  const strengthLabel = getStrengthLabel(atsScore);
  const suggestions = generateSuggestions(contact, sections, detectedSkills, rawText);
  const careerMatches = matchCareers(detectedSkills);
  const topRoles = careerMatches.slice(0, 5);
  const careerVerdict = generateCareerVerdict(careerMatches, atsScore, detectedSkills);

  return {
    rawText,
    atsScore,
    scoreBreakdown,
    strengthLabel,
    contactInfo: contact,
    sections,
    detectedSkills,
    missingKeywords,
    stats,
    suggestions,
    careerMatches,
    topRoles,
    careerVerdict,
  };
}
