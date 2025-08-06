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
  previewRef,
}: CorporateTemplateProps) {
  const themeColors = {
    teal: { 
      primary: "bg-teal-600", 
      text: "text-teal-600", 
      border: "border-teal-600",
      light: "bg-teal-50",
      dark: "bg-teal-900"
    },
    orange: { 
      primary: "bg-[rgb(242,89,13)]", 
      text: "text-[rgb(242,89,13)]", 
      border: "border-[rgb(242,89,13)]",
      light: "bg-orange-50",
      dark: "bg-orange-900"
    },
    blue: { 
      primary: "bg-blue-600", 
      text: "text-blue-600", 
      border: "border-blue-600",
      light: "bg-blue-50",
      dark: "bg-blue-900"
    },
    green: { 
      primary: "bg-green-600", 
      text: "text-green-600", 
      border: "border-green-600",
      light: "bg-green-50",
      dark: "bg-green-900"
    },
    purple: { 
      primary: "bg-purple-600", 
      text: "text-purple-600", 
      border: "border-purple-600",
      light: "bg-purple-50",
      dark: "bg-purple-900"
    },
  }

  const currentTheme = themeColors[selectedTheme as keyof typeof themeColors] || themeColors.orange

  const textColorClass = customTextColor === "black" ? "text-gray-900" : "text-white"
  const sectionTitleColorClass = customTextColor === "black" ? "text-gray-800" : "text-gray-200"
  const tagPrimaryColor = customTagPrimaryColor || currentTheme.primary
  const tagSecondaryColor = customTagSecondaryColor || "bg-gray-200"

  // Configuración de efectos visuales
  const visualEffects = {
    shadow: "shadow-lg",
    border: "border-2 border-gray-200",
    rounded: "rounded-lg",
    hover: "hover:shadow-xl transition-shadow duration-300",
    gradient: "bg-gradient-to-br from-white to-gray-50",
    card: "bg-white shadow-md rounded-lg p-6 border border-gray-100"
  }

  return (
    <div
      ref={previewRef}
      className={cn(
        "corporate-template flex flex-col w-[794px] mx-auto",
        visualEffects.shadow,
        visualEffects.rounded,
        isDarkMode ? "bg-gray-900 text-gray-100" : visualEffects.gradient,
        customBackgroundColor && `!bg-[${customBackgroundColor}]`,
      )}
      style={customBackgroundColor ? { backgroundColor: customBackgroundColor } : {}}
    >
      {/* Header Section with enhanced styling */}
      <header className={cn(
        "p-8 text-white flex items-center gap-6 relative overflow-hidden",
        currentTheme.primary,
        visualEffects.shadow
      )}>
        {/* Background pattern for visual appeal */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
        </div>
        
        {data.personalInfo.profilePhoto && (
          <div
            className={cn(
              "relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-4 border-white",
              visualEffects.shadow
            )}
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
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-1">{data.personalInfo.name}</h1>
          <h2 className="text-2xl font-light">{data.personalInfo.title}</h2>
        </div>
      </header>

      {/* Main Content with improved layout */}
      <div className="flex flex-grow">
        {/* Left Column (Contact & Skills) */}
        <aside className={cn(
          "w-1/3 p-8",
          isDarkMode ? "bg-gray-800" : "bg-gray-50",
          visualEffects.border
        )}>
          <section className={cn("mb-8", visualEffects.card)}>
            <h3 className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}>
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              {data.personalInfo.email && (
                <li className={cn("flex items-center gap-3 p-2 rounded", visualEffects.hover)}>
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{data.personalInfo.email}</span>
                </li>
              )}
              {data.personalInfo.phone && (
                <li className={cn("flex items-center gap-3 p-2 rounded", visualEffects.hover)}>
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{data.personalInfo.phone}</span>
                </li>
              )}
              {data.personalInfo.location && (
                <li className={cn("flex items-center gap-3 p-2 rounded", visualEffects.hover)}>
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{data.personalInfo.location}</span>
                </li>
              )}
              {data.personalInfo.website && (
                <li className={cn("flex items-center gap-3 p-2 rounded", visualEffects.hover)}>
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={`https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {data.personalInfo.website}
                  </a>
                </li>
              )}
              {data.personalInfo.linkedin && (
                <li className={cn("flex items-center gap-3 p-2 rounded", visualEffects.hover)}>
                  <Linkedin className="h-4 w-4 text-gray-500" />
                  <a href={`https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {data.personalInfo.linkedin}
                  </a>
                </li>
              )}
              {data.personalInfo.github && (
                <li className={cn("flex items-center gap-3 p-2 rounded", visualEffects.hover)}>
                  <Github className="h-4 w-4 text-gray-500" />
                  <a href={`https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {data.personalInfo.github}
                  </a>
                </li>
              )}
            </ul>
          </section>

          {data.technicalSkills.length > 0 && (
            <section className={cn("mb-8", visualEffects.card)}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Habilidades Técnicas
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.technicalSkills.map((skill, index) => (
                  <span
                    key={index}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      currentTheme.primary,
                      "text-white",
                      visualEffects.hover
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.softSkills.length > 0 && (
            <section className={cn("mb-8", visualEffects.card)}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Habilidades Blandas
              </h3>
              <ul className="space-y-2 text-sm">
                {data.softSkills.map((skill, index) => (
                  <li key={index} className={cn("flex items-center gap-2 p-2 rounded", visualEffects.hover)}>
                    <span className={cn("w-2 h-2 rounded-full", currentTheme.primary)}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.languages.length > 0 && (
            <section className={cn("mb-8", visualEffects.card)}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Idiomas
              </h3>
              <ul className="space-y-2 text-sm">
                {data.languages.map((lang) => (
                  <li key={lang.id} className={cn("flex justify-between items-center p-2 rounded", visualEffects.hover)}>
                    <span className="font-medium">{lang.language}</span>
                    <span className={cn("px-2 py-1 rounded text-xs", currentTheme.light, currentTheme.text)}>
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.certifications.length > 0 && (
            <section className={cn("mb-8", visualEffects.card)}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Certificaciones
              </h3>
              <ul className="space-y-2 text-sm">
                {data.certifications.map((cert, index) => (
                  <li key={index} className={cn("flex items-center gap-2 p-2 rounded", visualEffects.hover)}>
                    <span className={cn("w-2 h-2 rounded-full", currentTheme.primary)}></span>
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.interests.length > 0 && (
            <section className={visualEffects.card}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Intereses
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest, index) => (
                  <span
                    key={index}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm",
                      currentTheme.light,
                      currentTheme.text,
                      visualEffects.hover
                    )}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column (Summary, Experience, Education, Projects) */}
        <main className="w-2/3 p-8">
          {data.summary && (
            <section className={cn("mb-8", visualEffects.card)}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Resumen Profesional
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className={cn("mb-8", visualEffects.card)}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Experiencia Laboral
              </h3>
              {data.experience.map((exp) => (
                <div key={exp.id} className={cn("mb-6 last:mb-0 p-4 rounded-lg", visualEffects.hover)}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={cn("text-md font-semibold", currentTheme.text)}>{exp.position}</h4>
                    <span className={cn("px-2 py-1 rounded text-xs", currentTheme.light, currentTheme.text)}>
                      {exp.period}
                    </span>
                  </div>
                  <p className={cn("text-sm font-medium mb-3", currentTheme.text)}>
                    {exp.company}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={cn("w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0", currentTheme.primary)}></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                      {exp.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className={cn(
                            "px-2 py-1 rounded-md text-xs font-medium",
                            currentTheme.light,
                            currentTheme.text
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
            <section className={cn("mb-8", visualEffects.card)}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Educación
              </h3>
              {data.education.map((edu) => (
                <div key={edu.id} className={cn("mb-4 last:mb-0 p-4 rounded-lg", visualEffects.hover)}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={cn("text-md font-semibold", currentTheme.text)}>{edu.degree}</h4>
                    <span className={cn("px-2 py-1 rounded text-xs", currentTheme.light, currentTheme.text)}>
                      {edu.period}
                    </span>
                  </div>
                  <p className={cn("text-sm font-medium mb-2", currentTheme.text)}>
                    {edu.institution}
                  </p>
                  {edu.details && <p className="text-sm text-gray-700 mb-1">{edu.details}</p>}
                  {edu.gpa && (
                    <p className={cn("text-sm font-medium", currentTheme.text)}>
                      GPA: <span className="font-bold">{edu.gpa}</span>
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.projects.length > 0 && (
            <section className={cn("mb-8", visualEffects.card)}>
              <h3
                className={cn("text-lg font-semibold mb-4 pb-2 border-b", currentTheme.border, sectionTitleColorClass)}
              >
                Proyectos Destacados
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {data.projects.map((project) => (
                  <div key={project.id} className={cn("flex gap-4 p-4 rounded-lg", visualEffects.hover)}>
                    {project.imageUrls && project.imageUrls.length > 0 && (
                      <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden shadow-md">
                        <Image
                          src={project.imageUrls[0] || "/placeholder.svg"}
                          alt={project.name}
                          layout="fill"
                          objectFit="cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className={cn("text-md font-semibold mb-2", currentTheme.text)}>{project.name}</h4>
                      {project.description && (
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                      )}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className={cn(
                                "px-2 py-1 rounded-md text-xs font-medium",
                                currentTheme.light,
                                currentTheme.text
                              )}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={`https://${project.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1 text-sm font-medium",
                            currentTheme.text,
                            "hover:underline"
                          )}
                        >
                          Ver proyecto →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
