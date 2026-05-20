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

export interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  visibility: string;
  short_description: string;
  full_description: string;
  problem_solved: string;
  technical_overview: string;
  key_features: string[];
  architecture_notes: string[];
  automation_or_ai_usage: string[];
  tech_stack: string[];
  integrations: string[];
  infrastructure: string[];
  database: string[];
  deployment: string[];
  design_notes: string[];
  engineering_challenges: string[];
  future_ideas: string[];
  screenshots_available: boolean;
  demo_available: boolean;
  github_available: boolean;
  highlight: boolean;
}

export interface Experience {
  title: string;
  description: string;
  skills_demonstrated: string[];
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
}
