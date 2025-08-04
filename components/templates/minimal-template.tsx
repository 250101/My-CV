"use client"

import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Link, QrCode } from "lucide-react"
import type { CurriculumData } from "../curriculum-editor"
import type { RefObject } from "react" // Import RefObject

interface MinimalTemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  profilePhotoBackgroundColor?: string
  onSectionClick: (sectionId: string) => void
  previewRef: RefObject<HTMLDivElement> // New prop for the ref
}

const themeColors: { [key: string]: { primary: string; secondary: string } } = {
  orange: { primary: "border-orange-500", secondary: "text-orange-500" },
  teal: { primary: "border-teal-500", secondary: "text-teal-500" },
  blue: { primary: "border-blue-500", secondary: "text-blue-500" },
  green: { primary: "border-green-500", secondary: "text-green-500" },
  purple: { primary: "border-purple-500", secondary: "text-purple-500" },
}

export default function MinimalTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor,
  onSectionClick,
  previewRef, // Destructure the new prop
}: MinimalTemplateProps) {
  const currentTheme = themeColors[selectedTheme] || themeColors.orange
  const borderColorClass = customBackgroundColor ? "" : currentTheme.primary
  const textColorClass = customTextColor ? "" : currentTheme.secondary

  const dynamicBorderStyle = customBackgroundColor ? { borderColor: customBackgroundColor } : {}
  const dynamicTextStyle = customTextColor ? { color: customTextColor } : {}
  const dynamicTagPrimaryStyle = customTagPrimaryColor ? { backgroundColor: customTagPrimaryColor } : {}
  const dynamicTagSecondaryStyle = customTagSecondaryColor ? { color: customTagSecondaryColor } : {}

  return (
    <div
      ref={previewRef} // Apply the ref here
      className={`font-sans p-8 shadow-lg mx-auto my-8 max-w-3xl border-t-8 ${borderColorClass} ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
      style={dynamicBorderStyle}
    >
      {/* Header Section */}
      <header className="text-center mb-8" onClick={() => onSectionClick("personalInfo")}>
        <h1 className="text-4xl font-bold mb-2" style={dynamicTextStyle}>
          {data.personalInfo.name}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">{data.personalInfo.title}</h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-200">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" style={dynamicTextStyle} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" style={dynamicTextStyle} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" style={dynamicTextStyle} />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <a
              href={data.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Globe className="w-4 h-4" style={dynamicTextStyle} />
              <span>{data.personalInfo.website}</span>
            </a>
          )}
          {data.personalInfo.linkedin && (
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Linkedin className="w-4 h-4" style={dynamicTextStyle} />
              <span>LinkedIn</span>
            </a>
          )}
          {data.personalInfo.github && (
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Github className="w-4 h-4" style={dynamicTextStyle} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Summary */}
      {data.summary && (
        <section className="mb-8" onClick={() => onSectionClick("summary")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Resumen Profesional
          </h3>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8" onClick={() => onSectionClick("experience")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Experiencia Laboral
          </h3>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <h4 className="text-xl font-semibold" style={dynamicTextStyle}>
                  {exp.position}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 flex justify-between items-center text-sm mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.period}</span>
                </p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-8" onClick={() => onSectionClick("education")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Educación
          </h3>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index}>
                <h4 className="text-xl font-semibold" style={dynamicTextStyle}>
                  {edu.degree}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 flex justify-between items-center text-sm mb-1">
                  <span>{edu.institution}</span>
                  <span>{edu.period}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-200 text-sm">{edu.details}</p>
                {edu.gpa && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(data.technicalSkills.length > 0 || data.softSkills.length > 0) && (
        <section className="mb-8" onClick={() => onSectionClick("skills")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Habilidades
          </h3>
          {data.technicalSkills.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Técnicas</h4>
              <p className="text-gray-700 dark:text-gray-200 text-sm">{data.technicalSkills.join(", ")}</p>
            </div>
          )}
          {data.softSkills.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Interpersonales</h4>
              <p className="text-gray-700 dark:text-gray-200 text-sm">{data.softSkills.join(", ")}</p>
            </div>
          )}
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-8" onClick={() => onSectionClick("projects")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Proyectos Destacados
          </h3>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h4 className="text-xl font-semibold" style={dynamicTextStyle}>
                  {project.name}
                </h4>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mb-1"
                  >
                    <Link className="w-4 h-4" />
                    {project.link}
                  </a>
                )}
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    Tecnologías: {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mb-8" onClick={() => onSectionClick("languages")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Idiomas
          </h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm space-y-1">
            {data.languages.map((lang, index) => (
              <li key={index}>
                <span className="font-semibold">{lang.language}:</span> {lang.level}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-8" onClick={() => onSectionClick("certifications")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Certificaciones
          </h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm space-y-1">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Interests */}
      {data.interests.length > 0 && (
        <section className="mb-8" onClick={() => onSectionClick("interests")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Intereses
          </h3>
          <p className="text-gray-700 dark:text-gray-200 text-sm">{data.interests.join(", ")}</p>
        </section>
      )}

      {/* Keywords (ATS specific) */}
      {data.keywords.length > 0 && (
        <section className="mb-8" onClick={() => onSectionClick("keywords")}>
          <h3 className="text-2xl font-bold mb-4" style={dynamicTextStyle}>
            Palabras Clave (ATS)
          </h3>
          <p className="text-gray-700 dark:text-gray-200 text-sm">{data.keywords.join(", ")}</p>
        </section>
      )}

      {/* Portfolio/QR Code Section (Optional for Minimal, but included if data exists) */}
      {(data.personalInfo.portfolioTitle || data.personalInfo.qrCodeImage) && (
        <section className="text-center mt-8" onClick={() => onSectionClick("personalInfo")}>
          <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2" style={dynamicTextStyle}>
            <QrCode className="w-6 h-6" /> {data.personalInfo.portfolioTitle || "Mi Portfolio"}
          </h3>
          {data.personalInfo.portfolioDescription && (
            <p className="text-gray-700 dark:text-gray-200 mb-4">{data.personalInfo.portfolioDescription}</p>
          )}
          {data.personalInfo.qrCodeImage && (
            <div className="flex justify-center mb-4">
              <img
                src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
                alt="QR Code"
                className="w-32 h-32 object-contain border border-gray-200 dark:border-gray-700 rounded-md"
              />
            </div>
          )}
          {data.personalInfo.portfolioWebsite && (
            <a
              href={data.personalInfo.portfolioWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                customTagPrimaryColor ? "" : currentTheme.primary
              } text-white hover:opacity-90`}
              style={customTagPrimaryColor ? { backgroundColor: customTagPrimaryColor } : {}}
            >
              <Link className="w-5 h-5" />
              Visitar Portfolio
            </a>
          )}
        </section>
      )}
    </div>
  )
}
