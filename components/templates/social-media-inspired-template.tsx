"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Link, QrCode } from "lucide-react"
import type { CurriculumData } from "../curriculum-editor"
import type { RefObject } from "react" // Import RefObject

interface SocialMediaInspiredTemplateProps {
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
  orange: { primary: "bg-orange-500", secondary: "text-orange-500" },
  teal: { primary: "bg-teal-500", secondary: "text-teal-500" },
  blue: { primary: "bg-blue-500", secondary: "text-blue-500" },
  green: { primary: "bg-green-500", secondary: "text-green-500" },
  purple: { primary: "bg-purple-500", secondary: "text-purple-500" },
}

export default function SocialMediaInspiredTemplate({
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
}: SocialMediaInspiredTemplateProps) {
  const currentTheme = themeColors[selectedTheme] || themeColors.orange
  const bgColorClass = customBackgroundColor ? "" : currentTheme.primary
  const textColorClass = customTextColor ? "" : currentTheme.secondary
  const tagPrimaryColorClass = customTagPrimaryColor ? "" : "bg-blue-500"
  const tagSecondaryColorClass = customTagSecondaryColor ? "" : "bg-green-500"

  const dynamicBgStyle = customBackgroundColor ? { backgroundColor: customBackgroundColor } : {}
  const dynamicTextStyle = customTextColor ? { color: customTextColor } : {}
  const dynamicTagPrimaryStyle = customTagPrimaryColor ? { backgroundColor: customTagPrimaryColor } : {}
  const dynamicTagSecondaryStyle = customTagSecondaryColor ? { color: customTagSecondaryColor } : {}

  return (
    <div
      ref={previewRef} // Apply the ref here
      className={`font-sans p-6 shadow-lg mx-auto my-4 max-w-2xl rounded-lg ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
      style={dynamicBgStyle}
    >
      {/* Header / Profile Card */}
      <div
        className={`relative ${bgColorClass} h-32 rounded-t-lg`}
        style={dynamicBgStyle}
        onClick={() => onSectionClick("personalInfo")}
      >
        <div className="absolute -bottom-16 left-4">
          <div className="p-1 rounded-full" style={{ backgroundColor: profilePhotoBackgroundColor || "transparent" }}>
            <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-800 shadow-md">
              <AvatarImage src={data.personalInfo.profilePhoto || "/placeholder.svg?height=112&width=112"} />
              <AvatarFallback>{data.personalInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="pt-20 px-4 pb-4">
        <h1 className="text-3xl font-bold" style={dynamicTextStyle}>
          {data.personalInfo.name}
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4">{data.personalInfo.title}</h2>

        <div className="flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-200 mb-4">
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
      </div>

      <Separator className="mb-6" />

      {/* Summary */}
      {data.summary && (
        <section className="mb-6 px-4" onClick={() => onSectionClick("summary")}>
          <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
            Resumen
          </h3>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6 px-4" onClick={() => onSectionClick("experience")}>
          <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
            Experiencia
          </h3>
          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-300 pl-4">
                <h4 className="text-lg font-semibold" style={dynamicTextStyle}>
                  {exp.position}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                  {exp.company} | {exp.period}
                </p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm space-y-0.5">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                {exp.keywords && exp.keywords.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {exp.keywords.map((keyword, i) => (
                      <Badge
                        key={i}
                        className={`px-2 py-0.5 rounded-full text-xs ${tagPrimaryColorClass}`}
                        style={dynamicTagPrimaryStyle}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6 px-4" onClick={() => onSectionClick("education")}>
          <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
            Educación
          </h3>
          <div className="space-y-5">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-gray-300 pl-4">
                <h4 className="text-lg font-semibold" style={dynamicTextStyle}>
                  {edu.degree}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                  {edu.institution} | {edu.period}
                </p>
                <p className="text-gray-700 dark:text-gray-200 text-sm">{edu.details}</p>
                {edu.gpa && <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6 px-4" onClick={() => onSectionClick("projects")}>
          <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
            Proyectos
          </h3>
          <div className="space-y-5">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-gray-300 pl-4">
                <h4 className="text-lg font-semibold" style={dynamicTextStyle}>
                  {project.name}
                </h4>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mb-1"
                  >
                    <Link className="w-3 h-3" />
                    {project.link}
                  </a>
                )}
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        className={`px-2 py-0.5 rounded-full text-xs ${tagSecondaryColorClass}`}
                        style={dynamicTagSecondaryStyle}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {/* Skills */}
        {(data.technicalSkills.length > 0 || data.softSkills.length > 0) && (
          <section onClick={() => onSectionClick("skills")}>
            <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
              Habilidades
            </h3>
            {data.technicalSkills.length > 0 && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Técnicas</h4>
                <div className="flex flex-wrap gap-2">
                  {data.technicalSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      className={`px-3 py-1 rounded-full ${tagPrimaryColorClass}`}
                      style={dynamicTagPrimaryStyle}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {data.softSkills.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Interpersonales</h4>
                <div className="flex flex-wrap gap-2">
                  {data.softSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      className={`px-3 py-1 rounded-full ${tagSecondaryColorClass}`}
                      style={dynamicTagSecondaryStyle}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section onClick={() => onSectionClick("languages")}>
            <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
              Idiomas
            </h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-200 text-sm">
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
          <section onClick={() => onSectionClick("certifications")}>
            <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
              Certificaciones
            </h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm space-y-0.5">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Interests */}
        {data.interests.length > 0 && (
          <section onClick={() => onSectionClick("interests")}>
            <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
              Intereses
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
                  }`}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Portfolio/QR Code Section */}
        {(data.personalInfo.portfolioTitle || data.personalInfo.qrCodeImage) && (
          <section className="md:col-span-2 text-center mt-6" onClick={() => onSectionClick("personalInfo")}>
            <h3 className="text-2xl font-bold mb-3" style={dynamicTextStyle}>
              <QrCode className="inline-block w-6 h-6 mr-2" /> {data.personalInfo.portfolioTitle || "Mi Portfolio"}
            </h3>
            {data.personalInfo.portfolioDescription && (
              <p className="text-gray-700 dark:text-gray-200 mb-3">{data.personalInfo.portfolioDescription}</p>
            )}
            {data.personalInfo.qrCodeImage && (
              <div className="flex justify-center mb-3">
                <img
                  src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
                  alt="QR Code"
                  className="w-28 h-28 object-contain border border-gray-200 dark:border-gray-700 rounded-md"
                />
              </div>
            )}
            {data.personalInfo.portfolioWebsite && (
              <a
                href={data.personalInfo.portfolioWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${bgColorClass} text-white hover:opacity-90 text-sm`}
                style={dynamicBgStyle}
              >
                <Link className="w-4 h-4" />
                Visitar Portfolio
              </a>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
