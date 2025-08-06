import type { RefObject } from "react"
import { cn } from "@/lib/utils"
import { TemplateProps, SectionType } from "@/lib/types"
import {
  PersonalInfoSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  CertificationsSection,
  LanguagesSection,
  InterestsSection,
} from "@/components/cv-sections"

interface ATSTemplateProps extends TemplateProps {
  previewRef: RefObject<HTMLDivElement>
}

export default function ATSTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor,
  previewRef,
  enabledSections = Object.values(SectionType),
  sectionOrder = [
    SectionType.PERSONAL_INFO,
    SectionType.SUMMARY,
    SectionType.TECHNICAL_SKILLS,
    SectionType.SOFT_SKILLS,
    SectionType.EXPERIENCE,
    SectionType.EDUCATION,
    SectionType.CERTIFICATIONS,
    SectionType.PROJECTS,
    SectionType.LANGUAGES,
    SectionType.INTERESTS,
  ],
}: ATSTemplateProps) {
  const themeColors = {
    teal: { primary: "text-teal-600", text: "text-gray-800" },
    orange: { primary: "text-orange-600", text: "text-gray-800" },
    blue: { primary: "text-blue-600", text: "text-gray-800" },
    green: { primary: "text-green-600", text: "text-gray-800" },
    purple: { primary: "text-purple-600", text: "text-gray-800" },
  }

  const currentTheme = themeColors[selectedTheme as keyof typeof themeColors] || themeColors.orange
  const colorTheme = {
    primary: currentTheme.primary,
    text: currentTheme.text,
  }

  const renderSection = (sectionType: SectionType) => {
    if (!enabledSections.includes(sectionType)) return null

    const commonProps = {
      className: "mb-6",
      layout: "ats" as const,
      colorTheme,
    }

    switch (sectionType) {
      case SectionType.PERSONAL_INFO:
        return (
          <PersonalInfoSection
            key={sectionType}
            personalInfo={data.personalInfo}
            layout="compact"
            showPhoto={false}
            colorTheme={colorTheme}
            className="mb-6"
          />
        )
      case SectionType.SUMMARY:
        return (
          <SummarySection
            key={sectionType}
            summary={data.summary}
            keywords={data.keywords}
            {...commonProps}
          />
        )
      case SectionType.TECHNICAL_SKILLS:
      case SectionType.SOFT_SKILLS:
        // Combine both skills sections into one for ATS template
        if (sectionType === SectionType.TECHNICAL_SKILLS && 
            (data.technicalSkills.length > 0 || data.softSkills.length > 0)) {
          return (
            <SkillsSection
              key="skills-combined"
              technicalSkills={data.technicalSkills}
              softSkills={data.softSkills}
              {...commonProps}
            />
          )
        }
        return null
      case SectionType.EXPERIENCE:
        return (
          <ExperienceSection
            key={sectionType}
            experiences={data.experience}
            showKeywords={true}
            highlightKeywords={false}
            {...commonProps}
          />
        )
      case SectionType.EDUCATION:
        return (
          <EducationSection
            key={sectionType}
            education={data.education}
            {...commonProps}
          />
        )
      case SectionType.PROJECTS:
        return (
          <ProjectsSection
            key={sectionType}
            projects={data.projects}
            showImages={false}
            {...commonProps}
          />
        )
      case SectionType.CERTIFICATIONS:
        return (
          <CertificationsSection
            key={sectionType}
            certifications={data.certifications}
            {...commonProps}
          />
        )
      case SectionType.LANGUAGES:
        return (
          <LanguagesSection
            key={sectionType}
            languages={data.languages}
            {...commonProps}
          />
        )
      case SectionType.INTERESTS:
        return (
          <InterestsSection
            key={sectionType}
            interests={data.interests}
            {...commonProps}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={previewRef}
      className={cn(
        "min-h-screen w-full p-8 bg-white text-black font-sans",
        "print:p-0 print:m-0 print:shadow-none",
      )}
      style={{
        backgroundColor: customBackgroundColor || "#ffffff",
        fontFamily: '"Arial", "Helvetica", sans-serif',
        fontSize: "11pt",
        lineHeight: "1.2",
      }}
    >
      {sectionOrder.map(renderSection)}
    </div>
  )
} 