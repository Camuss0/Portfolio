export interface DesignPreferences {
  theme: string;
  style_keywords: string[];
  avoid: string[];
}

export interface Personal {
  name: string;
  location: string;
  role: string;
  specialties: string[];
  short_bio: string;
  long_bio: string;
  interests: string[];
  current_focus: string[];
  personality_traits: string[];
  design_preferences: DesignPreferences;
}

export interface Identidad {
  short_description: string;
  full_description: string;
  problem_solved: string;
  technical_overview: string;
}

export interface Experiencia {
  key_features: string[];
  design_notes: string[];
}

export interface Tecnica {
  tech_stack: string[];
  integrations: string[];
  architecture_notes: string[];
  engineering_challenges: string[];
}

export interface Estado {
  screenshots_available: boolean;
  screenshots: string[];
}

export interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  visibility: string;
  highlight: boolean;
  identidad: Identidad;
  experiencia: Experiencia;
  tecnica: Tecnica;
  estado: Estado;
}

export interface Experience {
  title: string;
  description: string;
  skills_demonstrated: string[];
}

export interface Study {
  title: string;
  institution: string;
  period: string;
  completed: boolean;
  highlights?: string[];
}

export interface Certification {
  name: string;
  score: string;
  level: string;
  date: string;
  url: string;
}

export interface Skills {
  frontend: string[];
  backend: string[];
  infrastructure: string[];
  automation: string[];
  ai_tools: string[];
  other: string[];
}

export interface PortfolioData {
  personal: Personal;
  projects: Project[];
  experience: Experience[];
  skills: Skills;
  studies: Study[];
  certifications: Certification[];
}
