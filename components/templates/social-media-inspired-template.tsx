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
  portfolioTitle: string
  portfolioDescription: string
  portfolioWebsite: string
  qrCodeImage?: string // Add this line
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
}

export default function SocialMediaInspiredTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
}: SocialMediaInspiredTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "teal-500",
        secondaryColor: "green-500",
        lightBg: "bg-teal-50",
        darkBg: "bg-[#29303d]",
        lightCardBg: "bg-gray-50",
        darkCardBg: "bg-[#3a4250]",
        lightText: "text-gray-900",
        darkText: "text-white",
        lightSecondaryText: "text-gray-700",
        darkSecondaryText: "text-gray-300",
        lightAccentBg: "bg-teal-100",
        lightAccentText: "text-teal-800",
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "green-600",
        lightBg: "bg-orange-50",
        darkBg: "bg-[#29303d]",
        lightCardBg: "bg-gray-50",
        darkCardBg: "bg-[#3a4250]",
        lightText: "text-gray-900",
        darkText: "text-white",
        lightSecondaryText: "text-gray-700",
        darkSecondaryText: "text-gray-300",
        lightAccentBg: "bg-orange-100",
        lightAccentText: "text-orange-800",
      },
      blue: {
        primaryColor: "blue-500",
        secondaryColor: "purple-500",
        lightBg: "bg-blue-50",
        darkBg: "bg-[#1a202c]",
        lightCardBg: "bg-gray-50",
        darkCardBg: "bg-[#2d3748]",
        lightText: "text-gray-900",
        darkText: "text-white",
        lightSecondaryText: "text-gray-700",
        darkSecondaryText: "text-gray-300",
        lightAccentBg: "bg-blue-100",
        lightAccentText: "text-blue-800",
      },
      green: {
        primaryColor: "green-500",
        secondaryColor: "blue-500",
        lightBg: "bg-green-50",
        darkBg: "bg-[#1f2937]",
        lightCardBg: "bg-gray-50",
        darkCardBg: "bg-[#374151]",
        lightText: "text-gray-900",
        darkText: "text-white",
        lightSecondaryText: "text-gray-700",
        darkSecondaryText: "text-gray-300",
        lightAccentBg: "bg-green-100",
        lightAccentText: "text-green-800",
      },
      purple: {
        primaryColor: "purple-500",
        secondaryColor: "pink-500",
        lightBg: "bg-purple-50",
        darkBg: "bg-[#2d2640]",
        lightCardBg: "bg-gray-50",
        darkCardBg: "bg-[#4a3f6b]",
        lightText: "text-gray-900",
        darkText: "text-white",
        lightSecondaryText: "text-gray-700",
        darkSecondaryText: "text-gray-300",
        lightAccentBg: "bg-purple-100",
        lightAccentText: "text-purple-800",
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.orange // Default to orange
  }

  const colors = getThemeColors()

  // Determine background color
  const finalBgColor = customBackgroundColor || (isDarkMode ? colors.darkBg : colors.lightBg)
  // Determine text color
  const finalTextColorClass = customTextColor === "white" ? "text-white" : "text-black"
  const finalSecondaryTextColorClass =
    customTextColor === "white" ? colors.darkSecondaryText : colors.lightSecondaryText

  const cardBgColorClass = isDarkMode ? colors.darkCardBg : colors.lightCardBg
  const primaryAccentColorClass = `text-[${colors.primaryColor}]`
  const secondaryAccentColorClass = `text-[${colors.secondaryColor}]`

  // Tag colors logic
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? isDarkMode
        ? `rgba(${colors.primaryColor.replace("rgb(", "").replace(")", "")}, 0.2)`
        : colors.lightAccentBg.replace("bg-", "")
      : isDarkMode
        ? `rgba(${colors.secondaryColor.replace("rgb(", "").replace(")", "")}, 0.2)`
        : "rgb(220, 252, 231)" // Fallback to a light green for secondary in light mode
    const defaultText = isPrimaryTag
      ? isDarkMode
        ? colors.primaryColor
        : colors.lightAccentText.replace("text-", "")
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
      className={`max-w-4xl mx-auto shadow-2xl print:shadow-none ${finalTextColorClass}`}
      style={{
        backgroundColor: finalBgColor.startsWith("rgb") || finalBgColor.startsWith("#") ? finalBgColor : undefined,
      }}
    >
      {/* Sección Header */}
      <div
        className={`${finalBgColor.startsWith("rgb") || finalBgColor.startsWith("#") ? "" : finalBgColor} p-8 border-b-2 border-[${colors.primaryColor}]`}
        style={{
          backgroundColor: finalBgColor.startsWith("rgb") || finalBgColor.startsWith("#") ? finalBgColor : undefined,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Foto de Perfil */}
          <div className="flex-shrink-0">
            <div
              className={`w-32 h-32 ${cardBgColorClass} rounded-lg overflow-hidden border-4 border-[${colors.primaryColor}] shadow-xl`}
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
            <h1 className={`text-4xl font-bold ${finalTextColorClass} mb-2`}>{data.personalInfo.name}</h1>
            <h2 className={`text-xl ${primaryAccentColorClass} font-medium mb-4`}>{data.personalInfo.title}</h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${finalSecondaryTextColorClass}`}>
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4 ${primaryAccentColorClass}`} />
                <span className="text-sm">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 ${primaryAccentColorClass}`} />
                <span className="text-sm">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${primaryAccentColorClass}`} />
                <span className="text-sm">{data.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4 ${primaryAccentColorClass}`} />
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
            className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-[${colors.primaryColor}]`}
          >
            Resumen Profesional
          </h3>
          <p className={`${finalSecondaryTextColorClass} leading-relaxed`}>{data.summary}</p>
        </section>

        {/* Experiencia Laboral */}
        <section className="mb-8">
          <h3
            className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-[${colors.primaryColor}]`}
          >
            Experiencia Laboral
          </h3>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`${cardBgColorClass} p-6 rounded-lg border-l-4 border-[${colors.primaryColor}] shadow-lg`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className={`text-lg font-semibold ${finalTextColorClass}`}>{exp.position}</h4>
                    <p className={`${primaryAccentColorClass} font-medium`}>{exp.company}</p>
                  </div>
                  <div className={`${finalSecondaryTextColorClass} flex items-center text-sm`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {exp.period}
                  </div>
                </div>
                <ul className={`list-disc list-inside ${finalSecondaryTextColorClass} space-y-1`}>
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
              className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-[${colors.primaryColor}]`}
            >
              Educación
            </h3>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className={`${cardBgColorClass} p-6 rounded-lg border-l-4 border-[${colors.primaryColor}] shadow-lg`}
                >
                  <h4 className={`text-lg font-semibold ${finalTextColorClass}`}>{edu.degree}</h4>
                  <p className={`${primaryAccentColorClass} font-medium`}>{edu.institution}</p>
                  <p className={`${finalSecondaryTextColorClass} text-sm`}>{edu.period}</p>
                  <p className={`${finalSecondaryTextColorClass} mt-2`}>{edu.details}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Habilidades */}
          <section>
            <h3
              className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-[${colors.primaryColor}]`}
            >
              <Code className="inline w-6 h-6 mr-2" />
              Habilidades
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className={`font-semibold ${finalTextColorClass} mb-2`}>Habilidades Técnicas</h4>
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
                <h4 className={`font-semibold ${finalTextColorClass} mb-2`}>Habilidades Interpersonales</h4>
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
              className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-[${colors.primaryColor}]`}
            >
              <Languages className="inline w-6 h-6 mr-2" />
              Idiomas
            </h3>
            <div className="space-y-3">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className={`${finalTextColorClass} font-medium`}>{lang.language}</span>
                  <span className={finalSecondaryTextColorClass}>{lang.level}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3
              className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-[${colors.primaryColor}]`}
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
            className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-[${colors.primaryColor}]`}
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
            className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-[${colors.primaryColor}]`}
          >
            <Award className="inline w-6 h-6 mr-2" />
            Proyectos Destacados
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.projects.length > 0 ? (
              data.projects.map((project) => (
                <div
                  key={project.id}
                  className={`${cardBgColorClass} rounded-lg overflow-hidden shadow-lg ${isDarkMode ? `border-2 border-gray-600 hover:border-[${colors.primaryColor}]` : ""} transition-colors`}
                >
                  <img
                    src={project.imageUrl || "/placeholder.svg?height=200&width=200"}
                    alt={`Proyecto ${project.name}`}
                    className="w-full h-32 object-cover"
                  />
                  <p className={`p-2 text-sm ${finalSecondaryTextColorClass} text-center`}>{project.name}</p>
                </div>
              ))
            ) : (
              <>
                <div
                  className={`${cardBgColorClass} rounded-lg overflow-hidden shadow-lg ${isDarkMode ? `border-2 border-gray-600 hover:border-[${colors.primaryColor}]` : ""} transition-colors`}
                >
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Proyecto Placeholder 1"
                    className="w-full h-32 object-cover"
                  />
                  <p className={`p-2 text-sm ${finalSecondaryTextColorClass} text-center`}>[Nombre del Proyecto 1]</p>
                </div>
                <div
                  className={`${cardBgColorClass} rounded-lg overflow-hidden shadow-lg ${isDarkMode ? `border-2 border-gray-600 hover:border-[${colors.primaryColor}]` : ""} transition-colors`}
                >
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Proyecto Placeholder 2"
                    className="w-full h-32 object-cover"
                  />
                  <p className={`p-2 text-sm ${finalSecondaryTextColorClass} text-center`}>[Nombre del Proyecto 2]</p>
                </div>
                <div
                  className={`${cardBgColorClass} rounded-lg overflow-hidden shadow-lg ${isDarkMode ? `border-2 border-gray-600 hover:border-[${colors.primaryColor}]` : ""} transition-colors`}
                >
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Proyecto Placeholder 3"
                    className="w-full h-32 object-cover"
                  />
                  <p className={`p-2 text-sm ${finalSecondaryTextColorClass} text-center`}>[Nombre del Proyecto 3]</p>
                </div>
                <div
                  className={`${cardBgColorClass} rounded-lg overflow-hidden shadow-lg ${isDarkMode ? `border-2 border-gray-600 hover:border-[${colors.primaryColor}]` : ""} transition-colors`}
                >
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Proyecto Placeholder 4"
                    className="w-full h-32 object-cover"
                  />
                  <p className={`p-2 text-sm ${finalSecondaryTextColorClass} text-center`}>[Nombre del Proyecto 4]</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Sección Código QR */}
        <section className={`${cardBgColorClass} p-6 rounded-lg border-2 border-[${colors.primaryColor}] shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-xl font-bold ${finalTextColorClass} mb-2`}>{data.personalInfo.portfolioTitle}</h3>
              <p className={finalSecondaryTextColorClass}>{data.personalInfo.portfolioDescription}</p>
              <p className={`text-sm ${primaryAccentColorClass} mt-1`}>{data.personalInfo.portfolioWebsite}</p>
            </div>
            <div className={`bg-white p-4 rounded-lg shadow-lg border-2 border-[${colors.primaryColor}]`}>
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
