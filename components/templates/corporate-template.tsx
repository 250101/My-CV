import { Mail, Phone, MapPin, Globe, Calendar } from "lucide-react"

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
}

interface CorporateTemplateProps {
  data: CurriculumData
  selectedTheme: string // Not directly used for colors, but passed for consistency
  isDarkMode: boolean // Not directly used for colors, but passed for consistency
  customBackgroundColor: string // Not used, but passed for consistency
  customTextColor: string // Not used, but passed for consistency
  customTagPrimaryColor: string // Not used, but passed for consistency
  customTagSecondaryColor: string // Not used, but passed for consistency
}

export default function CorporateTemplate({ data }: CorporateTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white text-black">
      {/* Header Corporativo - Siempre blanco y negro */}
      <div className="bg-white text-black p-8 border-b border-gray-300">
        <div className="flex items-center gap-6">
          {data.personalInfo.profilePhoto && (
            <div className="flex-shrink-0">
              <img
                src={data.personalInfo.profilePhoto || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
              />
            </div>
          )}

          {data.personalInfo.qrCodeImage && (
            <div className="flex-shrink-0">
              <img
                src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
                alt="QR Code"
                className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
              />
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
            <h2 className="text-xl text-gray-700 mb-4">{data.personalInfo.title}</h2>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                {data.personalInfo.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-600" />
                {data.personalInfo.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                {data.personalInfo.location}
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600" />
                {data.personalInfo.linkedin}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Resumen Ejecutivo */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-300">Resumen Ejecutivo</h3>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </section>

        {/* Experiencia Profesional */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-300">Experiencia Profesional</h3>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border-l-4 border-gray-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-black">{exp.position}</h4>
                    <p className="text-gray-700 font-medium text-lg">{exp.company}</p>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm bg-white px-3 py-1 rounded-full border border-gray-200">
                    <Calendar className="w-4 h-4 mr-1" />
                    {exp.period}
                  </div>
                </div>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="leading-relaxed">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Educación y Competencias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section>
            <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-300">Formación Académica</h3>
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white p-6 rounded-lg border-l-4 border-gray-300">
                <h4 className="text-lg font-semibold text-black">{edu.degree}</h4>
                <p className="text-gray-700 font-medium">{edu.institution}</p>
                <p className="text-gray-500 text-sm">{edu.period}</p>
                <p className="text-gray-700 mt-2">{edu.details}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-300">
              Competencias Profesionales
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-black mb-2">Competencias Técnicas</h4>
                <div className="flex flex-wrap gap-2">
                  {data.technicalSkills.map((skill) => (
                    <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-black mb-2">Competencias Interpersonales</h4>
                <div className="flex flex-wrap gap-2">
                  {data.softSkills.map((skill) => (
                    <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Idiomas */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-300">
            Competencias Lingüísticas
          </h3>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="font-medium text-black">{lang.language}</span>
                  <span className="text-gray-600 bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proyectos */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-300">Proyectos</h3>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg border-l-4 border-gray-300">
                <h4 className="text-lg font-semibold text-black">{project.name}</h4>
                <p className="text-gray-700 leading-relaxed text-justify">{project.description}</p>
                {project.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt="Project Image"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <div className="mt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Ver Proyecto
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Certificaciones */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-300">Certificaciones</h3>
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert) => (
              <span key={cert} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {cert}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
