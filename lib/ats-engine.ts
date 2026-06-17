import type {
  ContactInfo,
  SectionInfo,
  DetectedSkill,
  ATSScoreBreakdown,
  Suggestion,
  ResumeStats,
} from "@/types";

// ─── Skill Database ────────────────────────────────────────────────────────────

export const SKILL_DATABASE: Record<string, string[]> = {
  Frontend: [
    "html",
    "css",
    "javascript",
    "typescript",
    "react",
    "next.js",
    "nextjs",
    "tailwind",
    "tailwindcss",
    "redux",
    "vue",
    "angular",
    "svelte",
    "webpack",
    "vite",
    "sass",
    "scss",
    "bootstrap",
    "jquery",
    "graphql",
    "rest",
    "restful",
  ],
  Backend: [
    "node.js",
    "nodejs",
    "express",
    "express.js",
    "python",
    "java",
    "c++",
    "c#",
    "fastapi",
    "django",
    "flask",
    "spring",
    "laravel",
    "php",
    "ruby",
    "rust",
    "go",
    "golang",
    "scala",
    "kotlin",
  ],
  Database: [
    "mongodb",
    "mysql",
    "postgresql",
    "postgres",
    "firebase",
    "redis",
    "sqlite",
    "oracle",
    "dynamodb",
    "cassandra",
    "elasticsearch",
    "supabase",
  ],
  "Cloud & DevOps": [
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "k8s",
    "ci/cd",
    "cicd",
    "github actions",
    "jenkins",
    "terraform",
    "ansible",
    "nginx",
    "linux",
    "bash",
    "shell",
  ],
  Tools: [
    "git",
    "github",
    "gitlab",
    "bitbucket",
    "vercel",
    "netlify",
    "postman",
    "figma",
    "jira",
    "confluence",
    "notion",
    "vscode",
    "intellij",
    "xcode",
  ],
  "AI / ML": [
    "tensorflow",
    "pytorch",
    "openai",
    "gemini",
    "langchain",
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision",
    "scikit-learn",
    "pandas",
    "numpy",
    "matplotlib",
    "hugging face",
    "transformers",
    "rag",
    "vector database",
    "pinecone",
    "chromadb",
  ],
  Mobile: [
    "react native",
    "flutter",
    "swift",
    "android",
    "ios",
    "kotlin",
    "xamarin",
    "ionic",
  ],
  Testing: [
    "jest",
    "mocha",
    "cypress",
    "playwright",
    "selenium",
    "junit",
    "pytest",
    "vitest",
    "testing library",
  ],
};

// Flat list of all skills for "missing" calculations
export const ALL_IMPORTANT_SKILLS = [
  "react",
  "next.js",
  "typescript",
  "node.js",
  "python",
  "docker",
  "aws",
  "postgresql",
  "mongodb",
  "kubernetes",
  "graphql",
  "redis",
  "ci/cd",
  "jest",
  "tailwind",
  "django",
  "fastapi",
  "tensorflow",
  "pytorch",
  "machine learning",
];

// ─── Contact Detection ─────────────────────────────────────────────────────────

export function detectContactInfo(text: string): ContactInfo {
  const lower = text.toLowerCase();
  return {
    hasEmail: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text),
    hasPhone: /(\+?\d[\d\s\-().]{7,}\d)/.test(text),
    hasLinkedIn: lower.includes("linkedin"),
    hasGitHub: lower.includes("github"),
  };
}

// ─── Section Detection ─────────────────────────────────────────────────────────

export function detectSections(text: string): SectionInfo {
  const lower = text.toLowerCase();
  return {
    hasEducation: /\b(education|academic|degree|university|college|bachelor|master|b\.tech|m\.tech|bsc|msc|b\.e|m\.e|cgpa|gpa)\b/.test(lower),
    hasSkills: /\b(skills|technologies|tech stack|proficiency|competencies|tools)\b/.test(lower),
    hasProjects: /\b(projects|portfolio|work|applications|apps|built|developed|created)\b/.test(lower),
    hasExperience: /\b(experience|internship|intern|work history|employment|position|role|job|company|organisation|organization)\b/.test(lower),
    hasCertifications: /\b(certification|certificate|certified|credential|course|udemy|coursera|hackerrank|leetcode|aws certified)\b/.test(lower),
    hasAchievements: /\b(achievement|award|honor|honour|recognition|winner|rank|scholarship|hackathon|competition)\b/.test(lower),
    hasSummary: /\b(summary|objective|profile|about|introduction|overview|headline)\b/.test(lower),
  };
}

// ─── Skills Detection ──────────────────────────────────────────────────────────

export function detectSkills(text: string): DetectedSkill[] {
  const lower = text.toLowerCase();
  const detected: DetectedSkill[] = [];
  const seen = new Set<string>();

  for (const [category, skills] of Object.entries(SKILL_DATABASE)) {
    for (const skill of skills) {
      if (seen.has(skill)) continue;
      // Use word boundary matching where possible
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      if (regex.test(lower)) {
        detected.push({ name: formatSkillName(skill), category });
        seen.add(skill);
      }
    }
  }
  return detected;
}

function formatSkillName(skill: string): string {
  const overrides: Record<string, string> = {
    "node.js": "Node.js",
    "next.js": "Next.js",
    "express.js": "Express.js",
    "react native": "React Native",
    "machine learning": "Machine Learning",
    "deep learning": "Deep Learning",
    "computer vision": "Computer Vision",
    "github actions": "GitHub Actions",
    "vector database": "Vector Database",
    tailwind: "Tailwind CSS",
    tailwindcss: "Tailwind CSS",
    postgresql: "PostgreSQL",
    mongodb: "MongoDB",
    tensorflow: "TensorFlow",
    pytorch: "PyTorch",
    langchain: "LangChain",
    "hugging face": "Hugging Face",
    "scikit-learn": "Scikit-learn",
    "ci/cd": "CI/CD",
    "testing library": "Testing Library",
  };
  return overrides[skill.toLowerCase()] ?? skill.charAt(0).toUpperCase() + skill.slice(1);
}

// ─── Missing Keywords ──────────────────────────────────────────────────────────

export function findMissingKeywords(detected: DetectedSkill[]): string[] {
  const detectedNames = new Set(detected.map((s) => s.name.toLowerCase()));
  return ALL_IMPORTANT_SKILLS.filter((skill) => !detectedNames.has(skill.toLowerCase())).map(
    (s) => formatSkillName(s)
  );
}

// ─── Resume Statistics ─────────────────────────────────────────────────────────

export function calculateStats(
  text: string,
  detectedSkills: DetectedSkill[],
  sections: SectionInfo
): ResumeStats {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sectionCount = Object.values(sections).filter(Boolean).length;
  return {
    totalWords: words.length,
    totalCharacters: text.length,
    skillsFound: detectedSkills.length,
    sectionsFound: sectionCount,
    estimatedReadingTime: Math.ceil(words.length / 200),
  };
}

// ─── ATS Score Calculation ─────────────────────────────────────────────────────

export function calculateATSScore(
  contact: ContactInfo,
  sections: SectionInfo,
  skills: DetectedSkill[],
  text: string
): ATSScoreBreakdown {
  // Contact Info (max 20 pts)
  let contactScore = 0;
  if (contact.hasEmail) contactScore += 6;
  if (contact.hasPhone) contactScore += 5;
  if (contact.hasLinkedIn) contactScore += 5;
  if (contact.hasGitHub) contactScore += 4;

  // Sections (max 30 pts)
  let sectionScore = 0;
  if (sections.hasEducation) sectionScore += 5;
  if (sections.hasSkills) sectionScore += 6;
  if (sections.hasProjects) sectionScore += 5;
  if (sections.hasExperience) sectionScore += 6;
  if (sections.hasCertifications) sectionScore += 4;
  if (sections.hasAchievements) sectionScore += 2;
  if (sections.hasSummary) sectionScore += 2;

  // Skills (max 35 pts)
  const skillPts = Math.min(skills.length * 1.5, 35);
  const skillsScore = Math.round(skillPts);

  // Formatting / Length (max 15 pts)
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  let formattingScore = 0;
  if (wordCount >= 200) formattingScore += 5;
  if (wordCount >= 400) formattingScore += 4;
  if (wordCount <= 1500) formattingScore += 3;
  if (sections.hasSummary) formattingScore += 3;

  const total = Math.min(100, contactScore + sectionScore + skillsScore + formattingScore);

  return {
    contactScore: Math.min(20, contactScore),
    sectionScore: Math.min(30, sectionScore),
    skillsScore: Math.min(35, skillsScore),
    formattingScore: Math.min(15, formattingScore),
    total,
  };
}

// ─── Strength Label ────────────────────────────────────────────────────────────

export function getStrengthLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Average";
  return "Needs Improvement";
}

// ─── Suggestions Generator ────────────────────────────────────────────────────

export function generateSuggestions(
  contact: ContactInfo,
  sections: SectionInfo,
  skills: DetectedSkill[],
  text: string
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (!contact.hasLinkedIn)
    suggestions.push({
      id: "linkedin",
      title: "Add LinkedIn Profile",
      description: "Recruiters use LinkedIn to verify credentials. A missing LinkedIn URL lowers trust.",
      priority: "high",
      icon: "Linkedin",
    });

  if (!contact.hasGitHub)
    suggestions.push({
      id: "github",
      title: "Add GitHub Profile",
      description: "A GitHub link showcases your code. Most tech recruiters expect this.",
      priority: "high",
      icon: "Github",
    });

  if (!contact.hasEmail)
    suggestions.push({
      id: "email",
      title: "Add Email Address",
      description: "Email is critical for recruiters to contact you.",
      priority: "high",
      icon: "Mail",
    });

  if (!contact.hasPhone)
    suggestions.push({
      id: "phone",
      title: "Add Phone Number",
      description: "Many recruiters prefer calling candidates directly.",
      priority: "high",
      icon: "Phone",
    });

  if (!sections.hasSummary)
    suggestions.push({
      id: "summary",
      title: "Add a Professional Summary",
      description: "A 2–4 line summary at the top grabs recruiter attention and passes ATS filters.",
      priority: "high",
      icon: "FileText",
    });

  if (!sections.hasExperience)
    suggestions.push({
      id: "experience",
      title: "Add Work / Internship Experience",
      description: "Even internship or freelance experience greatly improves shortlisting rates.",
      priority: "high",
      icon: "Briefcase",
    });

  if (!sections.hasProjects)
    suggestions.push({
      id: "projects",
      title: "Add Projects Section",
      description: "Projects demonstrate practical skills. Include GitHub links and tech stacks.",
      priority: "medium",
      icon: "Code",
    });

  if (!sections.hasCertifications)
    suggestions.push({
      id: "certs",
      title: "Add Certifications",
      description: "Industry certifications (AWS, Google, etc.) boost credibility significantly.",
      priority: "medium",
      icon: "Award",
    });

  if (!sections.hasAchievements)
    suggestions.push({
      id: "achievements",
      title: "Add Achievements / Awards",
      description: "Quantifiable achievements (e.g., '30% performance improvement') stand out.",
      priority: "medium",
      icon: "Trophy",
    });

  if (skills.length < 6)
    suggestions.push({
      id: "skills",
      title: "Expand Your Skills Section",
      description: "List more technical skills. ATS systems keyword-match against job descriptions.",
      priority: "high",
      icon: "Zap",
    });

  if (wordCount < 300)
    suggestions.push({
      id: "length",
      title: "Increase Resume Length",
      description: "Your resume appears short. Aim for 400–800 words to provide enough context.",
      priority: "medium",
      icon: "AlignLeft",
    });

  if (!sections.hasEducation)
    suggestions.push({
      id: "education",
      title: "Add Education Details",
      description: "Include your degree, institution, graduation year, and GPA if above 7.5.",
      priority: "medium",
      icon: "GraduationCap",
    });

  suggestions.push({
    id: "metrics",
    title: "Quantify Your Achievements",
    description: "Replace vague statements with metrics: 'Built API handling 10K req/s'.",
    priority: "low",
    icon: "BarChart2",
  });

  suggestions.push({
    id: "action-verbs",
    title: "Use Strong Action Verbs",
    description: "Start bullet points with: Built, Designed, Implemented, Optimized, Led, etc.",
    priority: "low",
    icon: "Pen",
  });

  return suggestions;
}
