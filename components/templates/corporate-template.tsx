"use client"

import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Globe, Code, Heart, Link, QrCode } from "lucide-react"
import type { CurriculumData } from "../curriculum-editor"
import type { RefObject } from "react" // Import RefObject

interface CorporateTemplateProps {
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
  orange: { primary: "bg-orange-700", secondary: "text-orange-700" },
  teal: { primary: "bg-teal-700", secondary: "text-teal-700" },
  blue: { primary: "bg-blue-700", secondary: "text-blue-700" },
  green: { primary: "bg-green-700", secondary: "text-green-700" },
  purple: { primary: "bg-purple-700", secondary: "text-purple-700" },
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
  onSectionClick,
  previewRef, // Destructure the new prop
}: CorporateTemplateProps) {
  const currentTheme = themeColors[selectedTheme] || themeColors.orange
  const primaryColorClass = customBackgroundColor ? "" : currentTheme.primary
  const secondaryTextColorClass = customTextColor ? "" : currentTheme.secondary

  const dynamicPrimaryBgStyle = customBackgroundColor ? { backgroundColor: customBackgroundColor } : {}
  const dynamicSecondaryTextStyle = customTextColor ? { color: customTextColor } : {}
  const dynamicTagPrimaryStyle = customTagPrimaryColor ? { backgroundColor: customTagPrimaryColor } : {}
  const dynamicTagSecondaryStyle = customTagSecondaryColor ? { color: customTagSecondaryColor } : {}

  return (
    <div
      ref={previewRef} // Apply the ref here
      className={`font-sans shadow-lg mx-auto my-8 max-w-4xl grid grid-cols-3 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Left Sidebar */}
      <aside
        className={`col-span-1 p-6 ${primaryColorClass} text-white flex flex-col items-center`}
        style={dynamicPrimaryBgStyle}
      >
        <div className="mb-6" onClick={() => onSectionClick("personalInfo")}>
          <div
            className="relative p-1 rounded-full"
            style={{ backgroundColor: profilePhotoBackgroundColor || "transparent" }}
          >
            <Avatar className="w-28 h-28 border-4 border-white shadow-md">
              <AvatarImage src={data.personalInfo.profilePhoto || "/placeholder.svg?height=112&width=112"} />
              <AvatarFallback>{data.personalInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-2xl font-bold mt-4 text-center">{data.personalInfo.name}</h2>
          <p className="text-center text-sm opacity-90">{data.personalInfo.title}</p>
        </div>

        <Separator className="bg-white/30 mb-6 w-full" />

        <section className="mb-6 w-full" onClick={() => onSectionClick("personalInfo")}>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5" /> Contacto
          </h3>
          <ul className="text-sm space-y-2">
            {data.personalInfo.email && (
              <li>
                <a href={`mailto:${data.personalInfo.email}`} className="hover:underline">
                  {data.personalInfo.email}
                </a>
              </li>
            )}
            {data.personalInfo.phone && <li>{data.personalInfo.phone}</li>}
            {data.personalInfo.location && <li>{data.personalInfo.location}</li>}
            {data.personalInfo.website && (
              <li>
                <a
                  href={data.personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {data.personalInfo.website}
                </a>
              </li>
            )}
            {data.personalInfo.linkedin && (
              <li>
                <a
                  href={data.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {data.personalInfo.github && (
              <li>
                <a
                  href={data.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </section>

        {data.technicalSkills.length > 0 && (
          <section className="mb-6 w-full" onClick={() => onSectionClick("skills")}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Code className="w-5 h-5" /> Habilidades Técnicas
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.technicalSkills.map((skill, index) => (
                <Badge
                  key={index}
                  className={`px-2 py-0.5 rounded-full text-xs bg-white text-gray-800`}
                  style={dynamicTagPrimaryStyle}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {data.softSkills.length > 0 && (
          <section className="mb-6 w-full" onClick={() => onSectionClick("skills")}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5" /> Habilidades Interpersonales
            </h3>
            <ul className="text-sm space-y-1">
              {data.softSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {data.languages.length > 0 && (
          <section className="mb-6 w-full" onClick={() => onSectionClick("languages")}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5" /> Idiomas
            </h3>
            <ul className="text-sm space-y-1">
              {data.languages.map((lang, index) => (
                <li key={index}>
                  <span className="font-semibold">{lang.language}:</span> {lang.level}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.interests.length > 0 && (
          <section className="mb-6 w-full" onClick={() => onSectionClick("interests")}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5" /> Intereses
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest, index) => (
                <Badge
                  key={index}
                  className={`px-2 py-0.5 rounded-full text-xs bg-white text-gray-800`}
                  style={dynamicTagSecondaryStyle}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {(data.personalInfo.portfolioTitle || data.personalInfo.qrCodeImage) && (
          <section className="w-full text-center mt-auto" onClick={() => onSectionClick("personalInfo")}>
            <h3 className="text-lg font-semibold mb-3 flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" /> {data.personalInfo.portfolioTitle || "Portfolio"}
            </h3>
            {data.personalInfo.qrCodeImage && (
              <div className="flex justify-center mb-3">
                <img
                  src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
                  alt="QR Code"
                  className="w-24 h-24 object-contain bg-white p-1 rounded-md"
                />
              </div>
            )}
            {data.personalInfo.portfolioWebsite && (
              <a
                href={data.personalInfo.portfolioWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm hover:underline"
              >
                <Link className="w-4 h-4" />
                Visitar Sitio
              </a>
            )}
          </section>
        )}
      </aside>

      {/* Right Content */}
      <div className="col-span-2 p-8">
        {/* Summary */}
        {data.summary && (
          <section className="mb-8" onClick={() => onSectionClick("summary")}>
            <h3 className="text-2xl font-bold mb-4" style={dynamicSecondaryTextStyle}>
              Resumen Profesional
            </h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8" onClick={() => onSectionClick("experience")}>
            <h3 className="text-2xl font-bold mb-4" style={dynamicSecondaryTextStyle}>
              Experiencia Laboral
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <h4 className="text-xl font-semibold" style={dynamicSecondaryTextStyle}>
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
            <h3 className="text-2xl font-bold mb-4" style={dynamicSecondaryTextStyle}>
              Educación
            </h3>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h4 className="text-xl font-semibold" style={dynamicSecondaryTextStyle}>
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

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-8" onClick={() => onSectionClick("projects")}>
            <h3 className="text-2xl font-bold mb-4" style={dynamicSecondaryTextStyle}>
              Proyectos Destacados
            </h3>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <h4 className="text-xl font-semibold" style={dynamicSecondaryTextStyle}>
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
                  {project.imageUrls && project.imageUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.imageUrls.map((url, i) => (
                        <img
                          key={i}
                          src={url || "/placeholder.svg?height=80&width=80"}
                          alt={`Project Image ${i + 1}`}
                          className="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section className="mb-8" onClick={() => onSectionClick("certifications")}>
            <h3 className="text-2xl font-bold mb-4" style={dynamicSecondaryTextStyle}>
              Certificaciones
            </h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm space-y-1">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Keywords (ATS specific) */}
        {data.keywords.length > 0 && (
          <section className="mb-8" onClick={() => onSectionClick("keywords")}>
            <h3 className="text-2xl font-bold mb-4" style={dynamicSecondaryTextStyle}>
              Palabras Clave (ATS)
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">{data.keywords.join(", ")}</p>
          </section>
        )}
      </div>
    </div>
  )
}
