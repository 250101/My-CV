"use client"

import type React from "react"

import SocialMediaInspiredTemplate from "./templates/social-media-inspired-template"
import ATSTemplate from "./templates/ats-template"
import CorporateTemplate from "./templates/corporate-template"
import CreativeTemplate from "./templates/creative-template"
import MinimalTemplate from "./templates/minimal-template"

interface PersonalInfo {
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

interface Experience {
  id: string
  position: string
  company: string
  period: string
  achievements: string[]
  keywords: string[]
}

interface Education {
  id: string
  degree: string
  institution: string
  period: string
  details: string
  gpa?: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  imageUrls?: string[]
}

interface CurriculumData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  technicalSkills: string[]
  softSkills: string[]
  languages: { id: string; language: string; level: string }[]
  projects: Project[]
  certifications: string[]
  interests: string[]
  keywords: string[]
}

interface CurriculumPreviewProps {
  data: CurriculumData
  selectedTemplate: string
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  profilePhotoBackgroundColor?: string
  previewRef: React.RefObject<HTMLDivElement> // Use React.RefObject
}

export default function CurriculumPreview({
  data,
  selectedTemplate,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor,
  previewRef, // Destructure the new prop
}: CurriculumPreviewProps) {
  const templateProps = {
    data,
    selectedTheme,
    isDarkMode,
    customBackgroundColor,
    customTextColor,
    customTagPrimaryColor,
    customTagSecondaryColor,
    profilePhotoBackgroundColor,
    previewRef, // Pass the ref to the selected template
  }

  return (
    <div className="relative">
      {/* The actual template rendering will happen inside this div, which is referenced by previewRef */}
      {(() => {
        switch (selectedTemplate) {
          case "socialMedia":
            return <SocialMediaInspiredTemplate {...templateProps} />
          case "ats":
            return <ATSTemplate {...templateProps} />
          case "corporate":
            return <CorporateTemplate {...templateProps} />
          case "creative":
            return <CreativeTemplate {...templateProps} />
          case "minimal":
            return <MinimalTemplate {...templateProps} />
          default:
            return <SocialMediaInspiredTemplate {...templateProps} />
        }
      })()}
    </div>
  )
}
