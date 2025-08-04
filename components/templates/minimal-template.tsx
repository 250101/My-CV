import { Mail, Phone, MapPin, Globe } from "lucide-react"

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  profilePhoto: string
  profilePhotoBackgroundColor?: string // Add this line
  portfolioTitle: string
  portfolioDescription: string
  portfolioWebsite: string
  qrCodeImage?: string
}

interface Experience {
  position: string
  company: string
  period: string
  achievements: string[]
}

interface Education {
  id: string
  degree: string
  institution: string
  period: string
  details: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  imageUrls?: string[] // Changed to array
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
}

interface MinimalTemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  profilePhotoBackgroundColor?: string // New prop
}

export default function MinimalTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor, // Destructure new prop
}: MinimalTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "#10B981", // Hex for direct use
        secondaryColor: "#22C55E", // Hex for direct use
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "#16A34A", // green-600
      },
      blue: {
        primaryColor: "#3B82F6", // blue-500
        secondaryColor: "#9333EA", // purple-500
      },
      green: {
        primaryColor: "#22C55E", // green-500
        secondaryColor: "#3B82F6", // blue-500
      },
      purple: {
        primaryColor: "#9333EA", // purple-500
        secondaryColor: "#EC4899", // pink-500
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.teal
  }

  const colors = getThemeColors()

  // Determine background color
  const finalBgColor = customBackgroundColor || (isDarkMode ? "#1F2937" : "#FFFFFF") // gray-900 or white
  // Determine text color
  const finalTextColor = customTextColor === "white" ? "white" : "rgb(17, 24, 39)" // gray-900
  const finalSecondaryTextColor = customTextColor === "white" ? "rgb(209, 213, 219)" : "rgb(75, 85, 99)" // gray-300 or gray-600

  const borderColor = isDarkMode ? "rgb(75, 85, 99)" : "rgb(229, 231, 235)" // gray-600 or gray-200
  const bulletColor = isDarkMode ? "rgb(156, 163, 175)" : "rgb(156, 163, 175)" // gray-400

  // Tag colors logic
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? colors.primaryColor // Use direct RGB for primary
      : colors.secondaryColor // Use direct RGB for secondary
    const defaultText = "white" // Default text color for tags

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
    }
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-12`}
      style={{
        backgroundColor: finalBgColor,
        color: finalTextColor,
      }}
    >
      {/* Header Minimalista */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-light mb-2 tracking-wide`} style={{ color: finalTextColor }}>
          {data.personalInfo.name}
        </h1>
        <h2 className={`text-lg mb-6 font-light`} style={{ color: finalSecondaryTextColor }}>
          {data.personalInfo.title}
        </h2>

        <div className={`flex justify-center gap-8 text-sm`} style={{ color: finalSecondaryTextColor }}>
          <span className="flex items-center gap-2">
            <Mail className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
            {data.personalInfo.email}
          </span>
          <span className="flex items-center gap-2">
            <Phone className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
            {data.personalInfo.phone}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
            {data.personalInfo.location}
          </span>
          <span className="flex items-center gap-2">
            <Globe className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
            {data.personalInfo.linkedin}
          </span>
        </div>
      </div>

      {/* Resumen */}
      <section className="mb-12">
        <p
          className={`leading-relaxed text-center max-w-3xl mx-auto font-light text-lg`}
          style={{ color: finalSecondaryTextColor }}
        >
          {data.summary}
        </p>
      </section>

      {/* Experiencia */}
      <section className="mb-12">
        <h3 className={`text-xl font-light mb-8 text-center tracking-wide`} style={{ color: finalTextColor }}>
          EXPERIENCIA
        </h3>

        <div className="space-y-8">
          {data.experience.map((exp, index) => (
            <div key={index} className={`pl-8 relative`} style={{ borderLeft: `2px solid ${borderColor}` }}>
              <div
                className={`absolute w-3 h-3 rounded-full -left-2 top-2`}
                style={{ backgroundColor: bulletColor }}
              ></div>

              <div className="mb-4">
                <h4 className={`text-lg font-medium`} style={{ color: finalTextColor }}>
                  {exp.position}
                </h4>
                <p className={`font-light`} style={{ color: finalSecondaryTextColor }}>
                  {exp.company}
                </p>
                <p className={`text-sm`} style={{ color: finalSecondaryTextColor }}>
                  {exp.period}
                </p>
              </div>

              <ul className={`space-y-2 font-light`} style={{ color: finalSecondaryTextColor }}>
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="leading-relaxed">
                    • {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Educación */}
      <section className="mb-12">
        <h3 className={`text-xl font-light mb-8 text-center tracking-wide`} style={{ color: finalTextColor }}>
          EDUCACIÓN
        </h3>

        {data.education.map((edu) => (
          <div key={edu.id} className="text-center">
            <h4 className={`text-lg font-medium`} style={{ color: finalTextColor }}>
              {edu.degree}
            </h4>
            <p className={`font-light`} style={{ color: finalSecondaryTextColor }}>
              {edu.institution}
            </p>
            <p className={`text-sm`} style={{ color: finalSecondaryTextColor }}>
              {edu.period}
            </p>
            <p className={`mt-2 font-light`} style={{ color: finalSecondaryTextColor }}>
              {edu.details}
            </p>
          </div>
        ))}
      </section>

      {/* Habilidades */}
      <section className="mb-12">
        <h3 className={`text-xl font-light mb-8 text-center tracking-wide`} style={{ color: finalTextColor }}>
          HABILIDADES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <h4 className={`font-medium mb-4`} style={{ color: finalTextColor }}>
              Técnicas
            </h4>
            <p
              className={`px-3 py-1 rounded-full text-sm font-light leading-relaxed inline-block`}
              style={getTagStyle(true)}
            >
              {data.technicalSkills.join(" • ")}
            </p>
          </div>

          <div className="text-center">
            <h4 className={`font-medium mb-4`} style={{ color: finalTextColor }}>
              Interpersonales
            </h4>
            <p
              className={`px-3 py-1 rounded-full text-sm font-light leading-relaxed inline-block`}
              style={getTagStyle(false)}
            >
              {data.softSkills.join(" • ")}
            </p>
          </div>
        </div>
      </section>

      {/* Idiomas */}
      <section className="mb-12">
        <h3 className={`text-xl font-light mb-8 text-center tracking-wide`} style={{ color: finalTextColor }}>
          IDIOMAS
        </h3>

        <div className="flex justify-center gap-8">
          {data.languages.map((lang) => (
            <div key={lang.id} className="text-center">
              <p className={`font-medium`} style={{ color: finalTextColor }}>
                {lang.language}
              </p>
              <p className={`font-light text-sm`} style={{ color: finalSecondaryTextColor }}>
                {lang.level}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certificaciones */}
      <section className="mb-12">
        <h3 className={`text-xl font-light mb-8 text-center tracking-wide`} style={{ color: finalTextColor }}>
          CERTIFICACIONES
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {data.certifications.map((cert) => (
            <span key={cert} className={`px-3 py-1 rounded-full text-sm font-medium`} style={getTagStyle(true)}>
              {cert}
            </span>
          ))}
        </div>
      </section>

      {/* Proyectos Destacados */}
      <section className="mb-12">
        <h3 className={`text-xl font-light mb-8 text-center tracking-wide`} style={{ color: finalTextColor }}>
          PROYECTOS DESTACADOS
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
                {project.imageUrls && project.imageUrls.length > 0 ? (
                  project.imageUrls.map((url, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={url || "/placeholder.svg?height=200&width=200"}
                      alt={`Proyecto ${project.name} imagen ${imgIndex + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  ))
                ) : (
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt={`Proyecto ${project.name} placeholder`}
                    className="w-full h-32 object-cover"
                  />
                )}
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
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Proyecto Placeholder 1"
                  className="w-full h-32 object-cover"
                />
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
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Proyecto Placeholder 2"
                  className="w-full h-32 object-cover"
                />
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
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Proyecto Placeholder 3"
                  className="w-full h-32 object-cover"
                />
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
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Proyecto Placeholder 4"
                  className="w-full h-32 object-cover"
                />
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
