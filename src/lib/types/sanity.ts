export interface SanityDocument {
  _id: string;
  [key: string]: any;
}

export interface Project extends SanityDocument {
  title: string;
  slug?: string;
  subtitle?: string;
  challenge?: string;
  outcome?: string;
  coverImageUrl?: string | null;
  categories?: { title: string; slug?: string }[];
  technologies?: { name: string; iconUrl?: string }[];
  results?: { label: string; value: string | number }[];
}

export interface Experience extends SanityDocument {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  description?: string;
  coverImageUrl?: string | null;
  technologies?: { name: string }[];
  relatedProjects?: Project[];
}

export interface Education extends SanityDocument {
  institution: string;
  degree: string;
  logoUrl?: string | null;
  location?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  coursework?: string[];
  honors?: string[];
}

export interface Award extends SanityDocument {
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
  url?: string;
}

export interface SiteSettings extends SanityDocument {
  title?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  navigation?: any[];
  footer?: any[];
}

export interface Author extends SanityDocument {
  name: string;
  role?: string;
  bio?: any;
  imageUrl?: string;
  metrics?: { label: string; value: string; unit?: string }[];
  capabilities?: any[];
}
