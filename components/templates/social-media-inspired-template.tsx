import { Mail, Phone, MapPin, Globe, Calendar, Award, Code, Languages, Heart, QrCode } from "lucide-react"

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
  profilePhotoBackgroundColor?: string // Add this line
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
  interests: string[]
  keywords: string[]
}

interface SocialMediaInspiredTemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  profilePhotoBackgroundColor?: string // New prop
}

export default function SocialMediaInspiredTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor, // Destructure new prop
}: SocialMediaInspiredTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "#10B981", // Hex for direct use
        secondaryColor: "#22C55E", // Hex for direct use
        lightBg: "#F0FDF4", // teal-50
        darkBg: "#29303d",
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#3a4250",
        lightAccentBg: "#CCFBF1", // teal-100
        lightAccentText: "#0D9488", // teal-800
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "#16A34A", // green-600
        lightBg: "#FFF7ED", // orange-50
        darkBg: "#29303d",
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#3a4250",
        lightAccentBg: "#FFEDD5", // orange-100
        lightAccentText: "#9A3412", // orange-800
      },
      blue: {
        primaryColor: "#3B82F6", // blue-500
        secondaryColor: "#9333EA", // purple-500
        lightBg: "#EFF6FF", // blue-50
        darkBg: "#1a202c",
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#2d3748",
        lightAccentBg: "#DBEAFE", // blue-100
        lightAccentText: "#1E40AF", // blue-800
      },
      green: {
        primaryColor: "#22C55E", // green-500
        secondaryColor: "#3B82F6", // blue-500
        lightBg: "#F0FDF4", // green-50
        darkBg: "#1f2937",
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#374151",
        lightAccentBg: "#D1FAE5", // green-100
        lightAccentText: "#065F46", // green-800
      },
      purple: {
        primaryColor: "#9333EA", // purple-500
        secondaryColor: "#EC4899", // pink-500
        lightBg: "#F5F3FF", // purple-50
        darkBg: "#2d2640",
        lightCardBg: "#F9FAFB", // gray-50
        darkCardBg: "#4a3f6b",
        lightAccentBg: "#EDE9FE", // purple-100
        lightAccentText: "#5B21B6", // purple-800
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.orange // Default to orange
  }

  const colors = getThemeColors()

  // Determine background color
  const finalBgColor = customBackgroundColor || (isDarkMode ? colors.darkBg : colors.lightBg)
  // Determine text color
  const finalTextColor = customTextColor === "white" ? "white" : "black"
  const finalSecondaryTextColor = customTextColor === "white" ? colors.darkSecondaryText : "rgb(75, 85, 99)" // gray-700

  const cardBgColor = isDarkMode ? colors.darkCardBg : colors.lightCardBg

  // Tag colors logic
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? isDarkMode
        ? `rgba(${colors.primaryColor.replace("rgb(", "").replace(")", "")}, 0.2)`
        : colors.lightAccentBg
      : isDarkMode
        ? `rgba(${colors.secondaryColor.replace("rgb(", "").replace(")", "")}, 0.2)`
        : "rgb(220, 252, 231)" // Fallback to a light green for secondary in light mode
    const defaultText = isPrimaryTag
      ? isDarkMode
        ? colors.primaryColor
        : colors.lightAccentText
      : isDarkMode
        ? "white"
        : "rgb(22, 101, 52)" // Fallback to a dark green for secondary in light mode

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
    }
  }

  return (
    <div
      className={`max-w-4xl mx-auto shadow-2xl print:shadow-none`}
      style={{
        backgroundColor: finalBgColor,
        color: finalTextColor,
      }}
    >
      {/* Sección Header */}
      <div
        className={`p-8 border-b-2`}
        style={{
          backgroundColor: finalBgColor,
          borderColor: colors.primaryColor,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Foto de Perfil */}
          <div className="flex-shrink-0">
            <div
              className={`w-32 h-32 rounded-lg overflow-hidden border-4 shadow-xl`}
              style={{
                backgroundColor: profilePhotoBackgroundColor || cardBgColor,
                borderColor: colors.primaryColor,
              }}
            >
              <img
                src={data.personalInfo.profilePhoto || "/placeholder.svg?height=300&width=300"}
                alt="Foto de Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Nombre e Información de Contacto */}
          <div className="flex-1">
            <h1 className={`text-4xl font-bold mb-2`} style={{ color: finalTextColor }}>
              {data.personalInfo.name}
            </h1>
            <h2 className={`text-xl font-medium mb-4`} style={{ color: colors.primaryColor }}>
              {data.personalInfo.title}
            </h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3`} style={{ color: finalSecondaryTextColor }}>
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
                <span className="text-sm">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
                <span className="text-sm">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
                <span className="text-sm">{data.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4`} style={{ color: colors.primaryColor }} />
                <span className="text-sm">{data.personalInfo.linkedin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Resumen Profesional */}
        <section className="mb-8">
          <h3
            className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
            style={{ color: finalTextColor, borderColor: colors.primaryColor }}
          >
            Resumen Profesional
          </h3>
          <p className={`leading-relaxed`} style={{ color: finalSecondaryTextColor }}>
            {data.summary}
          </p>
        </section>

        {/* Experiencia Laboral */}
        <section className="mb-8">
          <h3
            className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
            style={{ color: finalTextColor, borderColor: colors.primaryColor }}
          >
            Experiencia Laboral
          </h3>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`p-6 rounded-lg border-l-4 shadow-lg`}
                style={{
                  backgroundColor: cardBgColor,
                  borderColor: colors.primaryColor,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className={`text-lg font-semibold`} style={{ color: finalTextColor }}>
                      {exp.position}
                    </h4>
                    <p className={`font-medium`} style={{ color: colors.primaryColor }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className={`flex items-center text-sm`} style={{ color: finalSecondaryTextColor }}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {exp.period}
                  </div>
                </div>
                <ul className={`list-disc list-inside space-y-1`} style={{ color: finalSecondaryTextColor }}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Layout de Dos Columnas para Educación, Habilidades, Idiomas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Educación */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              Educación
            </h3>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className={`p-6 rounded-lg border-l-4 shadow-lg`}
                  style={{
                    backgroundColor: cardBgColor,
                    borderColor: colors.primaryColor,
                  }}
                >
                  <h4 className={`text-lg font-semibold`} style={{ color: finalTextColor }}>
                    {edu.degree}
                  </h4>
                  <p className={`font-medium`} style={{ color: colors.primaryColor }}>
                    {edu.institution}
                  </p>
                  <p className={`text-sm`} style={{ color: finalSecondaryTextColor }}>
                    {edu.period}
                  </p>
                  <p className={`mt-2`} style={{ color: finalSecondaryTextColor }}>
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Habilidades */}
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              <Code className="inline w-6 h-6 mr-2" />
              Habilidades
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className={`font-semibold mb-2`} style={{ color: finalTextColor }}>
                  Habilidades Técnicas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium`}
                      style={getTagStyle(true)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={`font-semibold mb-2`} style={{ color: finalTextColor }}>
                  Habilidades Interpersonales
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.softSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium`}
                      style={getTagStyle(false)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Idiomas e Intereses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              <Languages className="inline w-6 h-6 mr-2" />
              Idiomas
            </h3>
            <div className="space-y-3">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className={`font-medium`} style={{ color: finalTextColor }}>
                    {lang.language}
                  </span>
                  <span style={{ color: finalSecondaryTextColor }}>{lang.level}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3
              className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
              style={{ color: finalTextColor, borderColor: colors.primaryColor }}
            >
              <Heart className="inline w-6 h-6 mr-2" />
              Intereses
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest) => (
                <span
                  key={interest}
                  className={`px-3 py-1 rounded-full text-sm font-medium`}
                  style={getTagStyle(false)} // Interests use secondary tag style
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Certificaciones */}
        <section className="mb-8">
          <h3
            className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
            style={{ color: finalTextColor, borderColor: colors.primaryColor }}
          >
            <Award className="inline w-6 h-6 mr-2" />
            Certificaciones
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert) => (
              <span
                key={cert}
                className={`px-3 py-1 rounded-full text-sm font-medium`}
                style={getTagStyle(true)} // Certifications use primary tag style
              >
                {cert}
              </span>
            ))}
          </div>
        </section>

        {/* Proyectos Destacados */}
        <section className="mb-8">
          <h3
            className={`text-2xl font-bold mb-4 pb-2 border-b-2`}
            style={{ color: finalTextColor, borderColor: colors.primaryColor }}
          >
            <Award className="inline w-6 h-6 mr-2" />
            Proyectos Destacados
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.projects.length > 0 ? (
              data.projects.map((project) => (
                <div
                  key={project.id}
                  className={`rounded-lg overflow-hidden shadow-lg transition-colors`}
                  style={{
                    backgroundColor: cardBgColor,
                    border: isDarkMode ? `2px solid rgb(75, 85, 99)` : undefined, // gray-600
                    borderColor: isDarkMode ? colors.primaryColor : undefined, // hover effect
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
                  className={`rounded-lg overflow-hidden shadow-lg transition-colors`}
                  style={{
                    backgroundColor: cardBgColor,
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
                  className={`rounded-lg overflow-hidden shadow-lg transition-colors`}
                  style={{
                    backgroundColor: cardBgColor,
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
                  className={`rounded-lg overflow-hidden shadow-lg transition-colors`}
                  style={{
                    backgroundColor: cardBgColor,
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
                  className={`rounded-lg overflow-hidden shadow-lg transition-colors`}
                  style={{
                    backgroundColor: cardBgColor,
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

        {/* Sección Código QR */}
        <section
          className={`p-6 rounded-lg border-2 shadow-lg`}
          style={{
            backgroundColor: cardBgColor,
            borderColor: colors.primaryColor,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-xl font-bold mb-2`} style={{ color: finalTextColor }}>
                {data.personalInfo.portfolioTitle}
              </h3>
              <p style={{ color: finalSecondaryTextColor }}>{data.personalInfo.portfolioDescription}</p>
              <p className={`text-sm mt-1`} style={{ color: colors.primaryColor }}>
                {data.personalInfo.portfolioWebsite}
              </p>
            </div>
            <div
              className={`p-4 rounded-lg shadow-lg border-2`}
              style={{
                backgroundColor: "white", // QR code background is always white for readability
                borderColor: colors.primaryColor,
              }}
            >
              {data.personalInfo.qrCodeImage ? (
                <img
                  src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
                  alt="Código QR del Portfolio"
                  className="w-20 h-20 object-contain"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
