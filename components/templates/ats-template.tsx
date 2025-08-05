"use client"

import { Mail, Phone, MapPin, Globe, Code } from "lucide-react"
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

interface ATSTemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
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
  previewRef,
}: ATSTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "#10B981", // teal-500
        secondaryColor: "#22C55E", // green-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#0D9488", // teal-800
        darkAccentText: "#22C55E", // green-500
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "#16A34A", // green-600
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#9A3412", // orange-800
        darkAccentText: "rgb(242,89,13)",
      },
      blue: {
        primaryColor: "#3B82F6", // blue-500
        secondaryColor: "#9333EA", // purple-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1a202c", // gray-900
        lightText: "#1a202c", // gray-900
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#1E40AF", // blue-800
        darkAccentText: "#3B82F6", // blue-500
      },
      green: {
        primaryColor: "#22C55E", // green-500
        secondaryColor: "#3B82F6", // blue-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1f2937", // gray-800
        lightText: "#1f2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#065F46", // green-800
        darkAccentText: "#22C55E", // green-500
      },
      purple: {
        primaryColor: "#9333EA", // purple-500
        secondaryColor: "#EC4899", // pink-500
        lightBg: "#FFFFFF", // white
        darkBg: "#2d2640", // deep purple
        lightText: "#2d2640", // deep purple
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#5B21B6", // purple-800
        darkAccentText: "#9333EA", // purple-500
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.orange
  }

  const colors = getThemeColors()

  const finalBgColor = customBackgroundColor || (isDarkMode ? colors.darkBg : colors.lightBg)
  const finalTextColor = customTextColor === "white" ? colors.darkText : colors.lightText
  const finalAccentColor = isDarkMode ? colors.darkAccentText : colors.lightAccentText

  // ATS template typically avoids complex styling for tags,
  // so we'll use simple text or a very minimal background.
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? isDarkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgb(243, 244, 246)" // gray-100
      : isDarkMode
        ? "rgba(255, 255, 255, 0.05)"
        : "rgb(243, 244, 246)" // gray-100
    const defaultText = isPrimaryTag
      ? isDarkMode
        ? colors.darkText
        : colors.lightText
      : isDarkMode
        ? colors.darkText
        : colors.lightText // Secondary text for ATS tags
    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
      border: "1px solid transparent", // Add a subtle border
      borderColor: isDarkMode ? "rgba(255,255,255,0.2)" : "rgb(209, 213, 219)", // gray-300
    }
  }

  return (
    <div
      ref={previewRef}
      className={`max-w-3xl mx-auto p-8 font-sans leading-relaxed shadow-2xl print:shadow-none`}
      style={{
        backgroundColor: finalBgColor,
        color: finalTextColor,
        fontFamily: "sans-serif", // ATS friendly font
      }}
    >
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-1" style={{ color: finalTextColor }}>
          {data.personalInfo.name}
        </h1>
        <h2 className="text-xl font-semibold mb-4" style={{ color: finalAccentColor }}>
          {data.personalInfo.title}
        </h2>
        <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-sm`} style={{ color: finalTextColor }}>
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.personalInfo.location}
            </span>
          )}
          {data.personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {data.personalInfo.linkedin}
            </span>
          )}
          {data.personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {data.personalInfo.website}
            </span>
          )}
          {data.personalInfo.github && (
            <span className="flex items-center gap-1">
              <Code className="w-3 h-3" />
              {data.personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalAccentColor }}>
          Resumen Profesional
        </h3>
        <p className={`text-sm leading-relaxed`} style={{ color: finalTextColor }}>
          {data.summary}
        </p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalAccentColor }}>
          Experiencia Laboral
        </h3>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="text-sm">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className={`font-semibold`} style={{ color: finalAccentColor }}>
                  {exp.position} - {exp.company}
                </h4>
                <span style={{ color: finalTextColor }}>{exp.period}</span>
              </div>
              <ul className={`list-disc list-inside space-y-0.5`} style={{ color: finalTextColor }}>
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              {exp.keywords && exp.keywords.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {exp.keywords.map((keyword, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded text-xs`} style={getTagStyle(true)}>
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalAccentColor }}>
          Educación
        </h3>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="text-sm">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className={`font-semibold`} style={{ color: finalAccentColor }}>
                  {edu.degree}
                </h4>
                <span style={{ color: finalTextColor }}>{edu.period}</span>
              </div>
              <p style={{ color: finalTextColor }}>{edu.institution}</p>
              {edu.details && <p style={{ color: finalTextColor }}>{edu.details}</p>}
              {edu.gpa && <p style={{ color: finalTextColor }}>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalAccentColor }}>
          Habilidades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className={`font-semibold mb-1`} style={{ color: finalAccentColor }}>
              Técnicas:
            </h4>
            <div className="flex flex-wrap gap-1">
              {data.technicalSkills.map((skill, i) => (
                <span key={i} className={`px-2 py-0.5 rounded text-xs`} style={getTagStyle(true)}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className={`font-semibold mb-1`} style={{ color: finalAccentColor }}>
              Interpersonales:
            </h4>
            <div className="flex flex-wrap gap-1">
              {data.softSkills.map((skill, i) => (
                <span key={i} className={`px-2 py-0.5 rounded text-xs`} style={getTagStyle(false)}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Languages and Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <section>
          <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalAccentColor }}>
            Idiomas
          </h3>
          <ul className="text-sm space-y-1">
            {data.languages.map((lang) => (
              <li key={lang.id}>
                <span style={{ color: finalTextColor }}>{lang.language}</span> (
                <span style={{ color: finalTextColor }}>{lang.level}</span>)
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalAccentColor }}>
            Intereses
          </h3>
          <div className="flex flex-wrap gap-1 text-sm">
            {data.interests.map((interest, i) => (
              <span key={i} className={`px-2 py-0.5 rounded text-xs`} style={getTagStyle(false)}>
                {interest}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Certifications */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalAccentColor }}>
          Certificaciones
        </h3>
        <ul className="list-disc list-inside text-sm">
          {data.certifications.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </section>

      {/* Projects (ATS friendly - no images) */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalAccentColor }}>
          Proyectos
        </h3>
        <div className="space-y-4 text-sm">
          {data.projects.length > 0 ? (
            data.projects.map((project) => (
              <div key={project.id}>
                <h4 className={`font-semibold`} style={{ color: finalAccentColor }}>
                  {project.name}
                  {project.link && (
                    <span className="ml-2 text-blue-600 hover:underline">
                      (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Link
                      </a>
                      )
                    </span>
                  )}
                </h4>
                <p style={{ color: finalTextColor }}>{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <p className="mt-1 text-xs">
                    <span className="font-semibold">Tecnologías:</span> {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className={`text-sm`} style={{ color: finalTextColor }}>
              No hay proyectos destacados.
            </p>
          )}
        </div>
      </section>

      {/* QR Code Section (ATS friendly - text-based link) */}
      <section className="text-center mt-8">
        <h3 className={`text-lg font-bold mb-2`} style={{ color: finalAccentColor }}>
          {data.personalInfo.portfolioTitle}
        </h3>
        <p className={`text-sm`} style={{ color: finalTextColor }}>
          {data.personalInfo.portfolioDescription}
        </p>
        {data.personalInfo.portfolioWebsite && (
          <p className={`text-sm text-blue-600 hover:underline mt-1`}>
            <a href={`https://${data.personalInfo.portfolioWebsite}`} target="_blank" rel="noopener noreferrer">
              {data.personalInfo.portfolioWebsite}
            </a>
          </p>
        )}
        {/* ATS templates typically avoid images, so QR code image is not rendered */}
      </section>
    </div>
  )
}
