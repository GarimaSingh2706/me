export interface NavLink {
  label: string;
  fragment: string;
  icon: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  featured: boolean;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: { category: string; items: string[] }[];
  architecture: string;
  challenges: string;
  learnings: string;
  githubUrl: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  icon: string;
  credentialUrl: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score: string;
  scoreLabel: string;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
