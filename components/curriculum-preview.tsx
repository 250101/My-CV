"use client"

import type { RefObject } from "react"
import SocialMediaInspiredTemplate from "./templates/social-media-inspired-template"
import ATSTemplate from "./templates/ats-template"
import CorporateTemplate from "./templates/corporate-template"
import CreativeTemplate from "./templates/creative-template"
import MinimalTemplate from "./templates/minimal-template"
import { CurriculumData, SectionType } from "@/lib/types"

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
  enabledSections?: SectionType[]
  sectionOrder?: SectionType[]
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
  enabledSections,
  sectionOrder,
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
            enabledSections={enabledSections}
            sectionOrder={sectionOrder}
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