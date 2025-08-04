import { Mail, Phone, MapPin, Globe, Code } from "lucide-react"

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
  profilePhotoBackgroundColor?: string
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
}: MinimalTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "#10B981",
        secondaryColor: "#22C55E",
        lightBg: "#FFFFFF",
        darkBg: "#1F2937",
        lightText: "#1F2937",
        darkText: "#F9FAFB",
        lightSecondaryText: "#4B5563",
        darkSecondaryText: "#D1D5DB",
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "#16A34A",
        lightBg: "#FFFFFF",
        darkBg: "#1F2937",
        lightText: "#1F2937",
        darkText: "#F9FAFB",
        lightSecondaryText: "#4B5563",
        darkSecondaryText: "#D1D5DB",
      },
      blue: {
        primaryColor: "#3B82F6",
        secondaryColor: "#9333EA",
        lightBg: "#FFFFFF",
        darkBg: "#1F2937",
        lightText: "#1F2937",
        darkText: "#F9FAFB",
        lightSecondaryText: "#4B5563",
        darkSecondaryText: "#D1D5DB",
      },
      green: {
        primaryColor: "#22C55E",
        secondaryColor: "#3B82F6",
        lightBg: "#FFFFFF",
        darkBg: "#1F2937",
        lightText: "#1F2937",
        darkText: "#F9FAFB",
        lightSecondaryText: "#4B5563",
        darkSecondaryText: "#D1D5DB",
      },
      purple: {
        primaryColor: "#9333EA",
        secondaryColor: "#EC4899",
        lightBg: "#FFFFFF",
        darkBg: "#1F2937",
        lightText: "#1F2937",
        darkText: "#F9FAFB",
        lightSecondaryText: "#4B5563",
        darkSecondaryText: "#D1D5DB",
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.orange
  }

  const colors = getThemeColors()

  const finalBgColor = customBackgroundColor || (isDarkMode ? colors.darkBg : colors.lightBg)
  const finalTextColor = customTextColor === "white" ? colors.darkText : colors.lightText
  const finalSecondaryTextColor = customTextColor === "white" ? colors.darkSecondaryText : colors.lightSecondaryText

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
        ? colors.darkSecondaryText
        : colors.lightSecondaryText

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
      border: "1px solid transparent", // Add a subtle border
      borderColor: isDarkMode ? "rgba(255,255,255,0.2)" : "rgb(209, 213, 219)", // gray-300
    }
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-8 shadow-2xl print:shadow-none`}
      style={{
        backgroundColor: finalBgColor,
        color: finalTextColor,
        fontFamily: "sans-serif", // Minimalist font
      }}
    >
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className={`text-4xl font-bold mb-1`} style={{ color: finalTextColor }}>
          {data.personalInfo.name}
        </h1>
        <h2 className={`text-xl font-medium`} style={{ color: finalSecondaryTextColor }}>
          {data.personalInfo.title}
        </h2>
        <div
          className={`flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-sm`}
          style={{ color: finalSecondaryTextColor }}
        >
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
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalSecondaryTextColor }}>
          Resumen Profesional
        </h3>
        <p className={`text-sm leading-relaxed`} style={{ color: finalSecondaryTextColor }}>
          {data.summary}
        </p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalSecondaryTextColor }}>
          Experiencia Laboral
        </h3>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="text-sm">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className={`font-semibold`} style={{ color: finalTextColor }}>
                  {exp.position} - {exp.company}
                </h4>
                <span style={{ color: finalSecondaryTextColor }}>{exp.period}</span>
              </div>
              <ul className={`list-disc list-inside space-y-0.5`} style={{ color: finalSecondaryTextColor }}>
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
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalSecondaryTextColor }}>
          Educación
        </h3>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="text-sm">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className={`font-semibold`} style={{ color: finalTextColor }}>
                  {edu.degree}
                </h4>
                <span style={{ color: finalSecondaryTextColor }}>{edu.period}</span>
              </div>
              <p style={{ color: finalSecondaryTextColor }}>{edu.institution}</p>
              {edu.details && <p style={{ color: finalSecondaryTextColor }}>{edu.details}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalSecondaryTextColor }}>
          Habilidades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className={`font-semibold mb-1`} style={{ color: finalTextColor }}>
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
            <h4 className={`font-semibold mb-1`} style={{ color: finalTextColor }}>
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
          <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalSecondaryTextColor }}>
            Idiomas
          </h3>
          <ul className="text-sm space-y-1">
            {data.languages.map((lang) => (
              <li key={lang.id} className="flex justify-between">
                <span style={{ color: finalTextColor }}>{lang.language}</span>
                <span style={{ color: finalSecondaryTextColor }}>{lang.level}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalSecondaryTextColor }}>
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
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalSecondaryTextColor }}>
          Certificaciones
        </h3>
        <div className="flex flex-wrap gap-1 text-sm">
          {data.certifications.map((cert, i) => (
            <span key={i} className={`px-2 py-0.5 rounded text-xs`} style={getTagStyle(true)}>
              {cert}
            </span>
          ))}
        </div>
      </section>

      {/* Proyectos Destacados */}
      <section className="mb-6">
        <h3 className={`text-xl font-bold mb-2 pb-1 border-b`} style={{ borderColor: finalSecondaryTextColor }}>
          Proyectos Destacados
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.projects.length > 0 ? (
            data.projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-lg overflow-hidden shadow-md transition-colors`}
                style={{
                  backgroundColor: isDarkMode ? "rgb(31, 41, 55)" : "rgb(249, 250, 251)", // gray-900 or gray-100
                  border: isDarkMode ? `2px solid rgb(75, 85, 99)` : undefined,
                }}
              >
                <div className="flex flex-wrap justify-center gap-2 p-2">
                  {project.imageUrls && project.imageUrls.length > 0 ? (
                    project.imageUrls.map((url, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={url || "/placeholder.svg?height=100&width=100"}
                        alt={`Proyecto ${project.name} imagen ${imgIndex + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ))
                  ) : (
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt={`Proyecto ${project.name} placeholder`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  )}
                </div>
                <p className={`p-2 text-sm text-center`} style={{ color: finalSecondaryTextColor }}>
                  {project.name}
                </p>
              </div>
            ))
          ) : (
            <>
              <div
                className={`rounded-lg overflow-hidden shadow-md transition-colors`}
                style={{
                  backgroundColor: isDarkMode ? "rgb(31, 41, 55)" : "rgb(249, 250, 251)",
                  border: isDarkMode ? `2px solid rgb(75, 85, 99)` : undefined,
                }}
              >
                <div className="flex flex-wrap justify-center gap-2 p-2">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Proyecto Placeholder 1"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <p className={`p-2 text-sm text-center`} style={{ color: finalSecondaryTextColor }}>
                  [Nombre del Proyecto 1]
                </p>
              </div>
              <div
                className={`rounded-lg overflow-hidden shadow-md transition-colors`}
                style={{
                  backgroundColor: isDarkMode ? "rgb(31, 41, 55)" : "rgb(249, 250, 251)",
                  border: isDarkMode ? `2px solid rgb(75, 85, 99)` : undefined,
                }}
              >
                <div className="flex flex-wrap justify-center gap-2 p-2">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Proyecto Placeholder 2"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <p className={`p-2 text-sm text-center`} style={{ color: finalSecondaryTextColor }}>
                  [Nombre del Proyecto 2]
                </p>
              </div>
              <div
                className={`rounded-lg overflow-hidden shadow-md transition-colors`}
                style={{
                  backgroundColor: isDarkMode ? "rgb(31, 41, 55)" : "rgb(249, 250, 251)",
                  border: isDarkMode ? `2px solid rgb(75, 85, 99)` : undefined,
                }}
              >
                <div className="flex flex-wrap justify-center gap-2 p-2">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Proyecto Placeholder 3"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <p className={`p-2 text-sm text-center`} style={{ color: finalSecondaryTextColor }}>
                  [Nombre del Proyecto 3]
                </p>
              </div>
              <div
                className={`rounded-lg overflow-hidden shadow-md transition-colors`}
                style={{
                  backgroundColor: isDarkMode ? "rgb(31, 41, 55)" : "rgb(249, 250, 251)",
                  border: isDarkMode ? `2px solid rgb(75, 85, 99)` : undefined,
                }}
              >
                <div className="flex flex-wrap justify-center gap-2 p-2">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Proyecto Placeholder 4"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <p className={`p-2 text-sm text-center`} style={{ color: finalSecondaryTextColor }}>
                  [Nombre del Proyecto 4]
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
