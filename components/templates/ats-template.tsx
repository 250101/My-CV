import type { RefObject } from "react"
import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react"

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
  profilePhotoBackgroundColor?: string
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
}: ATSTemplateProps) {
  const themeColors = {
    teal: { primary: "bg-teal-500", text: "text-teal-500", border: "border-teal-500" },
    orange: { primary: "bg-[rgb(242,89,13)]", text: "text-[rgb(242,89,13)]", border: "border-[rgb(242,89,13)]" },
    blue: { primary: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" },
    green: { primary: "bg-green-500", text: "text-green-500", border: "border-green-500" },
    purple: { primary: "bg-purple-500", text: "text-purple-500", border: "border-purple-500" },
  }

  const currentTheme = themeColors[selectedTheme as keyof typeof themeColors] || themeColors.orange

  const textColorClass = customTextColor === "black" ? "text-gray-900" : "text-white"
  const sectionTitleColorClass = customTextColor === "black" ? "text-gray-800" : "text-gray-200"
  const tagPrimaryColor = customTagPrimaryColor || currentTheme.primary
  const tagSecondaryColor = customTagSecondaryColor || "bg-gray-200"

  return (
    <div
      ref={previewRef}
      className={cn(
        "ats-template flex flex-col w-[794px] mx-auto shadow-lg p-8", // Removed min-h-[1122px]
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900",
        customBackgroundColor && `!bg-[${customBackgroundColor}]`,
      )}
      style={customBackgroundColor ? { backgroundColor: customBackgroundColor } : {}}
    >
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className={cn("text-4xl font-bold mb-1", textColorClass)}>{data.personalInfo.name}</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{data.personalInfo.title}</h2>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <a href={`https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer">
                {data.personalInfo.website}
              </a>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <a href={`https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                {data.personalInfo.linkedin}
              </a>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <a href={`https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                {data.personalInfo.github}
              </a>
            </div>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="mb-8">
          <h3 className={cn("text-xl font-bold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
            Resumen Profesional
          </h3>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.technicalSkills.length > 0 && (
        <section className="mb-8">
          <h3 className={cn("text-xl font-bold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
            Habilidades Técnicas
          </h3>
          <p className="text-sm">{data.technicalSkills.join(", ")}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8">
          <h3 className={cn("text-xl font-bold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
            Experiencia Laboral
          </h3>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <h4 className="text-lg font-semibold">{exp.position}</h4>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {exp.company} | {exp.period}
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                {exp.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
              {exp.keywords.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  **Palabras Clave:** {exp.keywords.join(", ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <h3 className={cn("text-xl font-bold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
            Educación
          </h3>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <h4 className="text-lg font-semibold">{edu.degree}</h4>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {edu.institution} | {edu.period}
              </p>
              {edu.details && <p className="text-sm mt-1">{edu.details}</p>}
              {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mb-8">
          <h3 className={cn("text-xl font-bold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
            Proyectos Destacados
          </h3>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4 last:mb-0">
              <h4 className="text-lg font-semibold">{project.name}</h4>
              {project.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
              )}
              {project.technologies.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  **Tecnologías:** {project.technologies.join(", ")}
                </p>
              )}
              {project.link && (
                <p className="text-sm mt-1">
                  **Enlace:**{" "}
                  <a
                    href={`https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("underline", currentTheme.text)}
                  >
                    {project.link}
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {data.certifications.length > 0 && (
        <section className="mb-8">
          <h3 className={cn("text-xl font-bold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
            Certificaciones
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      )}

      {data.interests.length > 0 && (
        <section className="mb-8">
          <h3 className={cn("text-xl font-bold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
            Intereses
          </h3>
          <p className="text-sm">{data.interests.join(", ")}</p>
        </section>
      )}
    </div>
  )
}
