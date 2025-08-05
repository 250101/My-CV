"use client"
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

interface MinimalTemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  previewRef: RefObject<HTMLDivElement>
}

export default function MinimalTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  previewRef,
}: MinimalTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "#0D9488", // teal-700
        secondaryColor: "#14B8A6", // teal-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#0D9488", // teal-700
        darkAccentText: "#14B8A6", // teal-500
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "#F97316", // orange-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "rgb(242,89,13)",
        darkAccentText: "#F97316",
      },
      blue: {
        primaryColor: "#2563EB", // blue-700
        secondaryColor: "#3B82F6", // blue-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1a202c", // gray-900
        lightText: "#1a202c", // gray-900
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#2563EB", // blue-700
        darkAccentText: "#3B82F6", // blue-500
      },
      green: {
        primaryColor: "#16A34A", // green-700
        secondaryColor: "#22C55E", // green-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#16A34A", // green-700
        darkAccentText: "#22C55E", // green-500
      },
      purple: {
        primaryColor: "#7E22CE", // purple-700
        secondaryColor: "#9333EA", // purple-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightText: "#1F2937", // gray-800
        darkText: "#F9FAFB", // gray-50
        lightAccentText: "#7E22CE", // purple-700
        darkAccentText: "#9333EA", // purple-500
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.blue
  }

  const colors = getThemeColors()

  const finalBgColor = customBackgroundColor || (isDarkMode ? colors.darkBg : colors.lightBg)
  const finalTextColor = customTextColor === "white" ? colors.darkText : colors.lightText
  const finalAccentColor = isDarkMode ? colors.darkAccentText : colors.lightAccentText

  return (
    <div
      ref={previewRef}
      className={`max-w-3xl mx-auto p-8 font-sans leading-relaxed shadow-2xl print:shadow-none`}
      style={{ backgroundColor: finalBgColor, color: finalTextColor }}
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
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && <span>LinkedIn: {data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span>GitHub: {data.personalInfo.github}</span>}
          {data.personalInfo.website && <span>Website: {data.personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 border-b-2 pb-1" style={{ borderColor: finalAccentColor }}>
          Resumen
        </h3>
        <p>{data.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 border-b-2 pb-1" style={{ borderColor: finalAccentColor }}>
          Experiencia Laboral
        </h3>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-lg font-semibold" style={{ color: finalAccentColor }}>
                  {exp.position} - {exp.company}
                </h4>
                <span className="text-sm">{exp.period}</span>
              </div>
              <p className="font-medium mb-2">{exp.company}</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              {exp.keywords && exp.keywords.length > 0 && (
                <p className="text-xs mt-2">
                  <span className="font-semibold">Palabras Clave:</span> {exp.keywords.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 border-b-2 pb-1" style={{ borderColor: finalAccentColor }}>
          Educación
        </h3>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="text-lg font-semibold" style={{ color: finalAccentColor }}>
                {edu.degree}
              </h4>
              <span className="text-sm">{edu.period}</span>
            </div>
            <p className="font-medium mb-1">{edu.institution}</p>
            <p className="text-sm">{edu.details}</p>
            {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 border-b-2 pb-1" style={{ borderColor: finalAccentColor }}>
          Habilidades
        </h3>
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Habilidades Técnicas:</h4>
          <p className="text-sm">{data.technicalSkills.join(", ")}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Habilidades Interpersonales:</h4>
          <p className="text-sm">{data.softSkills.join(", ")}</p>
        </div>
      </section>

      {/* Languages */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 border-b-2 pb-1" style={{ borderColor: finalAccentColor }}>
          Idiomas
        </h3>
        <ul className="list-disc list-inside text-sm">
          {data.languages.map((lang) => (
            <li key={lang.id}>
              {lang.language} ({lang.level})
            </li>
          ))}
        </ul>
      </section>

      {/* Certifications */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 border-b-2 pb-1" style={{ borderColor: finalAccentColor }}>
          Certificaciones
        </h3>
        <ul className="list-disc list-inside text-sm">
          {data.certifications.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </section>

      {/* Projects (Text-based for minimal) */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 border-b-2 pb-1" style={{ borderColor: finalAccentColor }}>
          Proyectos
        </h3>
        <div className="space-y-4 text-sm">
          {data.projects.length > 0 ? (
            data.projects.map((project) => (
              <div key={project.id}>
                <h4 className="text-lg font-semibold" style={{ color: finalAccentColor }}>
                  {project.name}
                </h4>
                <p className="text-sm mb-1">{project.description}</p>
                <p className="text-xs">
                  <span className="font-semibold">Tecnologías:</span> {project.technologies.join(", ")}
                </p>
                {project.link && (
                  <p className="text-xs">
                    <span className="font-semibold">Enlace:</span> {project.link}
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

      {/* QR Code Section (Minimal friendly - text-based link) */}
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
        {/* Minimal templates typically avoid images, so QR code image is not rendered */}
      </section>
    </div>
  )
}
