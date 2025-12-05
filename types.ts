export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  image: string;
  link: string;
}

export interface SocialLink {
  provider: 'linkedin' | 'github' | 'twitter' | 'website' | 'email' | 'whatsapp';
  url: string;
}

export interface ContactInfo {
  email: string;
  phone: string | null;
  links: SocialLink[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
}

export interface ProfileData {
  id: string;
  name: string;
  title: string;
  photo: string;
  summary: string;
  about: string;
  skills: Skill[];
  projects: Project[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  cv: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}