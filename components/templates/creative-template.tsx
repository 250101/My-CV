import type { RefObject } from "react"
import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react"
import Image from "next/image"

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

interface CreativeTemplateProps {
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

export default function CreativeTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor,
  previewRef,
}: CreativeTemplateProps) {
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
        "creative-template flex w-[794px] mx-auto shadow-lg", // Removed min-h-[1122px]
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900",
        customBackgroundColor && `!bg-[${customBackgroundColor}]`,
      )}
      style={customBackgroundColor ? { backgroundColor: customBackgroundColor } : {}}
    >
      {/* Left Column (Sidebar) */}
      <aside className={cn("w-1/3 p-8 flex flex-col items-center text-center", currentTheme.primary)}>
        {data.personalInfo.profilePhoto && (
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg"
            style={profilePhotoBackgroundColor ? { backgroundColor: profilePhotoBackgroundColor } : {}}
          >
            <Image
              src={data.personalInfo.profilePhoto || "/placeholder.svg"}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              crossOrigin="anonymous"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-white mb-1">{data.personalInfo.name}</h1>
        <h2 className="text-xl font-light text-white opacity-90 mb-6">{data.personalInfo.title}</h2>

        <section className="mb-8 w-full">
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white border-opacity-50">
            Contacto
          </h3>
          <ul className="space-y-2 text-sm text-white opacity-90">
            {data.personalInfo.email && (
              <li className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{data.personalInfo.email}</span>
              </li>
            )}
            {data.personalInfo.phone && (
              <li className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{data.personalInfo.phone}</span>
              </li>
            )}
            {data.personalInfo.location && (
              <li className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{data.personalInfo.location}</span>
              </li>
            )}
            {data.personalInfo.website && (
              <li className="flex items-center justify-center gap-2">
                <Globe className="h-4 w-4" />
                <a href={`https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer">
                  {data.personalInfo.website}
                </a>
              </li>
            )}
            {data.personalInfo.linkedin && (
              <li className="flex items-center justify-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a href={`https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                  {data.personalInfo.linkedin}
                </a>
              </li>
            )}
            {data.personalInfo.github && (
              <li className="flex items-center justify-center gap-2">
                <Github className="h-4 w-4" />
                <a href={`https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                  {data.personalInfo.github}
                </a>
              </li>
            )}
          </ul>
        </section>

        {data.technicalSkills.length > 0 && (
          <section className="mb-8 w-full">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white border-opacity-50">
              Habilidades Técnicas
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {data.technicalSkills.map((skill, index) => (
                <span
                  key={index}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm text-white",
                    isDarkMode ? "bg-gray-700" : "bg-white bg-opacity-20",
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.softSkills.length > 0 && (
          <section className="mb-8 w-full">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white border-opacity-50">
              Habilidades Blandas
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {data.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm text-white",
                    isDarkMode ? "bg-gray-700" : "bg-white bg-opacity-20",
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.languages.length > 0 && (
          <section className="mb-8 w-full">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white border-opacity-50">
              Idiomas
            </h3>
            <ul className="list-disc list-inside text-sm text-white opacity-90 space-y-1">
              {data.languages.map((lang) => (
                <li key={lang.id}>
                  {lang.language} ({lang.level})
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.certifications.length > 0 && (
          <section className="mb-8 w-full">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white border-opacity-50">
              Certificaciones
            </h3>
            <ul className="list-disc list-inside text-sm text-white opacity-90 space-y-1">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {data.interests.length > 0 && (
          <section className="mb-8 w-full">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white border-opacity-50">
              Intereses
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {data.interests.map((interest, index) => (
                <span
                  key={index}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm text-white",
                    isDarkMode ? "bg-gray-700" : "bg-white bg-opacity-20",
                  )}
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}

        {(data.personalInfo.portfolioTitle || data.personalInfo.qrCodeImage) && (
          <section className="w-full mt-auto pt-8">
            {data.personalInfo.qrCodeImage && (
              <div className="w-32 h-32 relative mx-auto mb-4">
                <Image
                  src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
                  alt="QR Code"
                  layout="fill"
                  objectFit="contain"
                  crossOrigin="anonymous"
                />
              </div>
            )}
            {data.personalInfo.portfolioTitle && (
              <h4 className="text-lg font-semibold text-white">{data.personalInfo.portfolioTitle}</h4>
            )}
            {data.personalInfo.portfolioDescription && (
              <p className="text-sm text-white opacity-90 mt-1">{data.personalInfo.portfolioDescription}</p>
            )}
            {data.personalInfo.portfolioWebsite && (
              <p className="text-sm mt-2">
                <a
                  href={`https://${data.personalInfo.portfolioWebsite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white opacity-90"
                >
                  {data.personalInfo.portfolioWebsite}
                </a>
              </p>
            )}
          </section>
        )}
      </aside>

      {/* Right Column (Main Content) */}
      <main className={cn("w-2/3 p-8", isDarkMode ? "bg-gray-900" : "bg-white")}>
        {data.summary && (
          <section className="mb-8">
            <h3 className={cn("text-xl font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
              Resumen Profesional
            </h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-8">
            <h3 className={cn("text-xl font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
              Experiencia Laboral
            </h3>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <h4 className="text-lg font-semibold">{exp.position}</h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {exp.company} | {exp.period}
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
                {exp.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className={cn(
                          "px-2 py-0.5 rounded-md text-xs",
                          isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800",
                        )}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-8">
            <h3 className={cn("text-xl font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
              Educación
            </h3>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <h4 className="text-lg font-semibold">{edu.degree}</h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
            <h3 className={cn("text-xl font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
              Proyectos Destacados
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {data.projects.map((project) => (
                <div key={project.id} className="border rounded-lg overflow-hidden shadow-sm">
                  {project.imageUrls && project.imageUrls.length > 0 && (
                    <div className="relative h-40 w-full">
                      <Image
                        src={project.imageUrls[0] || "/placeholder.svg"}
                        alt={project.name}
                        layout="fill"
                        objectFit="cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{project.name}</h4>
                    {project.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                    )}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className={cn(
                              "px-2 py-0.5 rounded-md text-xs",
                              isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800",
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <p className="text-sm mt-2">
                        <a
                          href={`https://${project.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn("underline", currentTheme.text)}
                        >
                          Ver proyecto
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
