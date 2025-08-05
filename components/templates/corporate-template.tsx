"use client"

import { Mail, Phone, MapPin, Globe, Calendar } from "lucide-react"
import type { RefObject } from "react"

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

interface CorporateTemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  profilePhotoBackgroundColor?: string
  previewRef: RefObject<HTMLDivElement>
}

export default function CorporateTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor,
  previewRef, // Destructure the new prop
}: CorporateTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "#0D9488", // teal-700
        secondaryColor: "#14B8A6", // teal-500
        lightBg: "#F0FDF4", // teal-50
        darkBg: "#111827", // gray-900
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#1F2937", // gray-800
        lightBorder: "#D1FAE5", // teal-100
        darkBorder: "#374151", // gray-700
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "#F97316", // orange-500
        lightBg: "#FFF7ED", // orange-50
        darkBg: "#111827", // gray-900
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#1F2937", // gray-800
        lightBorder: "#FFEDD5", // orange-100
        darkBorder: "#374151", // gray-700
      },
      blue: {
        primaryColor: "#2563EB", // blue-700
        secondaryColor: "#3B82F6", // blue-500
        lightBg: "#EFF6FF", // blue-50
        darkBg: "#1a202c", // gray-900
        lightText: "#1a202c", // gray-900
        darkText: "#F9FAFB", // gray-50
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#2d3748", // gray-800
        lightBorder: "#DBEAFE", // blue-100
        darkBorder: "#4A5568", // gray-700
      },
      green: {
        primaryColor: "#16A34A", // green-700
        secondaryColor: "#22C55E", // green-500
        lightBg: "#F0FDF4", // green-50
        darkBg: "#111827", // gray-900
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#1F2937", // gray-800
        lightBorder: "#D1FAE5", // green-100
        darkBorder: "#374151", // gray-700
      },
      purple: {
        primaryColor: "#7E22CE", // purple-700
        secondaryColor: "#9333EA", // purple-500
        lightBg: "#F5F3FF", // purple-50
        darkBg: "#111827", // gray-900
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#1F2937", // gray-800
        lightBorder: "#EDE9FE", // purple-100
        darkBorder: "#374151", // gray-700
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.blue
  }

  const colors = getThemeColors()

  const finalBgColor = customBackgroundColor || (isDarkMode ? colors.darkBg : colors.lightBg)
  const finalTextColor = customTextColor === "white" ? colors.darkText : colors.lightText
  const finalSecondaryTextColor = isDarkMode ? colors.darkText : colors.lightText
  const cardBgColor = isDarkMode ? colors.darkCardBg : colors.lightCardBg
  const borderColor = isDarkMode ? colors.darkBorder : colors.lightBorder

  // Tag colors logic
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? isDarkMode
        ? colors.primaryColor
        : colors.primaryColor
      : isDarkMode
        ? colors.secondaryColor
        : colors.secondaryColor
    const defaultText = "white"

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
    }
  }

  return (
    <div
      ref={previewRef}
      className={`max-w-4xl mx-auto shadow-2xl print:shadow-none`}
      style={{ backgroundColor: finalBgColor, color: finalTextColor }}
    >
      {/* Header */}
      <div
        className={`p-8 border-b-4`}
        style={{
          backgroundColor: finalBgColor,
          borderColor: colors.primaryColor,
        }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile photo is not rendered in corporate template */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold mb-1" style={{ color: finalTextColor }}>
              {data.personalInfo.name}
            </h1>
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primaryColor }}>
              {data.personalInfo.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4" style={{ color: colors.secondaryColor }} />
                <span>{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4" style={{ color: colors.secondaryColor }} />
                <span>{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4" style={{ color: colors.secondaryColor }} />
                <span>{data.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Globe className="h-4 w-4" style={{ color: colors.secondaryColor }} />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Summary, Skills, Languages, Interests) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Resumen Profesional
            </h3>
            <p className={`leading-relaxed`} style={{ color: finalSecondaryTextColor }}>
              {data.summary}
            </p>
          </section>

          {/* Experience */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Experiencia Laboral
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className={`p-6 rounded-lg shadow-md`}
                  style={{ backgroundColor: cardBgColor, border: `1px solid ${borderColor}` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className={`text-lg font-semibold`} style={{ color: finalTextColor }}>
                        {exp.position}
                      </h4>
                      <p className={`font-medium`} style={{ color: colors.primaryColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className={`flex items-center text-sm`} style={{ color: finalSecondaryTextColor }}>
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                  </div>
                  <ul className={`list-disc list-inside space-y-1 text-sm`} style={{ color: finalSecondaryTextColor }}>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  {exp.keywords && exp.keywords.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {exp.keywords.map((keyword, i) => (
                        <span key={i} className={`px-2 py-0.5 rounded-full text-xs`} style={getTagStyle(true)}>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Projects (Text-based for corporate) */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Proyectos Destacados
            </h3>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 rounded-lg shadow-md`}
                  style={{ backgroundColor: cardBgColor, border: `1px solid ${borderColor}` }}
                >
                  <h4 className={`text-lg font-semibold`} style={{ color: finalTextColor }}>
                    {project.name}
                  </h4>
                  <p className={`text-sm mb-1`} style={{ color: finalSecondaryTextColor }}>
                    {project.description}
                  </p>
                  <p className={`text-xs`} style={{ color: colors.primaryColor }}>
                    Tecnologías: {project.technologies.join(", ")}
                  </p>
                  {project.link && (
                    <p className={`text-xs`} style={{ color: colors.primaryColor }}>
                      Enlace:{" "}
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline">
                        {project.link}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Education, Skills, Certifications, QR) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Education */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Educación
            </h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className={`p-4 rounded-lg shadow-md`}
                  style={{ backgroundColor: cardBgColor, border: `1px solid ${borderColor}` }}
                >
                  <h4 className={`text-lg font-semibold`} style={{ color: finalTextColor }}>
                    {edu.degree}
                  </h4>
                  <p className={`font-medium`} style={{ color: colors.primaryColor }}>
                    {edu.institution}
                  </p>
                  <p className={`text-sm`} style={{ color: finalSecondaryTextColor }}>
                    {edu.period}
                  </p>
                  <p className={`mt-1 text-sm`} style={{ color: finalSecondaryTextColor }}>
                    {edu.details}
                  </p>
                  {edu.gpa && (
                    <p className={`text-sm mt-1`} style={{ color: finalSecondaryTextColor }}>
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Habilidades
            </h3>
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg shadow-md`}
                style={{ backgroundColor: cardBgColor, border: `1px solid ${borderColor}` }}
              >
                <h4 className={`font-semibold mb-2`} style={{ color: finalTextColor }}>
                  Técnicas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium`}
                      style={getTagStyle(true)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`p-4 rounded-lg shadow-md`}
                style={{ backgroundColor: cardBgColor, border: `1px solid ${borderColor}` }}
              >
                <h4 className={`font-semibold mb-2`} style={{ color: finalTextColor }}>
                  Interpersonales
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.softSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium`}
                      style={getTagStyle(false)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Idiomas
            </h3>
            <div
              className={`p-4 rounded-lg shadow-md`}
              style={{ backgroundColor: cardBgColor, border: `1px solid ${borderColor}` }}
            >
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-sm">
                    <span className={`font-medium`} style={{ color: finalTextColor }}>
                      {lang.language}
                    </span>
                    <span style={{ color: finalSecondaryTextColor }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Certificaciones
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert) => (
                <span key={cert} className={`px-3 py-1 rounded-full text-sm font-medium`} style={getTagStyle(true)}>
                  {cert}
                </span>
              ))}
            </div>
          </section>

          {/* Interests */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Intereses
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest) => (
                <span
                  key={interest}
                  className={`px-3 py-1 rounded-full text-sm font-medium`}
                  style={getTagStyle(false)}
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* QR Code Section (QR code image is not rendered in corporate template) */}
          <section
            className={`p-6 rounded-lg border-2 shadow-lg`}
            style={{
              backgroundColor: cardBgColor,
              borderColor: colors.primaryColor,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <h3 className={`text-xl font-bold mb-2`} style={{ color: finalTextColor }}>
                {data.personalInfo.portfolioTitle}
              </h3>
              <p style={{ color: finalSecondaryTextColor }}>{data.personalInfo.portfolioDescription}</p>
              <p className={`text-sm mt-1`} style={{ color: colors.primaryColor }}>
                {data.personalInfo.portfolioWebsite}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
