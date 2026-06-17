export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface DetectedSkill {
  name: string;
  category: string;
}

export interface ContactInfo {
  hasEmail: boolean;
  hasPhone: boolean;
  hasLinkedIn: boolean;
  hasGitHub: boolean;
}

export interface SectionInfo {
  hasEducation: boolean;
  hasSkills: boolean;
  hasProjects: boolean;
  hasExperience: boolean;
  hasCertifications: boolean;
  hasAchievements: boolean;
  hasSummary: boolean;
}

export interface ResumeStats {
  totalWords: number;
  totalCharacters: number;
  skillsFound: number;
  sectionsFound: number;
  estimatedReadingTime: number; // in minutes
}

export type Priority = "high" | "medium" | "low";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  icon: string;
}

export interface CareerRole {
  title: string;
  matchPercentage: number;
  whyItMatches: string;
  keyStrengths: string[];
  skillsToLearn: string[];
  salaryRange: string;
  category: string;
}

export interface CareerVerdict {
  employabilityScore: number;
  primaryRole: string;
  secondaryRole: string;
  recommendedNextSkill: string;
  hiringReadiness: string;
}

export interface ATSScoreBreakdown {
  contactScore: number;
  sectionScore: number;
  skillsScore: number;
  formattingScore: number;
  total: number;
}

export interface ResumeAnalysis {
  rawText: string;
  atsScore: number;
  scoreBreakdown: ATSScoreBreakdown;
  strengthLabel: string;
  contactInfo: ContactInfo;
  sections: SectionInfo;
  detectedSkills: DetectedSkill[];
  missingKeywords: string[];
  stats: ResumeStats;
  suggestions: Suggestion[];
  careerMatches: CareerRole[];
  topRoles: CareerRole[];
  careerVerdict: CareerVerdict;
}
