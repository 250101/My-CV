"use client"

import { useState } from "react"
import CurriculumEditor, { type CurriculumData } from "@/components/curriculum-editor"
import CurriculumPreview from "@/components/curriculum-preview"

export default function PlantillaCurriculum() {
  const initialCurriculumData: CurriculumData = {
    personalInfo: {
      name: "Jane Doe",
      title: "Diseñadora UX/UI",
      email: "jane.doe@example.com",
      phone: "+1 (987) 654-3210",
      location: "Barcelona, España",
      website: "https://janedoe.design",
      linkedin: "https://linkedin.com/in/janedoe",
      github: "https://github.com/janedoe",
      profilePhoto: "/placeholder.svg?height=128&width=128",
      profilePhotoBackgroundColor: "#FFDDC1",
      portfolioTitle: "Mi Portfolio de Diseño",
      portfolioDescription: "Descubre mis proyectos de diseño de interfaz y experiencia de usuario.",
      portfolioWebsite: "https://janedoe.design/portfolio",
      qrCodeImage: "/placeholder.svg?height=100&width=100",
    },
    summary:
      "Diseñadora UX/UI creativa y orientada a resultados con 4 años de experiencia en el diseño de productos digitales intuitivos y atractivos. Habilidad para transformar conceptos complejos en soluciones de usuario elegantes y funcionales.",
    experience: [
      {
        id: "exp3",
        position: "Diseñadora UX/UI Senior",
        company: "Creative Solutions Studio",
        period: "Febrero 2021 - Presente",
        achievements: [
          "Diseñé la interfaz de usuario para una aplicación móvil que alcanzó 1 millón de descargas en 6 meses.",
          "Realicé investigaciones de usuario y pruebas de usabilidad, mejorando la satisfacción del usuario en un 25%.",
          "Colaboré con equipos de desarrollo para asegurar la implementación fiel de los diseños.",
        ],
        keywords: ["UX Design", "UI Design", "Figma", "Prototyping", "User Research", "Mobile App Design"],
      },
      {
        id: "exp4",
        position: "Diseñadora Gráfica",
        company: "Marketing Innovators",
        period: "Abril 2017 - Enero 2021",
        achievements: [
          "Desarrollé identidades de marca completas para más de 15 clientes.",
          "Creé materiales de marketing digital y impreso que aumentaron el engagement en redes sociales en un 40%.",
          "Gestioné proyectos de diseño desde la conceptualización hasta la entrega final.",
        ],
        keywords: ["Graphic Design", "Branding", "Adobe Creative Suite", "Marketing Materials"],
      },
    ],
    education: [
      {
        id: "edu3",
        degree: "Máster en Diseño de Interacción",
        institution: "Escuela Superior de Diseño de Barcelona (ESDI)",
        period: "2016 - 2017",
        details: "Enfoque en diseño centrado en el usuario y metodologías ágiles.",
        gpa: "Sobresaliente",
      },
      {
        id: "edu4",
        degree: "Grado en Diseño Gráfico",
        institution: "Universidad de Barcelona (UB)",
        period: "2012 - 2016",
        details: "Proyecto final: Rediseño de la experiencia de usuario de un sitio web de noticias.",
      },
    ],
    technicalSkills: [
      "Figma",
      "Sketch",
      "Adobe XD",
      "InVision",
      "Miro",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
      "Design Systems",
      "HTML",
      "CSS",
      "Sass",
      "Responsive Design",
    ],
    softSkills: [
      "Creatividad",
      "Empatía",
      "Colaboración",
      "Atención al detalle",
      "Comunicación visual",
      "Resolución de problemas",
    ],
    languages: [
      { id: "lang3", language: "Español", level: "Nativo" },
      { id: "lang4", language: "Inglés", level: "Avanzado" },
      { id: "lang5", language: "Catalán", level: "Nativo" },
    ],
    projects: [
      {
        id: "proj3",
        name: "Rediseño de App de Fitness",
        description:
          "Rediseño completo de la interfaz y experiencia de usuario de una popular aplicación de fitness, mejorando la retención de usuarios.",
        technologies: ["Figma", "User Research", "Prototyping"],
        link: "https://fitnessapp.design",
        imageUrls: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
      },
      {
        id: "proj4",
        name: "Plataforma de Aprendizaje Online",
        description:
          "Diseño UX/UI para una nueva plataforma de e-learning, enfocada en la gamificación y la interacción del usuario.",
        technologies: ["Sketch", "InVision", "Design Systems"],
        link: "https://elearning.design",
        imageUrls: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
      },
    ],
    certifications: [
      "Google UX Design Professional Certificate",
      "Certified Usability Analyst (CUA)",
      "Interaction Design Foundation (IxDF) Member",
    ],
    interests: ["Ilustración digital", "Viajes", "Diseño de interiores", "Yoga", "Cine"],
    keywords: [
      "Diseño UX",
      "Diseño UI",
      "Experiencia de Usuario",
      "Interfaz de Usuario",
      "Diseño de Producto",
      "Investigación de Usuario",
      "Prototipado",
      "Figma",
      "Diseño Responsivo",
    ],
  }

  const emptyCurriculumData: CurriculumData = {
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      profilePhoto: "",
      profilePhotoBackgroundColor: "",
      portfolioTitle: "",
      portfolioDescription: "",
      portfolioWebsite: "",
      qrCodeImage: "",
    },
    summary: "",
    experience: [],
    education: [],
    technicalSkills: [],
    softSkills: [],
    languages: [],
    projects: [],
    certifications: [],
    interests: [],
    keywords: [],
  }

  const [curriculumData, setCurriculumData] = useState<CurriculumData>(initialCurriculumData)
  const [selectedTemplate, setSelectedTemplate] = useState("creative")
  const [selectedTheme, setSelectedTheme] = useState("purple")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [customBackgroundColor, setCustomBackgroundColor] = useState("")
  const [customTextColor, setCustomTextColor] = useState("")
  const [customTagPrimaryColor, setCustomTagPrimaryColor] = useState("")
  const [customTagSecondaryColor, setCustomTagSecondaryColor] = useState("")

  // State to control scrolling in the editor
  const [activeEditorSectionId, setActiveEditorSectionId] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleSectionClick = (sectionId: string) => {
    setActiveEditorSectionId(sectionId)
  }

  const handleClearData = () => {
    setCurriculumData(emptyCurriculumData)
    setCustomBackgroundColor("")
    setCustomTextColor("")
    setCustomTagPrimaryColor("")
    setCustomTagSecondaryColor("")
    setSelectedTemplate("socialMedia")
    setSelectedTheme("orange")
    setIsDarkMode(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl h-screen flex flex-col">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-center">Generador de Currículums</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 pr-4 overflow-y-auto">
          <CurriculumEditor
            data={curriculumData}
            onDataChange={setCurriculumData}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            selectedTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
            isDarkMode={isDarkMode}
            onDarkModeChange={setIsDarkMode}
            customBackgroundColor={customBackgroundColor}
            onCustomBackgroundColorChange={setCustomBackgroundColor}
            customTextColor={customTextColor}
            onCustomTextColorChange={setCustomTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            onCustomTagPrimaryColorChange={setCustomTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            onCustomTagSecondaryColorChange={setCustomTagSecondaryColor}
            activeSectionId={activeEditorSectionId}
            onClearData={handleClearData} // Pass the clear data function
          />
        </div>
        <div className="w-1/2 pl-4 overflow-y-auto border-l">
          <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md">
            <CurriculumPreview
              data={curriculumData}
              selectedTemplate={selectedTemplate}
              selectedTheme={selectedTheme}
              isDarkMode={isDarkMode}
              customBackgroundColor={customBackgroundColor}
              customTextColor={customTextColor}
              customTagPrimaryColor={customTagPrimaryColor}
              customTagSecondaryColor={customTagSecondaryColor}
              profilePhotoBackgroundColor={curriculumData.personalInfo.profilePhotoBackgroundColor}
              onSectionClick={handleSectionClick}
              onDownloadStart={() => setIsDownloading(true)}
              onDownloadEnd={() => setIsDownloading(false)}
              isDownloading={isDownloading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
