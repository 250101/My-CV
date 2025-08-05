"use client"

import type { RefObject } from "react"
import SocialMediaInspiredTemplate from "./templates/social-media-inspired-template"
import ATSTemplate from "./templates/ats-template"
import CorporateTemplate from "./templates/corporate-template"
import CreativeTemplate from "./templates/creative-template"
import MinimalTemplate from "./templates/minimal-template"

// Define las interfaces para la estructura de los datos del currículum
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
  onDownloadStart?: () => void
  onDownloadEnd?: () => void
  isDownloading?: boolean
  previewRef: RefObject<HTMLDivElement> // Add previewRef prop
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
  previewRef, // Destructure previewRef
}: CurriculumPreviewProps) {
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "socialMedia":
        return (
          <SocialMediaInspiredTemplate
            data={data}
            selectedTheme={selectedTheme}
            isDarkMode={isDarkMode}
            customBackgroundColor={customBackgroundColor}
            customTextColor={customTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            profilePhotoBackgroundColor={profilePhotoBackgroundColor}
            previewRef={previewRef} // Pass previewRef
          />
        )
      case "ats":
        return (
          <ATSTemplate
            data={data}
            selectedTheme={selectedTheme}
            isDarkMode={isDarkMode}
            customBackgroundColor={customBackgroundColor}
            customTextColor={customTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            profilePhotoBackgroundColor={profilePhotoBackgroundColor}
            previewRef={previewRef} // Pass previewRef
          />
        )
      case "corporate":
        return (
          <CorporateTemplate
            data={data}
            selectedTheme={selectedTheme}
            isDarkMode={isDarkMode}
            customBackgroundColor={customBackgroundColor}
            customTextColor={customTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            profilePhotoBackgroundColor={profilePhotoBackgroundColor}
            previewRef={previewRef} // Pass previewRef
          />
        )
      case "creative":
        return (
          <CreativeTemplate
            data={data}
            selectedTheme={selectedTheme}
            isDarkMode={isDarkMode}
            customBackgroundColor={customBackgroundColor}
            customTextColor={customTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            profilePhotoBackgroundColor={profilePhotoBackgroundColor}
            previewRef={previewRef} // Pass previewRef
          />
        )
      case "minimal":
        return (
          <MinimalTemplate
            data={data}
            selectedTheme={selectedTheme}
            isDarkMode={isDarkMode}
            customBackgroundColor={customBackgroundColor}
            customTextColor={customTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            profilePhotoBackgroundColor={profilePhotoBackgroundColor}
            previewRef={previewRef} // Pass previewRef
          />
        )
      default:
        return (
          <SocialMediaInspiredTemplate
            data={data}
            selectedTheme={selectedTheme}
            isDarkMode={isDarkMode}
            customBackgroundColor={customBackgroundColor}
            customTextColor={customTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            profilePhotoBackgroundColor={profilePhotoBackgroundColor}
            previewRef={previewRef} // Pass previewRef
          />
        )
    }
  }

  return <div className="w-full h-full">{renderTemplate()}</div>
}
