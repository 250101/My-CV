"use client"

import { Mail, Phone, MapPin, Globe, Code } from "lucide-react"
import type { RefObject } from "react" // Import RefObject

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
  previewRef: RefObject<HTMLDivElement> // New prop for the ref
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
  previewRef,
}: CorporateTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "#0D9488", // teal-700
        secondaryColor: "#14B8A6", // teal-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#374151", // gray-700
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "#F97316", // orange-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#374151", // gray-700
      },
      blue: {
        primaryColor: "#1D4ED8", // blue-700
        secondaryColor: "#3B82F6", // blue-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#374151", // gray-700
      },
      green: {
        primaryColor: "#047857", // green-700
        secondaryColor: "#10B981", // green-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#374151", // gray-700
      },
      purple: {
        primaryColor: "#6D28D9", // purple-700
        secondaryColor: "#8B5CF6", // purple-500
        lightBg: "#FFFFFF", // white
        darkBg: "#1F2937", // gray-800
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#374151", // gray-700
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.orange // Default to orange
  }

  const colors = getThemeColors()

  // Determine background color
  const finalBgColor = customBackgroundColor || (isDarkMode ? colors.darkBg : colors.lightBg)
  // Determine text color
  const finalTextColor = customTextColor === "white" ? "white" : "black"
  const finalSecondaryTextColor = customTextColor === "white" ? "rgb(209, 213, 219)" : "rgb(75, 85, 99)" // gray-300 or gray-700

  const cardBgColor = isDarkMode ? colors.darkCardBg : colors.lightCardBg

  // Tag colors logic (Corporate template typically doesn't use colorful tags, but keeping for consistency if needed)
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? isDarkMode
        ? `rgba(${colors.primaryColor.replace("rgb(", "").replace(")", "")}, 0.2)`
        : "#E5E7EB" // gray-200
      : isDarkMode
        ? `rgba(${colors.secondaryColor.replace("rgb(", "").replace(")", "")}, 0.2)`
        : "#D1D5DB" // gray-300
    const defaultText = isPrimaryTag
      ? isDarkMode
        ? colors.primaryColor
        : "#374151" // gray-700
      : isDarkMode
        ? colors.secondaryColor
        : "#4B5563" // gray-600

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
    }
  }

  return (
    <div
      ref={previewRef} // Apply the ref here
      className={`max-w-4xl mx-auto p-8 font-serif leading-relaxed ${isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
      style={{ backgroundColor: finalBgColor, color: finalTextColor }}
    >
      {/* Header */}
      <header className="mb-8 border-b-2 pb-4" style={{ borderColor: colors.primaryColor }}>
        <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: colors.primaryColor }}>
          {data.personalInfo.name}
        </h1>
        <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: finalTextColor }}>
          {data.personalInfo.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" style={{ color: colors.secondaryColor }} />
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" style={{ color: colors.secondaryColor }} />
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" style={{ color: colors.secondaryColor }} />
            <span>{data.personalInfo.location}</span>
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" style={{ color: colors.secondaryColor }} />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" style={{ color: colors.secondaryColor }} />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Code className="w-4 h-4" style={{ color: colors.secondaryColor }} />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 pb-1 border-b" style={{ borderColor: colors.secondaryColor }}>
          Resumen Profesional
        </h3>
        <p className="text-sm">{data.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 pb-1 border-b" style={{ borderColor: colors.secondaryColor }}>
          Experiencia Laboral
        </h3>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-base">{exp.position}</h4>
                <span className="text-xs text-gray-600">{exp.period}</span>
              </div>
              <p className="text-sm font-medium mb-2" style={{ color: colors.primaryColor }}>
                {exp.company}
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              {exp.keywords && exp.keywords.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {exp.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded-full text-xs`}
                      style={getTagStyle(true)} // Keywords use primary tag style
                    >
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
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 pb-1 border-b" style={{ borderColor: colors.secondaryColor }}>
          Educación
        </h3>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-base">{edu.degree}</h4>
                <span className="text-xs text-gray-600">{edu.period}</span>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: colors.primaryColor }}>
                {edu.institution}
              </p>
              <p className="text-sm">{edu.details}</p>
              {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 pb-1 border-b" style={{ borderColor: colors.secondaryColor }}>
          Habilidades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Habilidades Técnicas</h4>
            <div className="flex flex-wrap gap-2">
              {data.technicalSkills.map((skill) => (
                <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium`} style={getTagStyle(true)}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Habilidades Interpersonales</h4>
            <div className="flex flex-wrap gap-2">
              {data.softSkills.map((skill) => (
                <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium`} style={getTagStyle(false)}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Languages and Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <section>
          <h3 className="text-xl font-bold mb-3 pb-1 border-b" style={{ borderColor: colors.secondaryColor }}>
            Idiomas
          </h3>
          <div className="space-y-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-sm">
                <span className="font-medium">{lang.language}</span>
                <span>{lang.level}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3 pb-1 border-b" style={{ borderColor: colors.secondaryColor }}>
            Certificaciones
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert) => (
              <span
                key={cert}
                className={`px-3 py-1 rounded-full text-sm font-medium`}
                style={getTagStyle(true)} // Certifications use primary tag style
              >
                {cert}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Projects */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 pb-1 border-b" style={{ borderColor: colors.secondaryColor }}>
          Proyectos Destacados
        </h3>
        <div className="space-y-4">
          {data.projects.length > 0
            ? data.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h4 className="font-semibold text-base">{project.name}</h4>
                  <p className="text-sm mb-1">{project.description}</p>
                  {project.link && (
                    <p className="text-sm" style={{ color: colors.primaryColor }}>
                      Link:{" "}
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    </p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 rounded-full text-xs`}
                          style={getTagStyle(true)} // Technologies use primary tag style
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            : Array.from({ length: 2 }).map((_, i) => (
                <div key={`placeholder-proj-${i}`} className="mb-4">
                  <h4 className="font-semibold text-base">[Nombre del Proyecto {i + 1}]</h4>
                  <p className="text-sm mb-1">[Descripción del proyecto {i + 1}]</p>
                  <p className="text-sm" style={{ color: colors.primaryColor }}>
                    Link: [Enlace del proyecto {i + 1}]
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs`} style={getTagStyle(true)}>
                      Tecnología 1
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs`} style={getTagStyle(true)}>
                      Tecnología 2
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Interests */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-3 pb-1 border-b" style={{ borderColor: colors.secondaryColor }}>
          Intereses
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.interests.map((interest) => (
            <span
              key={interest}
              className={`px-3 py-1 rounded-full text-sm font-medium`}
              style={getTagStyle(false)} // Interests use secondary tag style
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      {/* QR Code Section */}
      <section className="text-center mt-8">
        <h3 className="text-xl font-bold mb-2" style={{ color: finalTextColor }}>
          {data.personalInfo.portfolioTitle}
        </h3>
        <p className="text-sm mb-2">{data.personalInfo.portfolioDescription}</p>
        {data.personalInfo.qrCodeImage && (
          <div className="inline-block p-2 border-2 rounded-lg" style={{ borderColor: colors.primaryColor }}>
            <img
              src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
              alt="Código QR del Portfolio"
              className="w-24 h-24 object-contain"
            />
          </div>
        )}
        <p className="text-sm mt-2" style={{ color: colors.primaryColor }}>
          {data.personalInfo.portfolioWebsite}
        </p>
      </section>
    </div>
  )
}
