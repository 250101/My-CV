"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Edit,
  Eye,
  Palette,
  Upload,
  Save,
  FileText,
  Briefcase,
  Target,
  Plus,
  Trash2,
  Copy,
  Share2,
} from "lucide-react"
import CurriculumPreview from "./curriculum-preview" // Ahora CurriculumPreview es el que renderiza el template

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
  qrCodeImage?: string // Add this line for QR code image
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
  interests: string[]
  keywords: string[]
}

const templateTypes = {
  socialMedia: {
    name: "Inspirado en Redes Sociales",
    description: "Moderno y visual, con un toque fresco y personal.",
    icon: Share2,
    features: ["Diseño moderno", "Colores personalizables", "Espacio para foto", "Ideal para perfiles creativos"],
  },
  ats: {
    name: "ATS Optimizado",
    description: "Formato simple, optimizado para sistemas de filtrado automático.",
    icon: Target,
    features: ["Sin gráficos", "Palabras clave destacadas", "Formato estándar", "Fácil lectura por bots"],
  },
  corporate: {
    name: "Corporativo",
    description: "Profesional y conservador, ideal para empresas tradicionales.",
    icon: Briefcase,
    features: ["Diseño clásico", "Colores neutros", "Estructura formal", "Información completa"],
  },
  creative: {
    name: "Creativo/Diseño",
    description: "Moderno y visual, perfecto para roles creativos y startups.",
    icon: Palette,
    features: ["Diseño moderno", "Colores vibrantes", "Elementos visuales", "Sección de portfolio"],
  },
  minimal: {
    name: "Minimalista",
    description: "Limpio y directo, enfocado en el contenido esencial.",
    icon: FileText,
    features: ["Diseño limpio", "Espacios amplios", "Tipografía clara", "Información concisa"],
  },
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
    portfolioTitle: "Portfolio y Más",
    portfolioDescription: "Escanea para ver mi portfolio completo y blog culinario",
    portfolioWebsite: "tu-web-portfolio.com",
    qrCodeImage: "", // Add initial value for QR code image
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
      imageUrl: "",
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

export default function CurriculumGenerator() {
  const [data, setData] = useState<CurriculumData>(initialData)
  const [activeTab, setActiveTab] = useState("edit")
  const [selectedTemplate, setSelectedTemplate] = useState("socialMedia") // Default to the new template
  const [savedVersions, setSavedVersions] = useState<{ [key: string]: CurriculumData }>({})
  const [selectedTheme, setSelectedTheme] = useState("orange") // Default to orange
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [customBackgroundColor, setCustomBackgroundColor] = useState("") // New state for custom background color
  const [customTextColor, setCustomTextColor] = useState("black") // New state for custom text color (black/white)
  const [customTagPrimaryColor, setCustomTagPrimaryColor] = useState("") // New state for custom primary tag color
  const [customTagSecondaryColor, setCustomTagSecondaryColor] = useState("") // New state for custom secondary tag color
  const fileInputRef = useRef<HTMLInputElement>(null)
  const qrCodeInputRef = useRef<HTMLInputElement>(null) // Ref for QR code file input

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const handleExperienceChange = (id: string, field: keyof Experience, value: string | string[]) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      position: "",
      company: "",
      period: "",
      achievements: [""],
      keywords: [],
    }
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      period: "",
      details: "",
    }
    setData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const removeEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const handleSkillChange = (type: "technicalSkills" | "softSkills", skills: string) => {
    setData((prev) => ({
      ...prev,
      [type]: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill),
    }))
  }

  const handleLanguageChange = (id: string, field: "language" | "level", value: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    }))
  }

  const addLanguage = () => {
    const newLang = { id: Date.now().toString(), language: "", level: "" }
    setData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }))
  }

  const removeLanguage = (id: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }))
  }

  const handleProjectChange = (id: string, field: keyof Project, value: string | string[]) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }))
  }

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      imageUrl: "",
    }
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }))
  }

  const removeProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }))
  }

  const handleCertificationsChange = (certifications: string) => {
    setData((prev) => ({
      ...prev,
      certifications: certifications
        .split(",")
        .map((cert) => cert.trim())
        .filter((cert) => cert),
    }))
  }

  const handleInterestsChange = (interests: string) => {
    setData((prev) => ({
      ...prev,
      interests: interests
        .split(",")
        .map((interest) => interest.trim())
        .filter((interest) => interest),
    }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        console.log("Uploaded image data URL:", result.substring(0, 50) + "...") // Log first 50 chars
        handlePersonalInfoChange("profilePhoto", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProjectImageUpload = (projectId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handleProjectChange(projectId, "imageUrl", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleQrCodeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handlePersonalInfoChange("qrCodeImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveVersion = (name: string) => {
    setSavedVersions((prev) => ({
      ...prev,
      [name]: { ...data },
    }))
  }

  const loadVersion = (name: string) => {
    if (savedVersions[name]) {
      setData(savedVersions[name])
    }
  }

  const downloadPDF = () => {
    // Add a temporary class to the body for print styles if dark mode is active
    if (isDarkMode && selectedTemplate !== "corporate") {
      document.body.classList.add("dark-mode-print")
    }
    window.print()
    // Remove the temporary class after printing
    if (isDarkMode && selectedTemplate !== "corporate") {
      document.body.classList.remove("dark-mode-print")
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generador de Currículums Profesionales</h1>
        <p className="text-gray-600">Crea currículums optimizados para diferentes tipos de empresas y sistemas ATS</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Editar Información
          </TabsTrigger>
          <TabsTrigger value="template" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Elegir Formato
          </TabsTrigger>
          <TabsTrigger value="optimize" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Optimizar ATS
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Vista Previa
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Edición */}
        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Foto de Perfil */}
                <div>
                  <Label>Foto de Perfil</Label>
                  <div className="flex items-center gap-4 mt-2">
                    {data.personalInfo.profilePhoto ? (
                      <img
                        src={data.personalInfo.profilePhoto || "/placeholder.svg"}
                        alt="Profile"
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Subir Foto
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                  <Input
                    id="profilePhotoUrl"
                    type="text"
                    placeholder="O pega una URL de imagen aquí"
                    value={data.personalInfo.profilePhoto}
                    onChange={(e) => handlePersonalInfoChange("profilePhoto", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={data.personalInfo.name}
                      onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Título Profesional</Label>
                    <Input
                      id="title"
                      value={data.personalInfo.title}
                      onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={data.personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={data.personalInfo.location}
                      onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={data.personalInfo.linkedin}
                      onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Website Personal</Label>
                  <Input
                    id="website"
                    value={data.personalInfo.website}
                    onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                    placeholder="https://www.tu-web-personal.com"
                  />
                </div>

                {/* Portfolio/QR Section Editable Fields */}
                <div>
                  <Label htmlFor="portfolioTitle">Título del Portfolio</Label>
                  <Input
                    id="portfolioTitle"
                    value={data.personalInfo.portfolioTitle}
                    onChange={(e) => handlePersonalInfoChange("portfolioTitle", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="portfolioDescription">Descripción del Portfolio</Label>
                  <Input
                    id="portfolioDescription"
                    value={data.personalInfo.portfolioDescription}
                    onChange={(e) => handlePersonalInfoChange("portfolioDescription", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="portfolioWebsite">URL del Portfolio</Label>
                  <Input
                    id="portfolioWebsite"
                    value={data.personalInfo.portfolioWebsite}
                    onChange={(e) => handlePersonalInfoChange("portfolioWebsite", e.target.value)}
                  />
                </div>
                {/* QR Code Image Input */}
                <div>
                  <Label>Imagen de Código QR</Label>
                  <div className="flex items-center gap-4 mt-2">
                    {data.personalInfo.qrCodeImage ? (
                      <img
                        src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
                        alt="QR Code"
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => qrCodeInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Subir QR
                    </Button>
                    <input
                      ref={qrCodeInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleQrCodeUpload}
                      className="hidden"
                    />
                  </div>
                  <Input
                    id="qrCodeImageUrl"
                    type="text"
                    placeholder="O pega una URL de imagen QR aquí"
                    value={data.personalInfo.qrCodeImage || ""}
                    onChange={(e) => handlePersonalInfoChange("qrCodeImage", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Resumen Profesional */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={data.summary}
                  onChange={(e) => setData((prev) => ({ ...prev, summary: e.target.value }))}
                  rows={8}
                  placeholder="Describe tu experiencia, habilidades clave y objetivos profesionales..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tip: Incluye palabras clave relevantes para el puesto que buscas
                </p>
              </CardContent>
            </Card>

            {/* Experiencia Laboral */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Experiencia Laboral
                  <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Agregar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={exp.id} className="border p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Experiencia {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Puesto</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Empresa</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Período</Label>
                      <Input
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(exp.id, "period", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Logros y Responsabilidades (uno por línea)</Label>
                      <Textarea
                        value={exp.achievements.join("\n")}
                        onChange={(e) => handleExperienceChange(exp.id, "achievements", e.target.value.split("\n"))}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Palabras Clave (separadas por comas)</Label>
                      <Input
                        value={exp.keywords.join(", ")}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "keywords",
                            e.target.value.split(",").map((k) => k.trim()),
                          )
                        }
                        placeholder="Python, Análisis, Gestión, etc."
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Educación */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Educación
                  <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Agregar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={edu.id} className="border p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Educación {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Institución</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Período</Label>
                      <Input
                        value={edu.period}
                        onChange={(e) => handleEducationChange(edu.id, "period", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Detalles</Label>
                      <Input
                        value={edu.details}
                        onChange={(e) => handleEducationChange(edu.id, "details", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Habilidades */}
            <Card>
              <CardHeader>
                <CardTitle>Habilidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Habilidades Técnicas (separadas por comas)</Label>
                  <Textarea
                    value={data.technicalSkills.join(", ")}
                    onChange={(e) => handleSkillChange("technicalSkills", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Habilidades Interpersonales (separadas por comas)</Label>
                  <Textarea
                    value={data.softSkills.join(", ")}
                    onChange={(e) => handleSkillChange("softSkills", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Idiomas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Idiomas
                  <Button onClick={addLanguage} size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Agregar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.languages.map((lang, index) => (
                  <div key={lang.id} className="border p-4 rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Idioma {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeLanguage(lang.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Idioma</Label>
                      <Input
                        value={lang.language}
                        onChange={(e) => handleLanguageChange(lang.id, "language", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Nivel</Label>
                      <Input
                        value={lang.level}
                        onChange={(e) => handleLanguageChange(lang.id, "level", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Proyectos */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Proyectos
                  <Button onClick={addProject} size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Agregar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.projects.map((proj, index) => (
                  <div key={proj.id} className="border p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Proyecto {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeProject(proj.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Nombre del Proyecto</Label>
                      <Input value={proj.name} onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)} />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Textarea
                        value={proj.description}
                        onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Tecnologías (separadas por comas)</Label>
                      <Input
                        value={proj.technologies.join(", ")}
                        onChange={(e) =>
                          handleProjectChange(
                            proj.id,
                            "technologies",
                            e.target.value.split(",").map((t) => t.trim()),
                          )
                        }
                        placeholder="React, Node.js, MongoDB, etc."
                      />
                    </div>
                    <div>
                      <Label>Enlace (opcional)</Label>
                      <Input
                        value={proj.link || ""}
                        onChange={(e) => handleProjectChange(proj.id, "link", e.target.value)}
                        placeholder="github.com/tu-proyecto"
                      />
                    </div>
                    <div>
                      <Label>Imagen del Proyecto (URL o Subir)</Label>
                      <div className="flex items-center gap-4 mt-2">
                        {proj.imageUrl ? (
                          <img
                            src={proj.imageUrl || "/placeholder.svg"}
                            alt={`Imagen de ${proj.name}`}
                            className="w-16 h-16 rounded-lg object-cover border"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Upload className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById(`project-image-upload-${proj.id}`)?.click()}
                          className="flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Subir Imagen
                        </Button>
                        <input
                          id={`project-image-upload-${proj.id}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProjectImageUpload(proj.id, e)}
                          className="hidden"
                        />
                      </div>
                      <Input
                        type="text"
                        placeholder="O pega una URL de imagen aquí"
                        value={proj.imageUrl || ""}
                        onChange={(e) => handleProjectChange(proj.id, "imageUrl", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certificaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Certificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={data.certifications.join(", ")}
                  onChange={(e) => handleCertificationsChange(e.target.value)}
                  rows={3}
                  placeholder="Certificación en Power BI, Curso de Python Avanzado..."
                />
                <p className="text-sm text-gray-500 mt-1">Separa cada certificación con una coma.</p>
              </CardContent>
            </Card>

            {/* Intereses */}
            <Card>
              <CardHeader>
                <CardTitle>Intereses</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={data.interests.join(", ")}
                  onChange={(e) => handleInterestsChange(e.target.value)}
                  rows={3}
                  placeholder="Gastronomía Creativa, Desarrollo Web, Tecnología..."
                />
                <p className="text-sm text-gray-500 mt-1">Separa cada interés con una coma.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pestaña de Selección de Formato */}
        <TabsContent value="template" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Elige el Formato de tu Currículum</h2>
            <p className="text-gray-600 mb-6">
              Cada formato está optimizado para diferentes tipos de empresas y procesos de selección
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(templateTypes).map(([key, template]) => {
              const IconComponent = template.icon
              return (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate === key ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedTemplate(key)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                      {template.name}
                    </CardTitle>
                    <p className="text-gray-600">{template.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Características:</h4>
                      <ul className="space-y-1">
                        {template.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Personalización de Diseño (para todos menos el corporativo) */}
          {selectedTemplate !== "corporate" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Personalización de Diseño
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Tema de Color de Acento</Label>
                  <div className="grid grid-cols-5 gap-4 mt-3">
                    {Object.entries(colorThemes).map(([key, theme]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedTheme(key)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          selectedTheme === key ? "border-gray-900 ring-2 ring-gray-300" : "border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-full h-8 rounded-t`}
                          style={{
                            backgroundColor: theme.previewPrimary,
                          }}
                        ></div>
                        <div
                          className={`w-full h-2 rounded-b`}
                          style={{
                            backgroundColor: theme.previewSecondary,
                          }}
                        ></div>
                        <span className="text-sm capitalize mt-2 block">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="customBackgroundColor" className="text-base font-medium">
                    Color de Fondo (RGB/Hex)
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="customBackgroundColor"
                      type="text"
                      placeholder="Ej: rgb(240, 240, 240) o #F0F0F0"
                      value={customBackgroundColor}
                      onChange={(e) => setCustomBackgroundColor(e.target.value)}
                    />
                    <div
                      className="w-8 h-8 rounded-md border"
                      style={{ backgroundColor: customBackgroundColor || "transparent" }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Introduce un color RGB (ej. `rgb(240, 240, 240)`) o un código hexadecimal (ej. `#F0F0F0`).
                  </p>
                </div>

                <div>
                  <Label className="text-base font-medium">Color de Letra Principal</Label>
                  <div className="flex gap-4 mt-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="textColorBlack"
                        name="textColor"
                        value="black"
                        checked={customTextColor === "black"}
                        onChange={(e) => setCustomTextColor(e.target.value)}
                        className="rounded"
                      />
                      <Label htmlFor="textColorBlack">Negro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="textColorWhite"
                        name="textColor"
                        value="white"
                        checked={customTextColor === "white"}
                        onChange={(e) => setCustomTextColor(e.target.value)}
                        className="rounded"
                      />
                      <Label htmlFor="textColorWhite">Blanco</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="customTagPrimaryColor" className="text-base font-medium">
                    Color de Tags (Habilidades Técnicas)
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="customTagPrimaryColor"
                      type="text"
                      placeholder="Ej: rgb(255, 100, 0) o #FF6400"
                      value={customTagPrimaryColor}
                      onChange={(e) => setCustomTagPrimaryColor(e.target.value)}
                    />
                    <div
                      className="w-8 h-8 rounded-md border"
                      style={{ backgroundColor: customTagPrimaryColor || "transparent" }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Color de fondo para los tags de habilidades técnicas.</p>
                </div>
                <div>
                  <Label htmlFor="customTagSecondaryColor" className="text-base font-medium">
                    Color de Tags (Habilidades Interpersonales/Intereses)
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="customTagSecondaryColor"
                      type="text"
                      placeholder="Ej: rgb(0, 150, 50) o #009632"
                      value={customTagSecondaryColor}
                      onChange={(e) => setCustomTagSecondaryColor(e.target.value)}
                    />
                    <div
                      className="w-8 h-8 rounded-md border"
                      style={{ backgroundColor: customTagSecondaryColor || "transparent" }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Color de fondo para los tags de habilidades interpersonales e intereses.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="darkMode"
                    checked={isDarkMode}
                    onChange={(e) => setIsDarkMode(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="darkMode">Modo Oscuro (afecta acentos y elementos secundarios)</Label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Versiones Guardadas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                Versiones Guardadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center mb-4">
                <Input
                  placeholder="Nombre de la versión (ej: Frontend Developer, Marketing Manager)"
                  id="versionName"
                />
                <Button
                  onClick={() => {
                    const input = document.getElementById("versionName") as HTMLInputElement
                    if (input.value) {
                      saveVersion(input.value)
                      input.value = ""
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Guardar
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.keys(savedVersions).map((name) => (
                  <Badge
                    key={name}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => loadVersion(name)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    {name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Optimización ATS */}
        <TabsContent value="optimize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Optimización para Sistemas ATS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Palabras Clave Principales (separadas por comas)</Label>
                <Textarea
                  value={data.keywords.join(", ")}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      keywords: e.target.value.split(",").map((k) => k.trim()),
                    }))
                  }
                  placeholder="Python, React, Gestión de proyectos, Análisis de datos..."
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Incluye palabras clave específicas del puesto al que aplicas
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Consejos para ATS:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Usa palabras clave exactas de la descripción del trabajo</li>
                  <li>• Evita gráficos complejos y tablas</li>
                  <li>• Usa formatos de fecha estándar</li>
                  <li>• Incluye tanto la versión completa como las siglas (ej: "Inteligencia Artificial (IA)")</li>
                  <li>• Guarda en formato PDF para mantener el formato</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Análisis de Palabras Clave Actuales:</h4>
                <div className="flex flex-wrap gap-2">
                  {data.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vista Previa */}
        <TabsContent value="preview" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Vista Previa - {templateTypes[selectedTemplate as keyof typeof templateTypes].name}
              </h2>
              <p className="text-gray-600">
                Formato optimizado para{" "}
                {templateTypes[selectedTemplate as keyof typeof templateTypes].description.toLowerCase()}
              </p>
            </div>
            <Button onClick={downloadPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Descargar PDF
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
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
