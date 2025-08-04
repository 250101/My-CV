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
}

export default function MinimalTemplate({
  data,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
}: MinimalTemplateProps) {
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
  const finalBgColor = customBackgroundColor || (isDarkMode ? "bg-[#29303d]" : "bg-white")
  // Determine text color
  const finalTextColorClass = customTextColor === "white" ? "text-white" : "text-gray-900"
  const finalSecondaryTextColorClass = customTextColor === "white" ? "text-gray-300" : "text-gray-600"

  const borderColorClass = isDarkMode ? "border-gray-600" : "border-gray-200"
  const bulletColorClass = isDarkMode ? "bg-gray-400" : "bg-gray-400" // Bullets remain gray

  // Tag colors logic
  const getTagStyle = (isPrimaryTag: boolean) => {
    const customColor = isPrimaryTag ? customTagPrimaryColor : customTagSecondaryColor
    const defaultBg = isPrimaryTag
      ? `rgb(${colors.primaryColor.replace("rgb(", "").replace(")", "")})` // Use direct RGB for primary
      : `rgb(${colors.secondaryColor.replace("rgb(", "").replace(")", "")})` // Use direct RGB for secondary
    const defaultText = "white" // Default text color for tags

    return {
      backgroundColor: customColor || defaultBg,
      color: customColor ? (customTextColor === "white" ? "white" : "black") : defaultText,
    }
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-12 ${finalTextColorClass}`}
      style={{
        backgroundColor: finalBgColor.startsWith("rgb") || finalBgColor.startsWith("#") ? finalBgColor : undefined,
      }}
    >
      {/* Header Minimalista */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-light ${finalTextColorClass} mb-2 tracking-wide`}>{data.personalInfo.name}</h1>
        <h2 className={`text-lg ${finalSecondaryTextColorClass} mb-6 font-light`}>{data.personalInfo.title}</h2>

        <div className={`flex justify-center gap-8 text-sm ${finalSecondaryTextColorClass}`}>
          <span className="flex items-center gap-2">
            <Mail className={`w-4 h-4 text-[${colors.primaryColor}]`} />
            {data.personalInfo.email}
          </span>
          <span className="flex items-center gap-2">
            <Phone className={`w-4 h-4 text-[${colors.primaryColor}]`} />
            {data.personalInfo.phone}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 text-[${colors.primaryColor}]`} />
            {data.personalInfo.location}
          </span>
          <span className="flex items-center gap-2">
            <Globe className={`w-4 h-4 text-[${colors.primaryColor}]`} />
            {data.personalInfo.linkedin}
          </span>
        </div>
      </div>

      {/* Resumen */}
      <section className="mb-12">
        <p
          className={`${finalSecondaryTextColorClass} leading-relaxed text-center max-w-3xl mx-auto font-light text-lg`}
        >
          {data.summary}
        </p>
      </section>

      {/* Experiencia */}
      <section className="mb-12">
        <h3 className={`text-xl font-light ${finalTextColorClass} mb-8 text-center tracking-wide`}>EXPERIENCIA</h3>

        <div className="space-y-8">
          {data.experience.map((exp, index) => (
            <div key={index} className={`border-l-2 ${borderColorClass} pl-8 relative`}>
              <div className={`absolute w-3 h-3 ${bulletColorClass} rounded-full -left-2 top-2`}></div>

              <div className="mb-4">
                <h4 className={`text-lg font-medium ${finalTextColorClass}`}>{exp.position}</h4>
                <p className={`${finalSecondaryTextColorClass} font-light`}>{exp.company}</p>
                <p className={`${finalSecondaryTextColorClass} text-sm`}>{exp.period}</p>
              </div>

              <ul className={`${finalSecondaryTextColorClass} space-y-2 font-light`}>
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
        <h3 className={`text-xl font-light ${finalTextColorClass} mb-8 text-center tracking-wide`}>EDUCACIÓN</h3>

        {data.education.map((edu) => (
          <div key={edu.id} className="text-center">
            <h4 className={`text-lg font-medium ${finalTextColorClass}`}>{edu.degree}</h4>
            <p className={`${finalSecondaryTextColorClass} font-light`}>{edu.institution}</p>
            <p className={`${finalSecondaryTextColorClass} text-sm`}>{edu.period}</p>
            <p className={`${finalSecondaryTextColorClass} mt-2 font-light`}>{edu.details}</p>
          </div>
        ))}
      </section>

      {/* Habilidades */}
      <section className="mb-12">
        <h3 className={`text-xl font-light ${finalTextColorClass} mb-8 text-center tracking-wide`}>HABILIDADES</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <h4 className={`font-medium ${finalTextColorClass} mb-4`}>Técnicas</h4>
            <p
              className={`px-3 py-1 rounded-full text-sm font-light leading-relaxed inline-block`}
              style={getTagStyle(true)}
            >
              {data.technicalSkills.join(" • ")}
            </p>
          </div>

          <div className="text-center">
            <h4 className={`font-medium ${finalTextColorClass} mb-4`}>Interpersonales</h4>
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
        <h3 className={`text-xl font-light ${finalTextColorClass} mb-8 text-center tracking-wide`}>IDIOMAS</h3>

        <div className="flex justify-center gap-8">
          {data.languages.map((lang) => (
            <div key={lang.id} className="text-center">
              <p className={`font-medium ${finalTextColorClass}`}>{lang.language}</p>
              <p className={`${finalSecondaryTextColorClass} font-light text-sm`}>{lang.level}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certificaciones */}
      <section className="mb-12">
        <h3 className={`text-xl font-light ${finalTextColorClass} mb-8 text-center tracking-wide`}>CERTIFICACIONES</h3>
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
        <h3 className={`text-xl font-light ${finalTextColorClass} mb-8 text-center tracking-wide`}>
          PROYECTOS DESTACADOS
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.projects.length > 0 ? (
            data.projects.map((project) => (
              <div
                key={project.id}
                className={`bg-gray-100 rounded-lg overflow-hidden shadow-md ${isDarkMode ? `border-2 border-gray-600` : ""} transition-colors`}
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
                className={`bg-gray-100 rounded-lg overflow-hidden shadow-md ${isDarkMode ? `border-2 border-gray-600` : ""} transition-colors`}
              >
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Proyecto Placeholder 1"
                  className="w-full h-32 object-cover"
                />
                <p className={`p-2 text-sm ${finalSecondaryTextColorClass} text-center`}>[Nombre del Proyecto 1]</p>
              </div>
              <div
                className={`bg-gray-100 rounded-lg overflow-hidden shadow-md ${isDarkMode ? `border-2 border-gray-600` : ""} transition-colors`}
              >
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Proyecto Placeholder 2"
                  className="w-full h-32 object-cover"
                />
                <p className={`p-2 text-sm ${finalSecondaryTextColorClass} text-center`}>[Nombre del Proyecto 2]</p>
              </div>
              <div
                className={`bg-gray-100 rounded-lg overflow-hidden shadow-md ${isDarkMode ? `border-2 border-gray-600` : ""} transition-colors`}
              >
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Proyecto Placeholder 3"
                  className="w-full h-32 object-cover"
                />
                <p className={`p-2 text-sm ${finalSecondaryTextColorClass} text-center`}>[Nombre del Proyecto 3]</p>
              </div>
              <div
                className={`bg-gray-100 rounded-lg overflow-hidden shadow-md ${isDarkMode ? `border-2 border-gray-600` : ""} transition-colors`}
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
    </div>
  )
}
