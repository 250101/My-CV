"use client"

import { useState } from "react"
import CurriculumEditor, { type CurriculumData } from "@/components/curriculum-editor"
import CurriculumPreview from "@/components/curriculum-preview"

export default function ResumeTemplate() {
  const initialCurriculumData: CurriculumData = {
    personalInfo: {
      name: "John Doe",
      title: "Desarrollador Full Stack",
      email: "john.doe@example.com",
      phone: "+1 (123) 456-7890",
      location: "Ciudad de México, México",
      website: "https://johndoe.dev",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      profilePhoto: "/placeholder.svg?height=128&width=128",
      profilePhotoBackgroundColor: "#E0E7FF",
      portfolioTitle: "Mi Portfolio de Proyectos",
      portfolioDescription: "Explora mis proyectos más recientes y mis contribuciones.",
      portfolioWebsite: "https://johndoe.dev/portfolio",
      qrCodeImage: "/placeholder.svg?height=100&width=100",
    },
    summary:
      "Desarrollador Full Stack con 5 años de experiencia en la creación de aplicaciones web robustas y escalables. Experto en React, Node.js y bases de datos NoSQL. Apasionado por la resolución de problemas y la entrega de soluciones de alta calidad.",
    experience: [
      {
        id: "exp1",
        position: "Desarrollador Senior de Software",
        company: "Tech Solutions Inc.",
        period: "Enero 2022 - Presente",
        achievements: [
          "Lideré el desarrollo de una nueva plataforma de e-commerce, resultando en un aumento del 30% en las ventas.",
          "Implementé microservicios utilizando Node.js y Docker, mejorando la escalabilidad del sistema en un 50%.",
          "Mentoricé a un equipo de 3 desarrolladores junior, mejorando la productividad del equipo en un 20%.",
        ],
        keywords: ["React", "Node.js", "MongoDB", "Docker", "AWS", "Microservicios"],
      },
      {
        id: "exp2",
        position: "Desarrollador de Software",
        company: "Innovatech",
        period: "Marzo 2019 - Diciembre 2021",
        achievements: [
          "Desarrollé y mantuve componentes de interfaz de usuario utilizando React y Redux.",
          "Colaboré en el diseño de APIs RESTful para la integración de servicios de terceros.",
          "Optimicé el rendimiento de la base de datos, reduciendo los tiempos de carga en un 15%.",
        ],
        keywords: ["JavaScript", "React", "Redux", "Express.js", "PostgreSQL"],
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "Maestría en Ciencias de la Computación",
        institution: "Universidad Nacional Autónoma de México (UNAM)",
        period: "2017 - 2019",
        details: "Especialización en Inteligencia Artificial y Aprendizaje Automático.",
        gpa: "3.9/4.0",
      },
      {
        id: "edu2",
        degree: "Licenciatura en Ingeniería en Sistemas Computacionales",
        institution: "Instituto Tecnológico de Monterrey (ITESM)",
        period: "2013 - 2017",
        details: "Proyecto final: Sistema de gestión de inventario basado en la nube.",
      },
    ],
    technicalSkills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "SQL",
      "GraphQL",
      "Docker",
      "AWS",
      "Git",
      "RESTful APIs",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
    softSkills: [
      "Comunicación",
      "Trabajo en equipo",
      "Resolución de problemas",
      "Adaptabilidad",
      "Liderazgo",
      "Pensamiento crítico",
    ],
    languages: [
      { id: "lang1", language: "Español", level: "Nativo" },
      { id: "lang2", language: "Inglés", level: "Fluido" },
    ],
    projects: [
      {
        id: "proj1",
        name: "Plataforma de Gestión de Proyectos",
        description:
          "Una aplicación web para la gestión de tareas y proyectos en equipo, con funcionalidades de seguimiento de progreso y colaboración en tiempo real.",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        link: "https://project-manager.example.com",
        imageUrls: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
      },
      {
        id: "proj2",
        name: "Blog Personal con CMS",
        description:
          "Un blog personal desarrollado con Next.js y un CMS headless para la creación y publicación de contenido.",
        technologies: ["Next.js", "GraphQL", "Strapi", "Tailwind CSS"],
        link: "https://myblog.example.com",
        imageUrls: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
      },
    ],
    certifications: [
      "AWS Certified Solutions Architect - Associate",
      "Certified Kubernetes Administrator (CKA)",
      "Scrum Master Certified (SMC)",
    ],
    interests: ["Senderismo", "Fotografía", "Cocina", "Lectura", "Videojuegos"],
    keywords: [
      "Desarrollo Web",
      "Frontend",
      "Backend",
      "Bases de Datos",
      "Cloud Computing",
      "Metodologías Ágiles",
      "DevOps",
      "Inteligencia Artificial",
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
  const [selectedTemplate, setSelectedTemplate] = useState("socialMedia")
  const [selectedTheme, setSelectedTheme] = useState("orange")
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
