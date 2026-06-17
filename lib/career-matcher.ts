import type { DetectedSkill, CareerRole, CareerVerdict } from "@/types";

// ─── Role Definitions ──────────────────────────────────────────────────────────

interface RoleDefinition {
  title: string;
  category: string;
  coreSkills: string[];
  bonusSkills: string[];
  salaryRange: string;
  skillsToLearn: string[];
}

const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    title: "Frontend Developer",
    category: "Web Development",
    coreSkills: ["react", "javascript", "html", "css", "typescript"],
    bonusSkills: ["next.js", "tailwind", "redux", "figma", "vite"],
    salaryRange: "₹4–8 LPA",
    skillsToLearn: ["TypeScript", "Testing (Jest/Cypress)", "Next.js Advanced", "GraphQL", "Web Performance"],
  },
  {
    title: "React Developer",
    category: "Web Development",
    coreSkills: ["react", "javascript", "html", "css"],
    bonusSkills: ["typescript", "redux", "next.js", "graphql", "tailwind"],
    salaryRange: "₹4–9 LPA",
    skillsToLearn: ["TypeScript", "React Query", "Zustand", "Testing Library", "Storybook"],
  },
  {
    title: "Full Stack Developer",
    category: "Web Development",
    coreSkills: ["react", "node.js", "javascript", "mongodb", "html"],
    bonusSkills: ["typescript", "postgresql", "express", "docker", "next.js"],
    salaryRange: "₹5–10 LPA",
    skillsToLearn: ["Docker", "PostgreSQL", "AWS", "Redis", "Microservices"],
  },
  {
    title: "Backend Developer",
    category: "Web Development",
    coreSkills: ["node.js", "python", "java", "express"],
    bonusSkills: ["postgresql", "mongodb", "redis", "docker", "rest"],
    salaryRange: "₹5–9 LPA",
    skillsToLearn: ["Microservices", "Kafka", "Redis Caching", "API Security", "System Design"],
  },
  {
    title: "Software Engineer",
    category: "Engineering",
    coreSkills: ["javascript", "python", "java", "c++", "typescript"],
    bonusSkills: ["git", "docker", "aws", "postgresql", "rest"],
    salaryRange: "₹5–12 LPA",
    skillsToLearn: ["System Design", "Data Structures & Algorithms", "Cloud (AWS/GCP)", "Testing", "CI/CD"],
  },
  {
    title: "AI Engineer",
    category: "Artificial Intelligence",
    coreSkills: ["python", "machine learning", "tensorflow", "pytorch"],
    bonusSkills: ["langchain", "openai", "gemini", "deep learning", "nlp"],
    salaryRange: "₹8–15 LPA",
    skillsToLearn: ["LangChain", "Vector Databases", "MLOps", "RAG", "Fine-tuning LLMs"],
  },
  {
    title: "ML Engineer",
    category: "Artificial Intelligence",
    coreSkills: ["python", "machine learning", "tensorflow", "scikit-learn"],
    bonusSkills: ["pytorch", "pandas", "numpy", "docker", "mlops"],
    salaryRange: "₹7–14 LPA",
    skillsToLearn: ["MLOps", "Feature Engineering", "Model Deployment", "Kubeflow", "Data Pipelines"],
  },
  {
    title: "Data Scientist",
    category: "Data & Analytics",
    coreSkills: ["python", "machine learning", "pandas", "numpy"],
    bonusSkills: ["tensorflow", "scikit-learn", "matplotlib", "sql", "postgresql"],
    salaryRange: "₹6–12 LPA",
    skillsToLearn: ["Statistical Analysis", "A/B Testing", "Tableau/Power BI", "Spark", "SQL Advanced"],
  },
  {
    title: "Data Analyst",
    category: "Data & Analytics",
    coreSkills: ["python", "sql", "pandas", "mysql"],
    bonusSkills: ["postgresql", "matplotlib", "numpy", "excel", "powerbi"],
    salaryRange: "₹4–8 LPA",
    skillsToLearn: ["Power BI / Tableau", "Advanced SQL", "Python Pandas", "Statistics", "Data Storytelling"],
  },
  {
    title: "DevOps Engineer",
    category: "Infrastructure",
    coreSkills: ["docker", "kubernetes", "aws", "linux", "ci/cd"],
    bonusSkills: ["terraform", "ansible", "jenkins", "github actions", "bash"],
    salaryRange: "₹6–12 LPA",
    skillsToLearn: ["Kubernetes Advanced", "Terraform", "Observability (Prometheus/Grafana)", "FinOps", "Site Reliability Engineering"],
  },
  {
    title: "Cloud Engineer",
    category: "Infrastructure",
    coreSkills: ["aws", "azure", "gcp", "docker", "terraform"],
    bonusSkills: ["kubernetes", "linux", "ci/cd", "networking", "security"],
    salaryRange: "₹7–13 LPA",
    skillsToLearn: ["AWS Solutions Architect", "Multi-cloud", "Cost Optimization", "Security (IAM/VPC)", "Serverless"],
  },
  {
    title: "Mobile Developer",
    category: "Mobile",
    coreSkills: ["react native", "flutter", "swift", "kotlin", "android"],
    bonusSkills: ["ios", "typescript", "firebase", "redux", "graphql"],
    salaryRange: "₹5–10 LPA",
    skillsToLearn: ["State Management", "Native APIs", "App Store Deployment", "Performance Profiling", "Offline-first Architecture"],
  },
  {
    title: "UI/UX Engineer",
    category: "Design & Dev",
    coreSkills: ["figma", "css", "html", "javascript", "react"],
    bonusSkills: ["tailwind", "sass", "framer motion", "typescript", "storybook"],
    salaryRange: "₹4–9 LPA",
    skillsToLearn: ["Design Systems", "Accessibility (a11y)", "Animation Libraries", "User Research", "Prototyping"],
  },
];

// ─── Skill name normalizer ─────────────────────────────────────────────────────

function normalizeSkillName(skill: string): string {
  return skill.toLowerCase().replace(/[\s.]+/g, "");
}

// ─── Match Percentage Calculator ──────────────────────────────────────────────

function calculateMatchPercentage(detected: DetectedSkill[], role: RoleDefinition): number {
  const detectedNormalized = new Set(detected.map((s) => normalizeSkillName(s.name)));

  let coreMatched = 0;
  for (const s of role.coreSkills) {
    if (detectedNormalized.has(normalizeSkillName(s))) coreMatched++;
  }

  let bonusMatched = 0;
  for (const s of role.bonusSkills) {
    if (detectedNormalized.has(normalizeSkillName(s))) bonusMatched++;
  }

  const coreWeight = 0.7;
  const bonusWeight = 0.3;

  const coreScore = role.coreSkills.length > 0 ? (coreMatched / role.coreSkills.length) * 100 * coreWeight : 0;
  const bonusScore = role.bonusSkills.length > 0 ? (bonusMatched / role.bonusSkills.length) * 100 * bonusWeight : 0;

  const raw = coreScore + bonusScore;
  // Normalize so even partial matches show useful percentages
  const normalized = Math.min(98, Math.round(raw + (detected.length >= 5 ? 5 : 0)));
  return Math.max(5, normalized);
}

// ─── Why It Matches Generator ─────────────────────────────────────────────────

function generateWhyItMatches(detected: DetectedSkill[], role: RoleDefinition, matchPct: number): string {
  const detectedNormalized = new Set(detected.map((s) => normalizeSkillName(s.name)));
  const matchedCore = role.coreSkills.filter((s) => detectedNormalized.has(normalizeSkillName(s)));
  const matchedBonus = role.bonusSkills.filter((s) => detectedNormalized.has(normalizeSkillName(s)));

  const allMatched = [...matchedCore, ...matchedBonus].map(formatRoleSkillName);

  if (allMatched.length === 0) {
    return `Your resume shows potential, but key ${role.title} skills are not yet detected. Focus on the recommended learning path.`;
  }

  if (matchPct >= 75) {
    return `Strong match! Your resume demonstrates proficiency in ${allMatched.slice(0, 4).join(", ")} — core requirements for this role.`;
  } else if (matchPct >= 50) {
    return `Good foundation with ${allMatched.slice(0, 3).join(", ")}. Adding a few more skills will make you very competitive.`;
  } else {
    return `Some relevant skills detected (${allMatched.slice(0, 2).join(", ")}). Focused upskilling will open this career path.`;
  }
}

function formatRoleSkillName(skill: string): string {
  const caps: Record<string, string> = {
    "react": "React",
    "node.js": "Node.js",
    "javascript": "JavaScript",
    "typescript": "TypeScript",
    "python": "Python",
    "docker": "Docker",
    "aws": "AWS",
    "mongodb": "MongoDB",
    "postgresql": "PostgreSQL",
    "kubernetes": "Kubernetes",
    "tensorflow": "TensorFlow",
    "pytorch": "PyTorch",
    "langchain": "LangChain",
    "next.js": "Next.js",
    "tailwind": "Tailwind CSS",
    "express": "Express.js",
    "figma": "Figma",
    "flutter": "Flutter",
    "machine learning": "Machine Learning",
    "ci/cd": "CI/CD",
    "linux": "Linux",
    "git": "Git",
    "github": "GitHub",
    "mysql": "MySQL",
    "redis": "Redis",
    "graphql": "GraphQL",
    "pandas": "Pandas",
    "numpy": "NumPy",
    "scikit-learn": "Scikit-learn",
    "java": "Java",
    "kotlin": "Kotlin",
    "swift": "Swift",
    "django": "Django",
    "fastapi": "FastAPI",
    "flutter": "Flutter",
    "react native": "React Native",
    "android": "Android",
    "ios": "iOS",
  };
  return caps[skill.toLowerCase()] ?? skill.charAt(0).toUpperCase() + skill.slice(1);
}

// ─── Key Strengths ─────────────────────────────────────────────────────────────

function extractKeyStrengths(detected: DetectedSkill[], role: RoleDefinition): string[] {
  const detectedNormalized = new Set(detected.map((s) => normalizeSkillName(s.name)));
  const strengths: string[] = [];

  for (const s of role.coreSkills) {
    if (detectedNormalized.has(normalizeSkillName(s))) {
      strengths.push(formatRoleSkillName(s));
    }
  }
  for (const s of role.bonusSkills) {
    if (detectedNormalized.has(normalizeSkillName(s)) && strengths.length < 5) {
      strengths.push(formatRoleSkillName(s));
    }
  }
  return strengths.slice(0, 5);
}

// ─── Main Career Matcher ───────────────────────────────────────────────────────

export function matchCareers(detected: DetectedSkill[]): CareerRole[] {
  const matches: CareerRole[] = ROLE_DEFINITIONS.map((role) => {
    const matchPercentage = calculateMatchPercentage(detected, role);
    return {
      title: role.title,
      category: role.category,
      matchPercentage,
      whyItMatches: generateWhyItMatches(detected, role, matchPercentage),
      keyStrengths: extractKeyStrengths(detected, role),
      skillsToLearn: role.skillsToLearn,
      salaryRange: role.salaryRange,
    };
  });

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

// ─── Career Verdict ────────────────────────────────────────────────────────────

export function generateCareerVerdict(
  matches: CareerRole[],
  atsScore: number,
  detected: DetectedSkill[]
): CareerVerdict {
  const [primary, secondary] = matches;
  const missingInPrimary = ROLE_DEFINITIONS.find((r) => r.title === primary?.title);
  const detectedNormalized = new Set(detected.map((s) => normalizeSkillName(s.name)));

  const nextSkill =
    missingInPrimary?.skillsToLearn.find(
      (s) => !detectedNormalized.has(normalizeSkillName(s))
    ) ?? "Cloud Computing";

  let hiringReadiness: string;
  if (atsScore >= 80) hiringReadiness = "Ready For Mid-Level Applications";
  else if (atsScore >= 65) hiringReadiness = "Ready For Entry-Level Applications";
  else if (atsScore >= 50) hiringReadiness = "Near Ready – Minor Improvements Needed";
  else hiringReadiness = "Resume Needs Significant Improvement";

  return {
    employabilityScore: atsScore,
    primaryRole: primary?.title ?? "Software Engineer",
    secondaryRole: secondary?.title ?? "Backend Developer",
    recommendedNextSkill: nextSkill,
    hiringReadiness,
  };
}
