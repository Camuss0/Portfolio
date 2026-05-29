export interface DesignPreferences {
  theme: string;
  style_keywords: string[];
  avoid: string[];
}

export interface Personal {
  name: string;
  location: string;
  role: string; // no se usa mucho
  specialties: string[];
  short_bio: string; // no se usa
  //falta academic_title
  long_bio: string; // no se usa
  interests: string[]; // no se usa
  current_focus: string[];  // no se usa
  personality_traits: string[]; // no se usa
  design_preferences: DesignPreferences; // no se usa
  email?: string;
  social?: {
    github?: string;
    linkedin?: string;
  };
}

export interface Project {
  id: string;
  name: string;
  type: string;
  visibility: string;
  highlight: boolean;
  company?: string;
  client?: string;
  client_logo?: string;
  short_description: string;
  problem_solved: string;
  description: string;
  key_features: string[];
  tech_stack: string[];
  integrations: string[];
  engineering_challenges: string[];
  screenshots: string[];
}

export interface Experience {
  title: string;
  company?: string;
  company_logo?: string;
  period?: string;
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
