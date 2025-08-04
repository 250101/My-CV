"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Heart,
  Link,
} from "lucide-react"
import type { CurriculumData } from "../curriculum-editor"
import type { RefObject } from "react" // Import RefObject

interface CreativeTemplateProps {
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
  orange: { primary: "bg-orange-400", secondary: "text-orange-600" },
  teal: { primary: "bg-teal-400", secondary: "text-teal-600" },
  blue: { primary: "bg-blue-400", secondary: "text-blue-600" },
  green: { primary: "bg-green-400", secondary: "text-green-600" },
  purple: { primary: "bg-purple-400", secondary: "text-purple-600" },
}

export default function CreativeTemplate({
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
}: CreativeTemplateProps) {
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
      className={`font-sans p-8 shadow-lg mx-auto my-8 max-w-4xl rounded-xl overflow-hidden ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Header Section */}
      <header
        className={`relative p-8 text-center rounded-t-xl ${primaryColorClass} text-white mb-8`}
        style={dynamicPrimaryBgStyle}
        onClick={() => onSectionClick("personalInfo")}
      >
        <div
          className="relative inline-block p-1 rounded-full mb-4"
          style={{ backgroundColor: profilePhotoBackgroundColor || "transparent" }}
        >
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={data.personalInfo.profilePhoto || "/placeholder.svg?height=128&width=128"} />
            <AvatarFallback>{data.personalInfo.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-4xl font-bold mb-1">{data.personalInfo.name}</h1>
        <h2 className="text-2xl font-semibold opacity-90">{data.personalInfo.title}</h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mt-4">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
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
              <Globe className="w-4 h-4" />
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
              <Linkedin className="w-4 h-4" />
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
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Summary */}
          {data.summary && (
            <section onClick={() => onSectionClick("summary")}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={dynamicSecondaryTextStyle}>
                <Briefcase className="w-6 h-6" /> Resumen Profesional
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section onClick={() => onSectionClick("experience")}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={dynamicSecondaryTextStyle}>
                <Briefcase className="w-6 h-6" /> Experiencia Laboral
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:h-full before:w-1 before:bg-gray-300"
                  >
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
                    {exp.keywords && exp.keywords.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {exp.keywords.map((keyword, i) => (
                          <Badge
                            key={i}
                            className={`px-2 py-0.5 rounded-full text-xs ${primaryColorClass} text-white`}
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

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section onClick={() => onSectionClick("projects")}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={dynamicSecondaryTextStyle}>
                <Code className="w-6 h-6" /> Proyectos Destacados
              </h3>
              <div className="space-y-6">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:h-full before:w-1 before:bg-gray-300"
                  >
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
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.map((tech, i) => (
                          <Badge
                            key={i}
                            className={`px-2 py-0.5 rounded-full text-xs ${primaryColorClass} text-white`}
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
        </div>

        {/* Right Column */}
        <div className="md:col-span-1 space-y-8">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section onClick={() => onSectionClick("education")}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={dynamicSecondaryTextStyle}>
                <GraduationCap className="w-6 h-6" /> Educación
              </h3>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="text-xl font-semibold" style={dynamicSecondaryTextStyle}>
                      {edu.degree}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
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

          {/* Skills (consolidated) */}
          {(data.technicalSkills.length > 0 || data.softSkills.length > 0) && (
            <section onClick={() => onSectionClick("skills")}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={dynamicSecondaryTextStyle}>
                <Code className="w-6 h-6" /> Habilidades
              </h3>
              {data.technicalSkills.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Técnicas</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.technicalSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        className={`px-3 py-1 rounded-full ${primaryColorClass} text-white`}
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
                        className={`px-3 py-1 rounded-full ${primaryColorClass} text-white`}
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
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={dynamicSecondaryTextStyle}>
                <Globe className="w-6 h-6" /> Idiomas
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-200">
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
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={dynamicSecondaryTextStyle}>
                <Award className="w-6 h-6" /> Certificaciones
              </h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 space-y-1">
                {data.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests */}
          {data.interests.length > 0 && (
            <section onClick={() => onSectionClick("interests")}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={dynamicSecondaryTextStyle}>
                <Heart className="w-6 h-6" /> Intereses
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`px-3 py-1 rounded-full ${
                      isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* Keywords (ATS specific) */}
          {data.keywords.length > 0 && (
            <section onClick={() => onSectionClick("keywords")}>
              <h3 className="text-2xl font-bold mb-4" style={dynamicSecondaryTextStyle}>
                <Code className="w-6 h-6" /> Palabras Clave (ATS)
              </h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm">{data.keywords.join(", ")}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
