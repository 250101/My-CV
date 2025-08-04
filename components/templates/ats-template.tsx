import { Mail, Phone, MapPin, Globe } from "lucide-react"

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  profilePhoto: string
  portfolioTitle: string
  portfolioDescription: string
  portfolioWebsite: string
  qrCodeImage?: string // Add this line
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
  imageUrl?: string // Add this line
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
}

export default function ATSTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
}: ATSTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "teal-500",
        secondaryColor: "green-500",
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "green-600",
      },
      blue: {
        primaryColor: "blue-500",
        secondaryColor: "purple-500",
      },
      green: {
        primaryColor: "green-500",
        secondaryColor: "blue-500",
      },
      purple: {
        primaryColor: "purple-500",
        secondaryColor: "pink-500",
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.teal
  }

  const colors = getThemeColors()

  // Determine background color
  const finalBgColor = customBackgroundColor || (isDarkMode ? "bg-gray-900" : "bg-white")
  // Determine text color
  const finalTextColorClass = customTextColor === "white" ? "text-white" : "text-black"
  const finalSecondaryTextColorClass = customTextColor === "white" ? "text-gray-300" : "text-gray-700"

  const primaryAccentColorClass = `text-[${colors.primaryColor}]`
  const borderColorClass = isDarkMode ? "border-gray-600" : "border-gray-300"

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
      className={`max-w-4xl mx-auto p-8 ${finalTextColorClass}`}
      style={{
        backgroundColor: finalBgColor.startsWith("rgb") || finalBgColor.startsWith("#") ? finalBgColor : undefined,
      }}
    >
      {/* Header - Simple y limpio para ATS */}
      <div className={`text-center mb-8 border-b-2 ${borderColorClass} pb-6`}>
        <h1 className={`text-3xl font-bold ${finalTextColorClass} mb-2`}>{data.personalInfo.name}</h1>
        <h2 className={`text-xl ${finalSecondaryTextColorClass} mb-4`}>{data.personalInfo.title}</h2>

        <div className={`flex flex-wrap justify-center gap-4 text-sm ${finalSecondaryTextColorClass}`}>
          <span className="flex items-center gap-1">
            <Mail className={`w-4 h-4 ${primaryAccentColorClass}`} />
            {data.personalInfo.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className={`w-4 h-4 ${primaryAccentColorClass}`} />
            {data.personalInfo.phone}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className={`w-4 h-4 ${primaryAccentColorClass}`} />
            <span className="text-sm">{data.personalInfo.location}</span>
          </span>
          {data.personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Globe className={`w-4 h-4 ${primaryAccentColorClass}`} />
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
        <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>
          RESUMEN PROFESIONAL
        </h3>
        <p className={`${finalSecondaryTextColorClass} leading-relaxed`}>{data.summary}</p>
      </section>

      {/* Palabras Clave */}
      <section className="mb-8">
        <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>
          COMPETENCIAS CLAVE
        </h3>
        <p className={`${finalSecondaryTextColorClass}`}>{data.keywords.join(" • ")}</p>
      </section>

      {/* Experiencia Laboral */}
      <section className="mb-8">
        <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>
          EXPERIENCIA PROFESIONAL
        </h3>

        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-bold ${finalTextColorClass}`}>{exp.position}</h4>
                  <p className={`${finalSecondaryTextColorClass} font-medium`}>{exp.company}</p>
                </div>
                <p className={`${finalSecondaryTextColorClass} text-sm`}>{exp.period}</p>
              </div>

              <ul className={`list-disc list-inside ${finalSecondaryTextColorClass} space-y-1 ml-4`}>
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>

              {exp.keywords.length > 0 && (
                <p className={`text-sm ${finalSecondaryTextColorClass} mt-2`}>
                  <strong>Tecnologías utilizadas:</strong> {exp.keywords.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Educación */}
      <section className="mb-8">
        <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>EDUCACIÓN</h3>
        {data.education.map((edu) => (
          <div key={edu.id}>
            <h4 className={`font-bold ${finalTextColorClass}`}>{edu.degree}</h4>
            <p className={`${finalSecondaryTextColorClass}`}>{edu.institution}</p>
            <p className={`${finalSecondaryTextColorClass} text-sm`}>{edu.period}</p>
            {edu.details && <p className={`${finalSecondaryTextColorClass} mt-1`}>{edu.details}</p>}
          </div>
        ))}
      </section>

      {/* Habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <section>
          <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>
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
          <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>
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
        <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>IDIOMAS</h3>
        <div className="space-y-1">
          {data.languages.map((lang) => (
            <p key={lang.id} className={`${finalSecondaryTextColorClass}`}>
              <strong>{lang.language}:</strong> {lang.level}
            </p>
          ))}
        </div>
      </section>

      {/* Certificaciones */}
      <section className="mb-8">
        <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>
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
        <h3 className={`text-lg font-bold ${finalTextColorClass} mb-3 border-b ${borderColorClass} pb-1`}>PROYECTOS</h3>
        <div className="space-y-6">
          {data.projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-bold ${finalTextColorClass}`}>{project.name}</h4>
                  <p className={`${finalSecondaryTextColorClass} font-medium`}>{project.description}</p>
                </div>
                {project.imageUrl && (
                  <img src={project.imageUrl || "/placeholder.svg"} alt={project.name} className="w-10 h-10 rounded" />
                )}
              </div>

              {project.technologies.length > 0 && (
                <p className={`text-sm ${finalSecondaryTextColorClass} mt-2`}>
                  <strong>Tecnologías utilizadas:</strong> {project.technologies.join(", ")}
                </p>
              )}

              {project.link && (
                <p className={`text-sm ${finalSecondaryTextColorClass} mt-2`}>
                  <strong>Enlace:</strong>{" "}
                  <a href={project.link} className="text-blue-500">
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
