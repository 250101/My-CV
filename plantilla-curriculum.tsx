"use client"

import { useState } from "react"
import { CurriculumEditor } from "@/components/curriculum-editor"
import CurriculumPreview from "@/components/curriculum-preview"

// Define las interfaces para la estructura de los datos del currículum
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
  profilePhotoBackgroundColor?: string
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
  imageUrls?: string[]
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

export default function CurriculumTemplate() {
  const [curriculumData, setCurriculumData] = useState<CurriculumData>({
    personalInfo: {
      name: "John Doe",
      title: "Desarrollador Full Stack",
      email: "john.doe@example.com",
      phone: "+1 (123) 456-7890",
      location: "San Francisco, CA",
      website: "www.johndoe.com",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      profilePhoto: "/placeholder.svg?height=300&width=300",
      profilePhotoBackgroundColor: "#E0F2F7", // Light blue for profile photo background
      portfolioTitle: "Visita mi Portfolio",
      portfolioDescription: "Explora mis proyectos y soluciones innovadoras.",
      portfolioWebsite: "www.johndoeportfolio.com",
      qrCodeImage: "/placeholder.svg?height=100&width=100",
    },
    summary:
      "Desarrollador Full Stack con 5 años de experiencia en la creación de aplicaciones web robustas y escalables. Experto en React, Node.js y bases de datos SQL/NoSQL. Apasionado por la resolución de problemas y la creación de experiencias de usuario excepcionales.",
    experience: [
      {
        id: "1",
        position: "Ingeniero de Software Senior",
        company: "Tech Solutions Inc.",
        period: "Enero 2022 - Presente",
        achievements: [
          "Lideré el desarrollo de una nueva plataforma de e-commerce, aumentando las ventas en un 30%.",
          "Implementé microservicios utilizando Node.js y Docker, mejorando la escalabilidad en un 50%.",
          "Optimicé la base de datos PostgreSQL, reduciendo los tiempos de respuesta de las consultas en un 25%.",
        ],
        keywords: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
      },
      {
        id: "2",
        position: "Desarrollador Web",
        company: "Creative Agency",
        period: "Julio 2019 - Diciembre 2021",
        achievements: [
          "Desarrollé y mantuve sitios web responsivos utilizando React y Next.js.",
          "Colaboré con diseñadores para traducir wireframes y maquetas en código de alta calidad.",
          "Implementé APIs RESTful para integrar servicios de terceros.",
        ],
        keywords: ["React", "Next.js", "JavaScript", "REST APIs", "UI/UX"],
      },
    ],
    education: [
      {
        id: "1",
        degree: "Máster en Ciencias de la Computación",
        institution: "Universidad Tecnológica",
        period: "2018 - 2020",
        details: "Especialización en Inteligencia Artificial y Machine Learning.",
        gpa: "3.9/4.0",
      },
      {
        id: "2",
        degree: "Grado en Ingeniería Informática",
        institution: "Universidad Nacional",
        period: "2014 - 2018",
        details: "Proyecto final sobre sistemas distribuidos.",
      },
    ],
    technicalSkills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "SQL",
      "NoSQL",
      "AWS",
      "Docker",
      "Git",
      "GraphQL",
      "Tailwind CSS",
    ],
    softSkills: [
      "Comunicación",
      "Trabajo en equipo",
      "Resolución de problemas",
      "Adaptabilidad",
      "Liderazgo",
      "Creatividad",
    ],
    languages: [
      { id: "1", language: "Español", level: "Nativo" },
      { id: "2", language: "Inglés", level: "Fluido" },
      { id: "3", language: "Francés", level: "Básico" },
    ],
    projects: [
      {
        id: "1",
        name: "Plataforma de Gestión de Proyectos",
        description: "Aplicación web para la gestión de tareas y proyectos en equipo.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
        link: "https://project-manager.com",
        imageUrls: ["/placeholder.svg?height=100&width=100"],
      },
      {
        id: "2",
        name: "Aplicación de Recetas Saludables",
        description: "App móvil con recetas personalizadas y seguimiento nutricional.",
        technologies: ["React Native", "Firebase", "Redux"],
        link: "https://healthy-recipes.app",
        imageUrls: ["/placeholder.svg?height=100&width=100"],
      },
      {
        id: "3",
        name: "Sistema de Recomendación de Películas",
        description: "Algoritmo de recomendación basado en el historial de visualización del usuario.",
        technologies: ["Python", "Pandas", "Scikit-learn", "Flask"],
        link: "https://movie-recommender.ai",
        imageUrls: ["/placeholder.svg?height=100&width=100"],
      },
    ],
    certifications: ["Certificación AWS Certified Developer", "Scrum Master Certified (SMC)"],
    interests: ["Senderismo", "Fotografía", "Cocina", "Lectura", "Videojuegos"],
    keywords: [
      "Desarrollo Web",
      "Ingeniería de Software",
      "React",
      "Node.js",
      "Cloud Computing",
      "Metodologías Ágiles",
    ],
  })

  const [selectedTemplate, setSelectedTemplate] = useState("socialMedia")
  const [selectedTheme, setSelectedTheme] = useState("orange")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [customBackgroundColor, setCustomBackgroundColor] = useState("")
  const [customTextColor, setCustomTextColor] = useState("black") // Default to black
  const [customTagPrimaryColor, setCustomTagPrimaryColor] = useState("")
  const [customTagSecondaryColor, setCustomTagSecondaryColor] = useState("")

  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadStart = () => setIsDownloading(true)
  const handleDownloadEnd = () => setIsDownloading(false)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
        <CurriculumEditor
          data={curriculumData}
          onDataChange={setCurriculumData}
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
          isDarkMode={isDarkMode}
          onToggleDarkMode={setIsDarkMode}
          customBackgroundColor={customBackgroundColor}
          onCustomBackgroundColorChange={setCustomBackgroundColor}
          customTextColor={customTextColor}
          onCustomTextColorChange={setCustomTextColor}
          customTagPrimaryColor={customTagPrimaryColor}
          onCustomTagPrimaryColorChange={setCustomTagPrimaryColor}
          customTagSecondaryColor={customTagSecondaryColor}
          onCustomTagSecondaryColorChange={setCustomTagSecondaryColor}
        />
      </div>
      <div className="w-full lg:w-1/2 p-6 lg:p-8 flex justify-center items-start overflow-y-auto">
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
          onDownloadStart={handleDownloadStart}
          onDownloadEnd={handleDownloadEnd}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  )
}
