"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Edit,
  Palette,
  Upload,
  FileText,
  Briefcase,
  Target,
  Share2,
  Eraser,
  PlusCircle,
  MinusCircle,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

interface CurriculumEditorProps {
  data: CurriculumData
  onDataChange: (data: CurriculumData) => void
  selectedTemplate: string
  onTemplateChange: (template: string) => void
  selectedTheme: string
  onThemeChange: (theme: string) => void
  isDarkMode: boolean
  onToggleDarkMode: (isDarkMode: boolean) => void
  customBackgroundColor: string
  onCustomBackgroundColorChange: (color: string) => void
  customTextColor: string
  onCustomTextColorChange: (color: string) => void
  customTagPrimaryColor: string
  onCustomTagPrimaryColorChange: (color: string) => void
  customTagSecondaryColor: string
  onCustomTagSecondaryColorChange: (color: string) => void
  profilePhotoBackgroundColor?: string
  onProfilePhotoBackgroundColorChange: (color: string) => void
  initialData: CurriculumData // For reset functionality
}

export function CurriculumEditor({
  data,
  onDataChange,
  selectedTemplate,
  onTemplateChange,
  selectedTheme,
  onThemeChange,
  isDarkMode,
  onToggleDarkMode,
  customBackgroundColor,
  onCustomBackgroundColorChange,
  customTextColor,
  onCustomTextColorChange,
  customTagPrimaryColor,
  onCustomTagPrimaryColorChange,
  customTagSecondaryColor,
  onCustomTagSecondaryColorChange,
  profilePhotoBackgroundColor,
  onProfilePhotoBackgroundColorChange,
  initialData,
}: CurriculumEditorProps) {
  const [activeTab, setActiveTab] = useState("edit")
  const [activeSection, setActiveSection] = useState<string | null>("personalInfo")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const qrCodeInputRef = useRef<HTMLInputElement>(null)
  const projectImageInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    })
  }

  const handleSummaryChange = (value: string) => {
    onDataChange({ ...data, summary: value })
  }

  const handleExperienceChange = (id: string, field: keyof Experience, value: string | string[]) => {
    onDataChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const addExperience = () => {
    onDataChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          position: "",
          company: "",
          period: "",
          achievements: [""],
          keywords: [""],
        },
      ],
    })
  }

  const removeExperience = (id: string) => {
    onDataChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    })
  }

  const handleAchievementChange = (expId: string, index: number, value: string) => {
    onDataChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              achievements: exp.achievements.map((ach, i) => (i === index ? value : ach)),
            }
          : exp,
      ),
    })
  }

  const addAchievement = (expId: string) => {
    onDataChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId ? { ...exp, achievements: [...exp.achievements, ""] } : exp,
      ),
    })
  }

  const removeAchievement = (expId: string, index: number) => {
    onDataChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              achievements: exp.achievements.filter((_, i) => i !== index),
            }
          : exp,
      ),
    })
  }

  const handleExperienceKeywordChange = (expId: string, index: number, value: string) => {
    onDataChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              keywords: exp.keywords.map((kw, i) => (i === index ? value : kw)),
            }
          : exp,
      ),
    })
  }

  const addExperienceKeyword = (expId: string) => {
    onDataChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === expId ? { ...exp, keywords: [...exp.keywords, ""] } : exp)),
    })
  }

  const removeExperienceKeyword = (expId: string, index: number) => {
    onDataChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              keywords: exp.keywords.filter((_, i) => i !== index),
            }
          : exp,
      ),
    })
  }

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    onDataChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const addEducation = () => {
    onDataChange({
      ...data,
      education: [
        ...data.education,
        { id: Date.now().toString(), degree: "", institution: "", period: "", details: "" },
      ],
    })
  }

  const removeEducation = (id: string) => {
    onDataChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    })
  }

  const handleSkillChange = (type: "technical" | "soft", index: number, value: string) => {
    if (type === "technical") {
      onDataChange({
        ...data,
        technicalSkills: data.technicalSkills.map((skill, i) => (i === index ? value : skill)),
      })
    } else {
      onDataChange({
        ...data,
        softSkills: data.softSkills.map((skill, i) => (i === index ? value : skill)),
      })
    }
  }

  const addSkill = (type: "technical" | "soft") => {
    if (type === "technical") {
      onDataChange({ ...data, technicalSkills: [...data.technicalSkills, ""] })
    } else {
      onDataChange({ ...data, softSkills: [...data.softSkills, ""] })
    }
  }

  const removeSkill = (type: "technical" | "soft", index: number) => {
    if (type === "technical") {
      onDataChange({
        ...data,
        technicalSkills: data.technicalSkills.filter((_, i) => i !== index),
      })
    } else {
      onDataChange({
        ...data,
        softSkills: data.softSkills.filter((_, i) => i !== index),
      })
    }
  }

  const handleLanguageChange = (id: string, field: "language" | "level", value: string) => {
    onDataChange({
      ...data,
      languages: data.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    })
  }

  const addLanguage = () => {
    onDataChange({
      ...data,
      languages: [...data.languages, { id: Date.now().toString(), language: "", level: "" }],
    })
  }

  const removeLanguage = (id: string) => {
    onDataChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    })
  }

  const handleProjectChange = (id: string, field: keyof Project, value: string | string[]) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const addProject = () => {
    onDataChange({
      ...data,
      projects: [
        ...data.projects,
        { id: Date.now().toString(), name: "", description: "", technologies: [""], imageUrls: [] }, // Initialize imageUrls as empty array
      ],
    })
  }

  const removeProject = (id: string) => {
    onDataChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    })
  }

  const handleProjectTechnologyChange = (projId: string, index: number, value: string) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === projId
          ? {
              ...proj,
              technologies: proj.technologies.map((tech, i) => (i === index ? value : tech)),
            }
          : proj,
      ),
    })
  }

  const addProjectTechnology = (projId: string) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === projId ? { ...proj, technologies: [...proj.technologies, ""] } : proj,
      ),
    })
  }

  const removeProjectTechnology = (projId: string, index: number) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === projId
          ? {
              ...proj,
              technologies: proj.technologies.filter((_, i) => i !== index),
            }
          : proj,
      ),
    })
  }

  const handleProjectImageUpload = (projId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onDataChange((prev) => ({
          ...prev,
          projects: prev.projects.map((proj) =>
            proj.id === projId ? { ...proj, imageUrls: [...(proj.imageUrls || []), result] } : proj,
          ),
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeProjectImageFromData = (projId: string, imageUrlToRemove: string) => {
    onDataChange((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === projId
          ? { ...proj, imageUrls: (proj.imageUrls || []).filter((url) => url !== imageUrlToRemove) }
          : proj,
      ),
    }))
  }

  const handleCertificationChange = (index: number, value: string) => {
    onDataChange({
      ...data,
      certifications: data.certifications.map((cert, i) => (i === index ? value : cert)),
    })
  }

  const addCertification = () => {
    onDataChange({ ...data, certifications: [...data.certifications, ""] })
  }

  const removeCertification = (index: number) => {
    onDataChange({
      ...data,
      certifications: data.certifications.filter((_, i) => i !== index),
    })
  }

  const handleInterestChange = (index: number, value: string) => {
    onDataChange({
      ...data,
      interests: data.interests.map((interest, i) => (i === index ? value : interest)),
    })
  }

  const addInterest = () => {
    onDataChange({ ...data, interests: [...data.interests, ""] })
  }

  const removeInterest = (index: number) => {
    onDataChange({
      ...data,
      interests: data.interests.filter((_, i) => i !== index),
    })
  }

  const handleKeywordChange = (index: number, value: string) => {
    onDataChange({
      ...data,
      keywords: data.keywords.map((keyword, i) => (i === index ? value : keyword)),
    })
  }

  const addKeyword = () => {
    onDataChange({ ...data, keywords: [...data.keywords, ""] })
  }

  const removeKeyword = (index: number) => {
    onDataChange({
      ...data,
      keywords: data.keywords.filter((_, i) => i !== index),
    })
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handlePersonalInfoChange("profilePhoto", result)
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

  const clearAllData = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres borrar toda la información del currículum? Esta acción no se puede deshacer.",
      )
    ) {
      onDataChange(initialData) // Use the initialData prop for reset
      onCustomBackgroundColorChange("")
      onCustomTextColorChange("black")
      onCustomTagPrimaryColorChange("")
      onCustomTagSecondaryColorChange("")
      onProfilePhotoBackgroundColorChange("") // Reset profile photo background color
      onThemeChange("orange")
      onToggleDarkMode(true)
    }
  }

  // Scroll to active section in accordion
  useEffect(() => {
    if (activeSection) {
      const element = document.getElementById(activeSection)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [activeSection])

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="edit" className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Editar Información
        </TabsTrigger>
        <TabsTrigger value="design" className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Editar Diseño
        </TabsTrigger>
        <TabsTrigger value="optimize" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Optimizar CV
        </TabsTrigger>
      </TabsList>

      {/* Pestaña de Edición de Información */}
      <TabsContent value="edit" className="space-y-6">
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Información Personal
                <Button onClick={clearAllData} variant="destructive" size="sm" className="flex items-center gap-2">
                  <Eraser className="w-4 h-4" />
                  Borrar Todo
                </Button>
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
              {/* Profile Photo Background Color */}
              <div>
                <Label htmlFor="profilePhotoBackgroundColor" className="text-base font-medium">
                  Color de Fondo de Foto de Perfil
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="profilePhotoBackgroundColor"
                    type="color"
                    placeholder="Ej: #C8C8C8"
                    value={profilePhotoBackgroundColor || "#ffffff"}
                    onChange={(e) => onProfilePhotoBackgroundColorChange(e.target.value)}
                  />
                  <div
                    className="w-8 h-8 rounded-md border"
                    style={{ backgroundColor: profilePhotoBackgroundColor || "transparent" }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Color de fondo para la tarjeta de la foto de perfil.</p>
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

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={activeSection || ""}
            onValueChange={setActiveSection}
          >
            <AccordionItem value="summary" id="summary">
              <AccordionTrigger>Resumen Profesional</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 p-4">
                  <Label htmlFor="summary">Resumen</Label>
                  <Textarea id="summary" value={data.summary} onChange={(e) => handleSummaryChange(e.target.value)} />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience" id="experience">
              <AccordionTrigger>Experiencia Laboral</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 p-4">
                  {data.experience.map((exp) => (
                    <Card key={exp.id} className="p-4">
                      <div className="flex justify-end">
                        <Button variant="destructive" size="sm" onClick={() => removeExperience(exp.id)}>
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <Label htmlFor={`position-${exp.id}`}>Puesto</Label>
                      <Input
                        id={`position-${exp.id}`}
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                      />
                      <Label htmlFor={`company-${exp.id}`}>Empresa</Label>
                      <Input
                        id={`company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                      />
                      <Label htmlFor={`period-${exp.id}`}>Período</Label>
                      <Input
                        id={`period-${exp.id}`}
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(exp.id, "period", e.target.value)}
                      />
                      <Label>Logros</Label>
                      {exp.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Textarea
                            value={achievement}
                            onChange={(e) => handleAchievementChange(exp.id, index, e.target.value)}
                          />
                          <Button variant="outline" size="sm" onClick={() => removeAchievement(exp.id, index)}>
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => addAchievement(exp.id)}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Añadir Logro
                      </Button>
                      <Label>Palabras Clave</Label>
                      {exp.keywords.map((keyword, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={keyword}
                            onChange={(e) => handleExperienceKeywordChange(exp.id, index, e.target.value)}
                          />
                          <Button variant="outline" size="sm" onClick={() => removeExperienceKeyword(exp.id, index)}>
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => addExperienceKeyword(exp.id)}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Añadir Palabra Clave
                      </Button>
                    </Card>
                  ))}
                  <Button onClick={addExperience}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Añadir Experiencia
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education" id="education">
              <AccordionTrigger>Educación</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 p-4">
                  {data.education.map((edu) => (
                    <Card key={edu.id} className="p-4">
                      <div className="flex justify-end">
                        <Button variant="destructive" size="sm" onClick={() => removeEducation(edu.id)}>
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <Label htmlFor={`degree-${edu.id}`}>Título</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                      />
                      <Label htmlFor={`institution-${edu.id}`}>Institución</Label>
                      <Input
                        id={`institution-${edu.id}`}
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                      />
                      <Label htmlFor={`period-edu-${edu.id}`}>Período</Label>
                      <Input
                        id={`period-edu-${edu.id}`}
                        value={edu.period}
                        onChange={(e) => handleEducationChange(edu.id, "period", e.target.value)}
                      />
                      <Label htmlFor={`details-${edu.id}`}>Detalles</Label>
                      <Textarea
                        id={`details-${edu.id}`}
                        value={edu.details}
                        onChange={(e) => handleEducationChange(edu.id, "details", e.target.value)}
                      />
                      <Label htmlFor={`gpa-${edu.id}`}>GPA (Opcional)</Label>
                      <Input
                        id={`gpa-${edu.id}`}
                        value={edu.gpa || ""}
                        onChange={(e) => handleEducationChange(edu.id, "gpa", e.target.value)}
                      />
                    </Card>
                  ))}
                  <Button onClick={addEducation}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Añadir Educación
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skills" id="skills">
              <AccordionTrigger>Habilidades</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 p-4">
                  <Card className="p-4">
                    <CardTitle className="mb-4">Habilidades Técnicas</CardTitle>
                    {data.technicalSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input value={skill} onChange={(e) => handleSkillChange("technical", index, e.target.value)} />
                        <Button variant="outline" size="sm" onClick={() => removeSkill("technical", index)}>
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addSkill("technical")}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Añadir Habilidad Técnica
                    </Button>
                  </Card>
                  <Card className="p-4">
                    <CardTitle className="mb-4">Habilidades Interpersonales</CardTitle>
                    {data.softSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input value={skill} onChange={(e) => handleSkillChange("soft", index, e.target.value)} />
                        <Button variant="outline" size="sm" onClick={() => removeSkill("soft", index)}>
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addSkill("soft")}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Añadir Habilidad Interpersonal
                    </Button>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="languages" id="languages">
              <AccordionTrigger>Idiomas</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 p-4">
                  {data.languages.map((lang) => (
                    <Card key={lang.id} className="p-4">
                      <div className="flex justify-end">
                        <Button variant="destructive" size="sm" onClick={() => removeLanguage(lang.id)}>
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <Label htmlFor={`language-${lang.id}`}>Idioma</Label>
                      <Input
                        id={`language-${lang.id}`}
                        value={lang.language}
                        onChange={(e) => handleLanguageChange(lang.id, "language", e.target.value)}
                      />
                      <Label htmlFor={`level-${lang.id}`}>Nivel</Label>
                      <Input
                        id={`level-${lang.id}`}
                        value={lang.level}
                        onChange={(e) => handleLanguageChange(lang.id, "level", e.target.value)}
                      />
                    </Card>
                  ))}
                  <Button onClick={addLanguage}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Añadir Idioma
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projects" id="projects">
              <AccordionTrigger>Proyectos Destacados</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 p-4">
                  {data.projects.map((proj) => (
                    <Card key={proj.id} className="p-4">
                      <div className="flex justify-end">
                        <Button variant="destructive" size="sm" onClick={() => removeProject(proj.id)}>
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <Label htmlFor={`project-name-${proj.id}`}>Nombre del Proyecto</Label>
                      <Input
                        id={`project-name-${proj.id}`}
                        value={proj.name}
                        onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)}
                      />
                      <Label htmlFor={`project-description-${proj.id}`}>Descripción</Label>
                      <Textarea
                        id={`project-description-${proj.id}`}
                        value={proj.description}
                        onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
                      />
                      <Label htmlFor={`project-link-${proj.id}`}>Enlace (Opcional)</Label>
                      <Input
                        id={`project-link-${proj.id}`}
                        value={proj.link || ""}
                        onChange={(e) => handleProjectChange(proj.id, "link", e.target.value)}
                      />
                      <Label>Tecnologías</Label>
                      {proj.technologies.map((tech, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={tech}
                            onChange={(e) => handleProjectTechnologyChange(proj.id, index, e.target.value)}
                          />
                          <Button variant="outline" size="sm" onClick={() => removeProjectTechnology(proj.id, index)}>
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => addProjectTechnology(proj.id)}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Añadir Tecnología
                      </Button>
                      <Label>Imágenes del Proyecto</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(proj.imageUrls || []).map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`Project image ${index}`}
                              className="w-24 h-24 object-cover rounded-md border"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-0 right-0 -mt-2 -mr-2 rounded-full h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeProjectImageFromData(proj.id, url)}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div
                          className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                          onClick={() => projectImageInputRefs.current[proj.id]?.click()}
                        >
                          <PlusCircle className="h-6 w-6 text-gray-400" />
                          <input
                            ref={(el) => (projectImageInputRefs.current[proj.id] = el)}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleProjectImageUpload(proj.id, e)}
                            className="hidden"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Adjunta imágenes para tu proyecto. Se mostrará la primera imagen.
                      </p>
                    </Card>
                  ))}
                  <Button onClick={addProject}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Añadir Proyecto
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="certifications" id="certifications">
              <AccordionTrigger>Certificaciones</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 p-4">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={cert} onChange={(e) => handleCertificationChange(index, e.target.value)} />
                      <Button variant="outline" size="sm" onClick={() => removeCertification(index)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addCertification}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Añadir Certificación
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="interests" id="interests">
              <AccordionTrigger>Intereses</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 p-4">
                  {data.interests.map((interest, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={interest} onChange={(e) => handleInterestChange(index, e.target.value)} />
                      <Button variant="outline" size="sm" onClick={() => removeInterest(index)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addInterest}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Añadir Interés
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="keywords" id="keywords">
              <AccordionTrigger>Palabras Clave (Generales)</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 p-4">
                  {data.keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={keyword} onChange={(e) => handleKeywordChange(index, e.target.value)} />
                      <Button variant="outline" size="sm" onClick={() => removeKeyword(index)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addKeyword}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Añadir Palabra Clave
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </TabsContent>

      {/* Pestaña de Edición de Diseño */}
      <TabsContent value="design" className="space-y-6">
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
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
                  onClick={() => onTemplateChange(key)}
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
            <Card className="mt-6">
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
                        onClick={() => onThemeChange(key)}
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
                      type="color"
                      placeholder="Ej: rgb(240, 240, 240) o #F0F0F0"
                      value={customBackgroundColor || "#ffffff"}
                      onChange={(e) => onCustomBackgroundColorChange(e.target.value)}
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
                        onChange={(e) => onCustomTextColorChange(e.target.value)}
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
                        onChange={(e) => onCustomTextColorChange(e.target.value)}
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
                      type="color"
                      placeholder="Ej: rgb(255, 100, 0) o #FF6400"
                      value={customTagPrimaryColor || "#ffffff"}
                      onChange={(e) => onCustomTagPrimaryColorChange(e.target.value)}
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
                      type="color"
                      placeholder="Ej: rgb(0, 150, 50) o #009632"
                      value={customTagSecondaryColor || "#ffffff"}
                      onChange={(e) => onCustomTagSecondaryColorChange(e.target.value)}
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
                    onChange={(e) => onToggleDarkMode(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="darkMode">Modo Oscuro (afecta acentos y elementos secundarios)</Label>
                </div>
              </CardContent>
            </Card>
          )}
        </ScrollArea>
      </TabsContent>

      {/* Pestaña de Optimización ATS */}
      <TabsContent value="optimize" className="space-y-6">
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
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
                    onDataChange((prev) => ({
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
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}
