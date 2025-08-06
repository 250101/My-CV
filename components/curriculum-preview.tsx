"use client"

import React from "react"
import { CurriculumData, TemplateProps } from "@/lib/types"
import { getTemplateById } from "@/lib/templates"
import CorporateTemplate from "./templates/corporate-template"
import CreativeTemplate from "./templates/creative-template"
import MinimalTemplate from "./templates/minimal-template"
import ATSTemplate from "./templates/ats-template"
import SocialMediaInspiredTemplate from "./templates/social-media-inspired-template"

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
  previewRef?: React.RefObject<HTMLDivElement>
  enabledSections?: string[]
  sectionOrder?: string[]
}

export function CurriculumPreview({
  data,
  selectedTemplate,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor,
  previewRef,
  enabledSections,
  sectionOrder,
}: CurriculumPreviewProps) {
  const template = getTemplateById(selectedTemplate)
  const templateClassName = template?.className || 'template-professional'

  const templateProps: TemplateProps = {
    data,
    selectedTheme,
    isDarkMode,
    customBackgroundColor,
    customTextColor,
    customTagPrimaryColor,
    customTagSecondaryColor,
    profilePhotoBackgroundColor,
    previewRef,
    enabledSections: enabledSections as any,
    sectionOrder: sectionOrder as any,
  }

  return (
    <div 
      ref={previewRef}
      data-preview="true"
      className={`${templateClassName} min-h-screen p-8 transition-all duration-300`}
      style={{
        backgroundColor: customBackgroundColor || undefined,
        color: customTextColor || undefined,
      }}
    >
      {/* Render template based on selection */}
      {selectedTemplate === "corporate" && <CorporateTemplate {...templateProps} />}
      {selectedTemplate === "creative" && <CreativeTemplate {...templateProps} />}
      {selectedTemplate === "minimal" && <MinimalTemplate {...templateProps} />}
      {selectedTemplate === "ats" && <ATSTemplate {...templateProps} />}
      {selectedTemplate === "socialMedia" && <SocialMediaInspiredTemplate {...templateProps} />}
      {/* Default to professional template */}
      {(!selectedTemplate || selectedTemplate === "professional") && <CorporateTemplate {...templateProps} />}
    </div>
  )
}