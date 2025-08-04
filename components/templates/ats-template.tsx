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
  keywords: string[]
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
  keywords: string[]
  certifications: string[]
  projects: Project[]
}

interface ATSTemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  profilePhotoBackgroundColor?: string // New prop
}

export default function ATSTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor, // Destructure new prop
}: ATSTemplateProps) {
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
  const finalTextColor = customTextColor === "white" ? "white" : "black"
  const finalSecondaryTextColor = customTextColor === "white" ? "rgb(209, 213, 219)" : "rgb(55, 65, 81)" // gray-300 or gray-700

  const borderColor = isDarkMode ? "rgb(75, 85, 99)" : "rgb(209, 213, 219)" // gray-600 or gray-300

  // Tag colors logic
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? isDarkMode
        ? `rgba(${colors.primaryColor.replace("rgb(", "").replace(")", "")}, 0.2)`
        : `rgb(209, 250, 229)` // teal-100 equivalent
      : isDarkMode
        ? `rgba(${colors.secondaryColor.replace("rgb(", "").replace(")", "")}, 0.2)`
        : `rgb(220, 252, 231)` // green-100 equivalent
    const defaultText = isPrimaryTag
      ? isDarkMode
        ? colors.primaryColor
        : `rgb(13, 148, 136)` // teal-800 equivalent
      : isDarkMode
        ? "white"
        : `rgb(22, 101, 52)` // green-800 equivalent

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
    }
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-8`}
      style={{
        backgroundColor: finalBgColor,
        color: finalTextColor,
      }}
    >
      {/* Header - Simple y limpio para ATS */}
      <div className={`text-center mb-8 pb-6`} style={{ borderBottom: `2px solid ${borderColor}` }}>
        <h1 className={`text-3xl font-bold mb-2`} style={{ color: finalTextColor }}>
          {data.personalInfo.name}
        </h1>
        <h2 className={`text-xl mb-4`} style={{ color: finalSecondaryTextColor }}>
          {data.personalInfo.title}
        </h2>

        <div className={`flex flex-wrap justify-center gap-4 text-sm`} style={{ color: finalSecondaryTextColor }}>
          <span className="flex items-center gap-1">
            <Mail className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
            {data.personalInfo.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
            {data.personalInfo.phone}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
            <span className="text-sm">{data.personalInfo.location}</span>
          </span>
          {data.personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Globe className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
              <span className="text-sm">{data.personalInfo.linkedin}</span>
            </span>
          )}
          {data.personalInfo.qrCodeImage && (
            <span className="flex items-center gap-1">
              <img src={data.personalInfo.qrCodeImage || "/placeholder.svg"} alt="QR Code" className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>

      {/* Resumen Profesional */}
      <section className="mb-8">
        <h3
          className={`text-lg font-bold mb-3 pb-1`}
          style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
        >
          RESUMEN PROFESIONAL
        </h3>
        <p className={`leading-relaxed`} style={{ color: finalSecondaryTextColor }}>
          {data.summary}
        </p>
      </section>

      {/* Palabras Clave */}
      <section className="mb-8">
        <h3
          className={`text-lg font-bold mb-3 pb-1`}
          style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
        >
          COMPETENCIAS CLAVE
        </h3>
        <p style={{ color: finalSecondaryTextColor }}>{data.keywords.join(" • ")}</p>
      </section>

      {/* Experiencia Laboral */}
      <section className="mb-8">
        <h3
          className={`text-lg font-bold mb-3 pb-1`}
          style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
        >
          EXPERIENCIA PROFESIONAL
        </h3>

        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-bold`} style={{ color: finalTextColor }}>
                    {exp.position}
                  </h4>
                  <p className={`font-medium`} style={{ color: finalSecondaryTextColor }}>
                    {exp.company}
                  </p>
                </div>
                <p className={`text-sm`} style={{ color: finalSecondaryTextColor }}>
                  {exp.period}
                </p>
              </div>

              <ul className={`list-disc list-inside space-y-1 ml-4`} style={{ color: finalSecondaryTextColor }}>
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>

              {exp.keywords.length > 0 && (
                <p className={`text-sm mt-2`} style={{ color: finalSecondaryTextColor }}>
                  <strong>Tecnologías utilizadas:</strong> {exp.keywords.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Educación */}
      <section className="mb-8">
        <h3
          className={`text-lg font-bold mb-3 pb-1`}
          style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
        >
          EDUCACIÓN
        </h3>
        {data.education.map((edu) => (
          <div key={edu.id}>
            <h4 className={`font-bold`} style={{ color: finalTextColor }}>
              {edu.degree}
            </h4>
            <p style={{ color: finalSecondaryTextColor }}>{edu.institution}</p>
            <p className={`text-sm`} style={{ color: finalSecondaryTextColor }}>
              {edu.period}
            </p>
            {edu.details && (
              <p className={`mt-1`} style={{ color: finalSecondaryTextColor }}>
                {edu.details}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <section>
          <h3
            className={`text-lg font-bold mb-3 pb-1`}
            style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
          >
            HABILIDADES TÉCNICAS
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.technicalSkills.map((skill) => (
              <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium`} style={getTagStyle(true)}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3
            className={`text-lg font-bold mb-3 pb-1`}
            style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
          >
            HABILIDADES INTERPERSONALES
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.softSkills.map((skill) => (
              <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium`} style={getTagStyle(false)}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Idiomas */}
      <section className="mb-8">
        <h3
          className={`text-lg font-bold mb-3 pb-1`}
          style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
        >
          IDIOMAS
        </h3>
        <div className="space-y-1">
          {data.languages.map((lang) => (
            <p key={lang.id} style={{ color: finalSecondaryTextColor }}>
              <strong>{lang.language}:</strong> {lang.level}
            </p>
          ))}
        </div>
      </section>

      {/* Certificaciones */}
      <section className="mb-8">
        <h3
          className={`text-lg font-bold mb-3 pb-1`}
          style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
        >
          CERTIFICACIONES
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.certifications.map((cert) => (
            <span key={cert} className={`px-3 py-1 rounded-full text-sm font-medium`} style={getTagStyle(true)}>
              {cert}
            </span>
          ))}
        </div>
      </section>

      {/* Proyectos */}
      <section className="mb-8">
        <h3
          className={`text-lg font-bold mb-3 pb-1`}
          style={{ color: finalTextColor, borderBottom: `1px solid ${borderColor}` }}
        >
          PROYECTOS
        </h3>
        <div className="space-y-6">
          {data.projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-bold`} style={{ color: finalTextColor }}>
                    {project.name}
                  </h4>
                  <p className={`font-medium`} style={{ color: finalSecondaryTextColor }}>
                    {project.description}
                  </p>
                </div>
                {project.imageUrls && project.imageUrls.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.imageUrls.map((url, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={url || "/placeholder.svg"}
                        alt={project.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>

              {project.technologies.length > 0 && (
                <p className={`text-sm mt-2`} style={{ color: finalSecondaryTextColor }}>
                  <strong>Tecnologías utilizadas:</strong> {project.technologies.join(", ")}
                </p>
              )}

              {project.link && (
                <p className={`text-sm mt-2`} style={{ color: finalSecondaryTextColor }}>
                  <strong>Enlace:</strong>{" "}
                  <a href={project.link} style={{ color: colors.primaryColor }}>
                    {project.link}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
