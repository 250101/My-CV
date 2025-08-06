"use client"

import { useState, useRef } from "react"
import CurriculumPreview from "@/components/curriculum-preview"
import { CurriculumEditor } from "@/components/curriculum-editor"
import { Download, FileText, FilePlus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { CurriculumData, ProfessionalProfile, SectionType } from "@/lib/types"
import { PROFESSIONAL_PROFILES } from "@/lib/professional-profiles"
import CVExporter from "@/lib/export-utils"

// Professional profile configurations and data management

// Datos iniciales de ejemplo para el currículum
const initialData: CurriculumData = {
  personalInfo: {
    name: "Juan Carlos Mendoza",
    title: "Cocinero Profesional & Analista de Procesos",
    email: "juan.mendoza@email.com",
    phone: "+54 11 1234-5678",
    location: "Buenos Aires, Argentina",
    website: "www.juanmendoza.com",
    linkedin: "linkedin.com/in/juanmendoza",
    github: "github.com/juanmendoza",
    profilePhoto: "/api/placeholder/150/150",
    profilePhotoBackgroundColor: "#f3f4f6",
    portfolioTitle: "Portfolio Culinario",
    portfolioDescription: "Especialista en alta cocina y gestión de procesos operativos",
    portfolioWebsite: "www.portfoliojuan.com",
    qrCodeImage: "/api/placeholder/100/100",
  },
  summary:
    "Profesional gastronómico con más de 8 años de experiencia en alta cocina y gestión de eventos gastronómicos para grupos grandes. Profesional administrativo con sólida trayectoria en gestión de procesos, automatización y capacitación de equipos. Busco integrar mi creatividad culinaria con mis habilidades analíticas y de gestión para aportar valor en organizaciones que valoren la innovación y la excelencia operativa.",
  experience: [
    {
      id: "1",
      position: "Cocinero y Organizador de Eventos Gastronómicos",
      company: "Restaurante Gourmet Plaza",
      period: "2019 - Presente",
      achievements: [
        "Diseñé y ejecuté menús para eventos corporativos de hasta 500 personas, aumentando la satisfacción del cliente en un 35%",
        "Implementé un sistema de gestión de inventarios que redujo el desperdicio de alimentos en un 25%",
        "Capacité a un equipo de 12 cocineros en técnicas de alta cocina y estándares de calidad",
        "Desarrollé 15 nuevas recetas que se incorporaron al menú permanente del restaurante",
      ],
      keywords: ["Cocina profesional", "Eventos", "Gestión", "Logística", "Menús personalizados", "Calidad"],
    },
    {
      id: "2",
      position: "Analista de Procesos y Automatización",
      company: "Corporación Administrativa SA",
      period: "2016 - 2019",
      achievements: [
        "Automaticé 8 procesos administrativos críticos, reduciendo tiempos de ejecución en un 40%",
        "Desarrollé dashboards en Power BI para el seguimiento de KPIs operativos",
        "Capacité a 50+ empleados en herramientas de automatización y análisis de datos",
        "Lideré la implementación de un chatbot interno que mejoró la comunicación interdepartamental",
      ],
      keywords: ["Python", "Power BI", "Automatización", "Chatbot", "Dashboards", "Capacitación", "Digitalización"],
    },
  ],
  education: [
    {
      id: "1",
      degree: "Técnico Superior en Gastronomía",
      institution: "Instituto Argentino de Gastronomía",
      period: "2014 - 2016",
      details: "Especialización en cocina internacional y gestión de restaurantes",
      gpa: "8.9/10",
    },
    {
      id: "2",
      degree: "Analista en Sistemas",
      institution: "Universidad Tecnológica Nacional",
      period: "2012 - 2015",
      details: "Enfoque en desarrollo de software y análisis de datos",
      gpa: "8.2/10",
    },
  ],
  technicalSkills: [
    "Python",
    "Power BI",
    "Excel Avanzado",
    "Técnicas culinarias",
    "Gestión de inventarios",
    "Planificación de menús",
    "Automatización de procesos",
    "Análisis de datos",
  ],
  softSkills: [
    "Liderazgo de equipos",
    "Comunicación efectiva",
    "Gestión del tiempo",
    "Creatividad",
    "Trabajo bajo presión",
    "Resolución de problemas",
    "Adaptabilidad",
    "Orientación al cliente",
  ],
  languages: [
    { id: "1", language: "Español", level: "Nativo" },
    { id: "2", language: "Inglés", level: "Intermedio-Alto" },
    { id: "3", language: "Portugués", level: "Básico" },
  ],
  projects: [
    {
      id: "1",
      name: "Sistema de Gestión de Eventos Gastronómicos",
      description: "Plataforma web para la gestión integral de eventos, desde la planificación del menú hasta el control de costos",
      technologies: ["React", "Node.js", "MongoDB", "Excel"],
      link: "github.com/juanmendoza/eventos-gastronomicos",
      imageUrls: ["/api/placeholder/400/300"],
    },
    {
      id: "2",
      name: "Dashboard de Control de Inventarios",
      description: "Sistema de seguimiento en tiempo real de inventarios de cocina con alertas automáticas",
      technologies: ["Power BI", "Python", "SQL"],
      link: "portfolio.juanmendoza.com/inventarios",
      imageUrls: ["/api/placeholder/400/300"],
    },
  ],
  certifications: [
    "Certificación en Manipulación de Alimentos",
    "Google Analytics Certified",
    "Scrum Master Certification",
    "Certificación en Power BI",
  ],
  interests: ["Gastronomía Creativa", "Desarrollo Web", "Proyectos Culinarios", "Tecnología", "Automatización"],
  keywords: ["Python", "Power BI", "Automatización", "Cocina", "Eventos", "Análisis", "Gestión", "Digitalización"],
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
    portfolioTitle: "",
    portfolioDescription: "",
    portfolioWebsite: "",
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

const Page = () => {
  const [data, setData] = useState<CurriculumData>(initialData)
  const [selectedTemplate, setSelectedTemplate] = useState("socialMedia")
  const [selectedTheme, setSelectedTheme] = useState("orange")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [customBackgroundColor, setCustomBackgroundColor] = useState("")
  const [customTextColor, setCustomTextColor] = useState("black")
  const [customTagPrimaryColor, setCustomTagPrimaryColor] = useState("")
  const [customTagSecondaryColor, setCustomTagSecondaryColor] = useState("")
  // profilePhotoBackgroundColor is now part of data.personalInfo
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<ProfessionalProfile | null>(null)
  const [enabledSections, setEnabledSections] = useState<SectionType[]>(Object.values(SectionType))
  const [sectionOrder, setSectionOrder] = useState<SectionType[]>([
    SectionType.PERSONAL_INFO,
    SectionType.SUMMARY,
    SectionType.TECHNICAL_SKILLS,
    SectionType.SOFT_SKILLS,
    SectionType.EXPERIENCE,
    SectionType.EDUCATION,
    SectionType.CERTIFICATIONS,
    SectionType.PROJECTS,
    SectionType.LANGUAGES,
    SectionType.INTERESTS,
  ])

  const previewRef = useRef<HTMLDivElement>(null)

  // Professional profile handling
  const handleProfileChange = (profile: ProfessionalProfile) => {
    setSelectedProfile(profile)
    const profileConfig = PROFESSIONAL_PROFILES[profile]
    setEnabledSections([...profileConfig.requiredSections, ...profileConfig.optionalSections])
    setSectionOrder(profileConfig.sectionOrder)
  }

  // Enhanced export functions
  const handleExport = async (format: 'pdf' | 'docx' | 'txt') => {
    if (!previewRef.current && format === 'pdf') return
    
    setIsDownloading(true)
    const filename = data.personalInfo.name || "curriculum"
    
    try {
      switch (format) {
        case 'pdf':
          await CVExporter.exportToPDF(previewRef.current!, filename)
          break
        case 'docx':
          await CVExporter.exportToWord(data, filename)
          break
        case 'txt':
          await CVExporter.exportToTXT(data, filename)
          break
      }
    } catch (error) {
      console.error(`Error exporting ${format.toUpperCase()}:`, error)
      alert(`Hubo un error al exportar el archivo ${format.toUpperCase()}. Por favor, inténtalo de nuevo.`)
    } finally {
      setIsDownloading(false)
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
          // Pass profilePhotoBackgroundColor from data.personalInfo
          profilePhotoBackgroundColor={data.personalInfo.profilePhotoBackgroundColor}
          // Update personalInfo directly for profilePhotoBackgroundColor
          onProfilePhotoBackgroundColorChange={(color) =>
            setData((prev) => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, profilePhotoBackgroundColor: color },
            }))
          }
          initialData={emptyCurriculumData} // Pass empty data for reset functionality
        />
      </div>

      {/* Right Panel: Preview */}
      <div className="w-1/2 p-4 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Vista Previa</h2>
          <div className="flex gap-2">
            {/* Professional Profile Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  {selectedProfile ? PROFESSIONAL_PROFILES[selectedProfile].name : "Seleccionar Perfil"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(PROFESSIONAL_PROFILES).map(([key, profile]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => handleProfileChange(key as ProfessionalProfile)}
                  >
                    {profile.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Export Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={isDownloading}>
                  {isDownloading ? (
                    "Exportando..."
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Exportar como PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('docx')}>
                  <FilePlus className="h-4 w-4 mr-2" />
                  Exportar como Word
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('txt')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Exportar como TXT
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Removed overflow-hidden from this div */}
        <div className="border rounded-lg bg-white">
          <CurriculumPreview
            data={data}
            selectedTemplate={selectedTemplate}
            selectedTheme={selectedTheme}
            isDarkMode={isDarkMode}
            customBackgroundColor={customBackgroundColor}
            customTextColor={customTextColor}
            customTagPrimaryColor={customTagPrimaryColor}
            customTagSecondaryColor={customTagSecondaryColor}
            profilePhotoBackgroundColor={data.personalInfo.profilePhotoBackgroundColor} // Use from data
            previewRef={previewRef} // Pass the ref to the preview component
            enabledSections={enabledSections}
            sectionOrder={sectionOrder}
          />
        </div>
      </div>
    </div>
  )
}

export default Page