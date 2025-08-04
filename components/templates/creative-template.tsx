import { Mail, Phone, MapPin, Globe, Calendar, Code, Languages, Heart, Award, QrCode } from "lucide-react"

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
  profilePhotoBackgroundColor?: string // New prop
}

export default function CreativeTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor, // Destructure new prop
}: CreativeTemplateProps) {
  const getThemeColors = () => {
    const themes = {
      teal: {
        primaryColor: "#10B981", // Hex for direct use
        secondaryColor: "#22C55E", // Hex for direct use
        gradientFrom: "from-teal-600",
        gradientTo: "to-green-600",
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#3a4250",
        headerGradientTextFrom: "from-yellow-300",
        headerGradientTextTo: "to-orange-300",
        headerSecondaryText: "#99F6E4", // teal-200
        iconColor: "#FDE047", // yellow-300
      },
      orange: {
        primaryColor: "rgb(242,89,13)",
        secondaryColor: "#16A34A", // green-600
        gradientFrom: "from-orange-600",
        gradientTo: "to-red-600",
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#3a4250",
        headerGradientTextFrom: "from-yellow-300",
        headerGradientTextTo: "to-orange-300",
        headerSecondaryText: "#FED7AA", // orange-200
        iconColor: "#FDE047", // yellow-300
      },
      blue: {
        primaryColor: "#3B82F6", // blue-500
        secondaryColor: "#9333EA", // purple-500
        gradientFrom: "from-blue-600",
        gradientTo: "to-indigo-600",
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#2d3748",
        headerGradientTextFrom: "from-cyan-300",
        headerGradientTextTo: "to-blue-300",
        headerSecondaryText: "#BFDBFE", // blue-200
        iconColor: "#67E8F9", // cyan-300
      },
      green: {
        primaryColor: "#22C55E", // green-500
        secondaryColor: "#3B82F6", // blue-500
        gradientFrom: "from-green-600",
        gradientTo: "to-emerald-600",
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#374151",
        headerGradientTextFrom: "from-lime-300",
        headerGradientTextTo: "to-green-300",
        headerSecondaryText: "#D9F991", // green-200
        iconColor: "#BEF264", // lime-300
      },
      purple: {
        primaryColor: "#9333EA", // purple-500
        secondaryColor: "#EC4899", // pink-500
        gradientFrom: "from-purple-600",
        gradientTo: "to-pink-600",
        lightCardBg: "#FFFFFF", // white
        darkCardBg: "#4a3f6b",
        headerGradientTextFrom: "from-yellow-300",
        headerGradientTextTo: "to-orange-300",
        headerSecondaryText: "#DDD6FE", // purple-200
        iconColor: "#FDE047", // yellow-300
      },
    }
    return themes[selectedTheme as keyof typeof themes] || themes.purple
  }

  const colors = getThemeColors()

  // Determine background color
  const finalBgColor =
    customBackgroundColor ||
    (isDarkMode ? colors.darkCardBg : `linear-gradient(to bottom right, ${colors.lightCardBg} 0%, #FFFFFF 100%)`)
  // Determine text color
  const finalTextColor = customTextColor === "white" ? "white" : "black"
  const finalSecondaryTextColor = customTextColor === "white" ? "rgb(209, 213, 219)" : "rgb(75, 85, 99)" // gray-300 or gray-700

  const cardBgColor = isDarkMode ? colors.darkCardBg : colors.lightCardBg

  // Tag colors logic
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? colors.primaryColor // Use direct RGB for primary
      : colors.secondaryColor // Use direct RGB for secondary
    const defaultText = "white" // Default text color for gradient tags

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
    }
  }

  return (
    <div
      className={`max-w-4xl mx-auto`}
      style={{
        backgroundColor: customBackgroundColor ? customBackgroundColor : undefined,
        backgroundImage: customBackgroundColor
          ? undefined
          : isDarkMode
            ? undefined
            : `linear-gradient(to bottom right, ${colors.lightCardBg} 0%, #FFFFFF 100%)`,
        color: finalTextColor,
      }}
    >
      {/* Header Creativo */}
      <div
        className={`text-white p-8`}
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {data.personalInfo.profilePhoto && (
            <div className="flex-shrink-0">
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl"
                style={{ backgroundColor: profilePhotoBackgroundColor || undefined }}
              >
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
              className={`text-4xl font-bold mb-2 bg-clip-text text-transparent`}
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
              }}
            >
              {data.personalInfo.name}
            </h1>
            <h2 className={`text-xl font-medium mb-4`} style={{ color: colors.headerSecondaryText }}>
              {data.personalInfo.title}
            </h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3`} style={{ color: colors.headerSecondaryText }}>
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4`} style={{ color: colors.iconColor }} />
                <span className="text-sm">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4`} style={{ color: colors.iconColor }} />
                <span className="text-sm">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4`} style={{ color: colors.iconColor }} />
                <span className="text-sm">{data.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4`} style={{ color: colors.iconColor }} />
                <span className="text-sm">{data.personalInfo.linkedin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Sobre Mí */}
        <section className="mb-8">
          <h3 className={`text-2xl font-bold mb-4 pb-2`} style={{ color: finalTextColor }}>
            <span
              className={`bg-clip-text text-transparent`}
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
              }}
            >
              Sobre Mí
            </span>
          </h3>
          <div
            className={`p-6 rounded-xl shadow-lg border-l-4`}
            style={{
              backgroundColor: cardBgColor,
              borderColor: colors.primaryColor,
            }}
          >
            <p className={`leading-relaxed`} style={{ color: finalSecondaryTextColor }}>
              {data.summary}
            </p>
          </div>
        </section>

        {/* Experiencia */}
        <section className="mb-8">
          <h3 className={`text-2xl font-bold mb-4 pb-2`} style={{ color: finalTextColor }}>
            <span
              className={`bg-clip-text text-transparent`}
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
              }}
            >
              Mi Trayectoria
            </span>
          </h3>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                style={{ backgroundColor: cardBgColor }}
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
                  <div
                    className={`flex items-center text-sm px-3 py-1 rounded-full`}
                    style={{
                      color: finalSecondaryTextColor,
                      backgroundColor: isDarkMode ? colors.darkCardBg : "rgb(249, 250, 251)", // gray-100
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    {exp.period}
                  </div>
                </div>

                <ul className={`list-none space-y-2`} style={{ color: finalSecondaryTextColor }}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0`}
                        style={{
                          backgroundImage: `linear-gradient(to right, ${colors.primaryColor}, ${colors.secondaryColor})`,
                        }}
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
            <h3 className={`text-2xl font-bold mb-4`} style={{ color: finalTextColor }}>
              <span
                className={`bg-clip-text text-transparent`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
                }}
              >
                Formación
              </span>
            </h3>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className={`p-6 rounded-xl shadow-lg border-l-4`}
                  style={{
                    backgroundColor: cardBgColor,
                    borderColor: colors.secondaryColor,
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
            <h3 className={`text-2xl font-bold mb-4`} style={{ color: finalTextColor }}>
              <Code className="inline w-6 h-6 mr-2" />
              <span
                className={`bg-clip-text text-transparent`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
                }}
              >
                Habilidades
              </span>
            </h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-xl shadow-lg`} style={{ backgroundColor: cardBgColor }}>
                <h4 className={`font-semibold mb-2`} style={{ color: finalTextColor }}>
                  Técnicas
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

              <div className={`p-4 rounded-xl shadow-lg`} style={{ backgroundColor: cardBgColor }}>
                <h4 className={`font-semibold mb-2`} style={{ color: finalTextColor }}>
                  Interpersonales
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h3 className={`text-2xl font-bold mb-4`} style={{ color: finalTextColor }}>
              <Languages className="inline w-6 h-6 mr-2" />
              <span
                className={`bg-clip-text text-transparent`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
                }}
              >
                Idiomas
              </span>
            </h3>
            <div className={`p-6 rounded-xl shadow-lg`} style={{ backgroundColor: cardBgColor }}>
              <div className="space-y-3">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className={`font-medium`} style={{ color: finalTextColor }}>
                      {lang.language}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm`}
                      style={{
                        color: finalSecondaryTextColor,
                        backgroundColor: isDarkMode ? colors.darkCardBg : "rgb(249, 250, 251)", // gray-100
                      }}
                    >
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h3 className={`text-2xl font-bold mb-4`} style={{ color: finalTextColor }}>
              <Heart className="inline w-6 h-6 mr-2" />
              <span
                className={`bg-clip-text text-transparent`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
                }}
              >
                Intereses
              </span>
            </h3>
            <div className={`p-6 rounded-xl shadow-lg`} style={{ backgroundColor: cardBgColor }}>
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
          <h3 className={`text-2xl font-bold mb-4`} style={{ color: finalTextColor }}>
            <Award className="inline w-6 h-6 mr-2" />
            <span
              className={`bg-clip-text text-transparent`}
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
              }}
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
          <h3 className={`text-2xl font-bold mb-4`} style={{ color: finalTextColor }}>
            <Award className="inline w-6 h-6 mr-2" />
            <span
              className={`bg-clip-text text-transparent`}
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.gradientFrom.replace("from-", "")}, ${colors.gradientTo.replace("to-", "")})`,
              }}
            >
              Proyectos Destacados
            </span>
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
