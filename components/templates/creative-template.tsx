import { Mail, Phone, MapPin, Globe, Calendar, Code, Languages, Heart, Award, QrCode } from "lucide-react"

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
  imageUrl?: string
}

interface CurriculumData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  technicalSkills: string[]
  softSkills: string[]
  languages: { id: string; language: string; level: string }[]
  interests: string[]
  projects: Project[]
  certifications: string[]
}

interface CreativeTemplateProps {
  data: CurriculumData
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
}

export default function CreativeTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
}: CreativeTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "teal-500",
        secondaryColor: "green-500",
        gradientFrom: "from-teal-600",
        gradientTo: "to-green-600",
        lightCardBg: "bg-white",
        darkCardBg: "bg-[#3a4250]",
        headerGradientTextFrom: "from-yellow-300",
        headerGradientTextTo: "to-orange-300",
        headerSecondaryText: "text-teal-200",
        iconColor: "text-yellow-300",
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "green-600",
        gradientFrom: "from-orange-600",
        gradientTo: "to-red-600",
        lightCardBg: "bg-white",
        darkCardBg: "bg-[#3a4250]",
        headerGradientTextFrom: "from-yellow-300",
        headerGradientTextTo: "to-orange-300",
        headerSecondaryText: "text-orange-200",
        iconColor: "text-yellow-300",
      },
      blue: {
        primaryColor: "blue-500",
        secondaryColor: "purple-500",
        gradientFrom: "from-blue-600",
        gradientTo: "to-indigo-600",
        lightCardBg: "bg-white",
        darkCardBg: "bg-[#2d3748]",
        headerGradientTextFrom: "from-cyan-300",
        headerGradientTextTo: "to-blue-300",
        headerSecondaryText: "text-blue-200",
        iconColor: "text-cyan-300",
      },
      green: {
        primaryColor: "green-500",
        secondaryColor: "blue-500",
        gradientFrom: "from-green-600",
        gradientTo: "to-emerald-600",
        lightCardBg: "bg-white",
        darkCardBg: "bg-[#374151]",
        headerGradientTextFrom: "from-lime-300",
        headerGradientTextTo: "to-green-300",
        headerSecondaryText: "text-green-200",
        iconColor: "text-lime-300",
      },
      purple: {
        primaryColor: "purple-500",
        secondaryColor: "pink-500",
        gradientFrom: "from-purple-600",
        gradientTo: "to-pink-600",
        lightCardBg: "bg-white",
        darkCardBg: "bg-[#4a3f6b]",
        headerGradientTextFrom: "from-yellow-300",
        headerGradientTextTo: "to-orange-300",
        headerSecondaryText: "text-purple-200",
        iconColor: "text-yellow-300",
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.purple
  }

  const colors = getThemeColors()

  // Determine background color
  const finalBgColor =
    customBackgroundColor || (isDarkMode ? "bg-[#2d2640]" : `bg-gradient-to-br from-${selectedTheme}-50 to-white`)
  // Determine text color
  const finalTextColorClass = customTextColor === "white" ? "text-white" : "text-black"
  const finalSecondaryTextColorClass = customTextColor === "white" ? "text-gray-300" : "text-gray-700"

  const headerBgClass = `bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo}`
  const cardBgColorClass = isDarkMode ? colors.darkCardBg : colors.lightCardBg
  const primaryAccentColorClass = `text-[${colors.primaryColor}]`
  const secondaryAccentColorClass = `text-[${colors.secondaryColor}]`

  // Tag colors logic
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? `rgb(${colors.primaryColor.replace("rgb(", "").replace(")", "")})` // Use direct RGB for primary
      : `rgb(${colors.secondaryColor.replace("rgb(", "").replace(")", "")})` // Use direct RGB for secondary
    const defaultText = "white" // Default text color for gradient tags

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
    }
  }

  return (
    <div
      className={`max-w-4xl mx-auto ${finalTextColorClass}`}
      style={{
        backgroundColor: finalBgColor.startsWith("rgb") || finalBgColor.startsWith("#") ? finalBgColor : undefined,
      }}
    >
      {/* Header Creativo */}
      <div className={`${headerBgClass} text-white p-8`}>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {data.personalInfo.profilePhoto && (
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={data.personalInfo.profilePhoto || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex-1">
            <h1
              className={`text-4xl font-bold mb-2 bg-gradient-to-r ${colors.headerGradientTextFrom} ${colors.headerGradientTextTo} bg-clip-text text-transparent`}
            >
              {data.personalInfo.name}
            </h1>
            <h2 className={`text-xl ${colors.headerSecondaryText} font-medium mb-4`}>{data.personalInfo.title}</h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${colors.headerSecondaryText}`}>
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4 ${colors.iconColor}`} />
                <span className="text-sm">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 ${colors.iconColor}`} />
                <span className="text-sm">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${colors.iconColor}`} />
                <span className="text-sm">{data.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4 ${colors.iconColor}`} />
                <span className="text-sm">{data.personalInfo.linkedin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Sobre Mí */}
        <section className="mb-8">
          <h3
            className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2 border-b-2 border-gradient-to-r from-[${colors.primaryColor}] to-[${colors.secondaryColor}]`}
          >
            <span
              className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}
            >
              Sobre Mí
            </span>
          </h3>
          <div className={`${cardBgColorClass} p-6 rounded-xl shadow-lg border-l-4 border-[${colors.primaryColor}]`}>
            <p className={`${finalSecondaryTextColorClass} leading-relaxed`}>{data.summary}</p>
          </div>
        </section>

        {/* Experiencia */}
        <section className="mb-8">
          <h3 className={`text-2xl font-bold ${finalTextColorClass} mb-4 pb-2`}>
            <span
              className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}
            >
              Mi Trayectoria
            </span>
          </h3>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className={`${cardBgColorClass} p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className={`text-lg font-semibold ${finalTextColorClass}`}>{exp.position}</h4>
                    <p className={`${primaryAccentColorClass} font-medium`}>{exp.company}</p>
                  </div>
                  <div
                    className={`${finalSecondaryTextColorClass} flex items-center text-sm ${isDarkMode ? `bg-[${colors.darkCardBg}]` : "bg-gray-100"} px-3 py-1 rounded-full`}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    {exp.period}
                  </div>
                </div>

                <ul className={`list-none ${finalSecondaryTextColorClass} space-y-2`}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div
                        className={`w-2 h-2 bg-gradient-to-r from-[${colors.primaryColor}] to-[${colors.secondaryColor}] rounded-full mt-2 flex-shrink-0`}
                      ></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Grid de Habilidades e Información */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Educación */}
          <section>
            <h3 className={`text-2xl font-bold ${finalTextColorClass} mb-4`}>
              <span
                className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}
              >
                Formación
              </span>
            </h3>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className={`${cardBgColorClass} p-6 rounded-xl shadow-lg border-l-4 border-[${colors.secondaryColor}]`}
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
            <h3 className={`text-2xl font-bold ${finalTextColorClass} mb-4`}>
              <Code className="inline w-6 h-6 mr-2" />
              <span
                className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}
              >
                Habilidades
              </span>
            </h3>
            <div className="space-y-4">
              <div className={`${cardBgColorClass} p-4 rounded-xl shadow-lg`}>
                <h4 className={`font-semibold ${finalTextColorClass} mb-2`}>Técnicas</h4>
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

              <div className={`${cardBgColorClass} p-4 rounded-xl shadow-lg`}>
                <h4 className={`font-semibold ${finalTextColorClass} mb-2`}>Interpersonales</h4>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h3 className={`text-2xl font-bold ${finalTextColorClass} mb-4`}>
              <Languages className="inline w-6 h-6 mr-2" />
              <span
                className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}
              >
                Idiomas
              </span>
            </h3>
            <div className={`${cardBgColorClass} p-6 rounded-xl shadow-lg`}>
              <div className="space-y-3">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className={`font-medium ${finalTextColorClass}`}>{lang.language}</span>
                    <span
                      className={`${finalSecondaryTextColorClass} ${isDarkMode ? `bg-[${colors.darkCardBg}]` : "bg-gray-100"} px-3 py-1 rounded-full text-sm`}
                    >
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h3 className={`text-2xl font-bold ${finalTextColorClass} mb-4`}>
              <Heart className="inline w-6 h-6 mr-2" />
              <span
                className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}
              >
                Intereses
              </span>
            </h3>
            <div className={`${cardBgColorClass} p-6 rounded-xl shadow-lg`}>
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
            </div>
          </section>
        </div>

        {/* Certificaciones */}
        <section className="mb-8">
          <h3 className={`text-2xl font-bold ${finalTextColorClass} mb-4`}>
            <Award className="inline w-6 h-6 mr-2" />
            <span
              className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}
            >
              Certificaciones
            </span>
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
          <h3 className={`text-2xl font-bold ${finalTextColorClass} mb-4`}>
            <Award className="inline w-6 h-6 mr-2" />
            <span
              className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}
            >
              Proyectos Destacados
            </span>
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
