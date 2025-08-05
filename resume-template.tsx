"use client"
import { useState, useRef } from "react"
import CurriculumPreview from "@/components/curriculum-preview"
import { CurriculumEditor } from "@/components/curriculum-editor"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Button } from "@/components/ui/button"

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

const initialData: CurriculumData = {
  personalInfo: {
    name: "Martín Moore",
    title: "Cocinero Profesional & Analista de Procesos",
    email: "martin.alejandro.moore@gmail.com",
    phone: "+34 607 156 015",
    location: "Barcelona, España",
    website: "https://www.tu-web-personal.com",
    linkedin: "linkedin.com/in/martin-moore",
    github: "github.com/martin-moore",
    profilePhoto: "",
    profilePhotoBackgroundColor: "",
    portfolioTitle: "Portfolio y Más",
    portfolioDescription: "Escanea para ver mi portfolio completo y blog culinario",
    portfolioWebsite: "tu-web-portfolio.com",
    qrCodeImage: "",
  },
  summary:
    "Apasionado de la cocina con experiencia práctica en cocina de bar y organización de eventos gastronómicos para grupos grandes. Profesional administrativo con sólida trayectoria en gestión de procesos, automatización y capacitación de equipos. Busco integrar mi creatividad culinaria con mis habilidades analíticas y de gestión para aportar valor en entornos dinámicos.",
  experience: [
    {
      id: "1",
      position: "Analista de Procesos y Formador",
      company: "Conexión Salud",
      period: "Septiembre 2021 – Marzo 2025",
      achievements: [
        "Gestión administrativa y atención a afiliados, optimizando procesos mediante automatización con Python y Power BI",
        "Lideré proyectos clave de digitalización como desarrollo de chatbot y creación de dashboards en tiempo real",
        "Capacité equipos comerciales y otros departamentos, impulsando el uso de nuevas herramientas",
      ],
      keywords: ["Python", "Power BI", "Automatización", "Chatbot", "Dashboards", "Capacitación", "Digitalización"],
    },
    {
      id: "2",
      position: "Cocinero y Organizador de Eventos Gastronómicos",
      company: "Freelance y Bar Runa Avellaneda",
      period: "Junio 2021 – Sept 2021 (Bar) / Desde entonces (Eventos)",
      achievements: [
        "Preparación y servicio de platos con atención a calidad y tiempos",
        "Diseño y ejecución de menús personalizados para eventos privados, cocinando para grupos de hasta 31 personas",
        "Gestión integral de logística y coordinación gastronómica",
      ],
      keywords: ["Cocina profesional", "Eventos", "Gestión", "Logística", "Menús personalizados", "Calidad"],
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "Diploma de Educación Secundaria",
      institution: "Instituto French — Buenos Aires, Argentina",
      period: "2012 - 2018",
      details: "Especialización en Economía",
    },
  ],
  technicalSkills: [
    "Python",
    "Power BI",
    "Excel Avanzado",
    "Chatbots",
    "Automatización",
    "Análisis de Datos",
    "SQL",
    "JavaScript",
  ],
  softSkills: [
    "Liderazgo",
    "Comunicación",
    "Trabajo en equipo",
    "Resolución de problemas",
    "Adaptabilidad",
    "Creatividad",
  ],
  languages: [
    { id: "lang1", language: "Español", level: "Nativo" },
    { id: "lang2", language: "Inglés", level: "Conversacional" },
  ],
  projects: [
    {
      id: "proj1",
      name: "Sistema de Gestión de Eventos",
      description: "Desarrollo de aplicación web para gestión integral de eventos gastronómicos",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "github.com/martin-moore/event-management",
      imageUrls: ["/placeholder.svg?height=100&width=100&text=Project+Image+1"],
    },
    {
      id: "proj2",
      name: "Dashboard de Ventas Interactivo",
      description: "Creación de un dashboard interactivo para visualizar métricas de ventas en tiempo real.",
      technologies: ["Power BI", "SQL", "Excel"],
      link: "",
      imageUrls: ["/placeholder.svg?height=100&width=100&text=Project+Image+2"],
    },
  ],
  certifications: ["Certificación en Power BI", "Curso de Python Avanzado", "Manipulador de Alimentos"],
  interests: ["Gastronomía Creativa", "Desarrollo Web", "Proyectos Culinarios", "Tecnología", "Automatización"],
  keywords: ["Python", "Power BI", "Automatización", "Cocina", "Eventos", "Análisis", "Gestión", "Digitalización"],
}

const colorThemes = {
  teal: {
    name: "Teal",
    primary: "teal-500",
    secondary: "green-500",
    previewPrimary: "#10B981", // Hex for direct use
    previewSecondary: "#22C55E", // Hex for direct use
  },
  orange: {
    name: "Naranja",
    primary: "rgb(242,89,13)",
    secondary: "green-600",
    previewPrimary: "rgb(242,89,13)", // RGB for direct use
    previewSecondary: "#16A34A", // Hex for direct use
  },
  blue: {
    name: "Azul",
    primary: "blue-500",
    secondary: "purple-500",
    previewPrimary: "#3B82F6", // Hex for direct use
    previewSecondary: "#9333EA", // Hex for direct use
  },
  green: {
    name: "Verde",
    primary: "green-500",
    secondary: "blue-500",
    previewPrimary: "#22C55E", // Hex for direct use
    previewSecondary: "#3B82F6", // Hex for direct use
  },
  purple: {
    name: "Púrpura",
    primary: "purple-500",
    secondary: "pink-500",
    previewPrimary: "#9333EA", // Hex for direct use
    previewSecondary: "#EC4899", // Hex for direct use
  },
}

export default function Home() {
  const [data, setData] = useState<CurriculumData>(initialData)
  const [selectedTemplate, setSelectedTemplate] = useState("socialMedia")
  const [selectedTheme, setSelectedTheme] = useState("orange")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [customBackgroundColor, setCustomBackgroundColor] = useState("")
  const [customTextColor, setCustomTextColor] = useState("black")
  const [customTagPrimaryColor, setCustomTagPrimaryColor] = useState("")
  const [customTagSecondaryColor, setCustomTagSecondaryColor] = useState("")
  const [profilePhotoBackgroundColor, setProfilePhotoBackgroundColor] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)

  const previewRef = useRef<HTMLDivElement>(null)

  const handleDownloadPdf = async () => {
    if (previewRef.current) {
      setIsDownloading(true)
      try {
        // Add a temporary class to the body for print styles if dark mode is active
        if (isDarkMode && selectedTemplate !== "corporate") {
          document.body.classList.add("dark-mode-print")
        }

        const canvas = await html2canvas(previewRef.current, {
          scale: 2, // Increase scale for better quality
          useCORS: true, // Enable CORS for images if any
          logging: true,
          windowWidth: previewRef.current.scrollWidth,
          windowHeight: previewRef.current.scrollHeight,
          backgroundColor: "#ffffff", // Explicitly set background to white for PDF
        })
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF("p", "mm", "a4") // Portrait, millimeters, A4 size
        const imgWidth = 210 // A4 width in mm
        const pageHeight = 297 // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        let heightLeft = imgHeight
        let position = 0

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }

        pdf.save(`${data.personalInfo.name || "curriculum"}.pdf`)
      } catch (error) {
        console.error("Error generating PDF:", error)
        alert("Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.")
      } finally {
        setIsDownloading(false)
        // Remove the temporary class after printing
        if (isDarkMode && selectedTemplate !== "corporate") {
          document.body.classList.remove("dark-mode-print")
        }
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel: Editor */}
      <div className="w-1/2 p-4 overflow-y-auto border-r">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generador de Currículums Profesionales</h1>
        <p className="text-gray-600 mb-6">
          Crea currículums optimizados para diferentes tipos de empresas y sistemas ATS
        </p>
        <CurriculumEditor
          data={data}
          onDataChange={setData}
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
          profilePhotoBackgroundColor={profilePhotoBackgroundColor}
          onProfilePhotoBackgroundColorChange={setProfilePhotoBackgroundColor}
          initialData={initialData} // Pass initialData for reset functionality
        />
      </div>

      {/* Right Panel: Preview */}
      <div className="w-1/2 p-4 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Vista Previa</h2>
          <Button onClick={handleDownloadPdf} disabled={isDownloading}>
            {isDownloading ? (
              "Descargando..."
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" /> Descargar PDF
              </>
            )}
          </Button>
        </div>
        <div className="border rounded-lg overflow-hidden bg-white">
          <CurriculumPreview
            data={data}
            selectedTemplate={selectedTemplate}
            selectedTheme={selectedTheme}
            isDarkMode={isDarkMode}
            customBackgroundColor={customBackgroundColor}
            customTextColor={customTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            profilePhotoBackgroundColor={profilePhotoBackgroundColor}
            previewRef={previewRef} // Pass the ref to the preview component
          />
        </div>
      </div>
    </div>
  )
}
