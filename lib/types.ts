export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  profilePhoto: string
  profilePhotoBackgroundColor?: string
  portfolioTitle: string
  portfolioDescription: string
  portfolioWebsite: string
  qrCodeImage?: string
}

export interface Experience {
  id: string
  position: string
  company: string
  period: string
  achievements: string[]
  keywords: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  details: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  imageUrls?: string[]
}

export interface Language {
  id: string
  language: string
  level: string
}

export interface CurriculumData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  technicalSkills: string[]
  softSkills: string[]
  languages: Language[]
  projects: Project[]
  certifications: string[]
  interests: string[]
  keywords: string[]
}

// Professional profiles for content generation and section configuration
export enum ProfessionalProfile {
  ADMINISTRATIVE = "administrative",
  CUSTOMER_SERVICE = "customer_service", 
  CULINARY = "culinary",
  TEAM_TRAINER = "team_trainer",
  CUSTOMER_EXPERIENCE = "customer_experience"
}

export interface ProfileConfig {
  name: string
  description: string
  requiredSections: SectionType[]
  optionalSections: SectionType[]
  sectionOrder: SectionType[]
  keySkillsFocus: string[]
  contentPrompts: {
    summary: string
    achievements: string
    skills: string
  }
}

export enum SectionType {
  PERSONAL_INFO = "personalInfo",
  SUMMARY = "summary", 
  EXPERIENCE = "experience",
  EDUCATION = "education",
  TECHNICAL_SKILLS = "technicalSkills",
  SOFT_SKILLS = "softSkills",
  LANGUAGES = "languages",
  PROJECTS = "projects",
  CERTIFICATIONS = "certifications",
  INTERESTS = "interests",
  KEYWORDS = "keywords"
}

export interface TemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  profilePhotoBackgroundColor?: string
  previewRef?: React.RefObject<HTMLDivElement>
  enabledSections?: SectionType[]
  sectionOrder?: SectionType[]
}

export interface ThemeVariant {
  name: string
  description: string
  primary: string
  secondary: string
  accent?: string
  background: string
  text: string
  style: "sober" | "modern" | "elegant"
}

export interface ExportOptions {
  format: "pdf" | "docx" | "txt"
  atsOptimized?: boolean
  includeImages?: boolean
  colorMode?: "color" | "grayscale" | "blackwhite"
}