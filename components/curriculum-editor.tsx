"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Download, Edit, Eye, Palette } from "lucide-react"
import CurriculumPreview from "./curriculum-preview"

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
}

interface Experience {
  position: string
  company: string
  period: string
  achievements: string[]
}

interface Education {
  degree: string
  institution: string
  period: string
  details: string
}

interface CurriculumData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education
  technicalSkills: string[]
  culinarySkills: string[]
  languages: { language: string; level: string }[]
  interests: string[]
  dishNames: string[]
}

const initialData: CurriculumData = {
  personalInfo: {
    name: "Martín Moore",
    title: "Cocinero Profesional & Analista de Procesos",
    email: "martin.alejandro.moore@gmail.com",
    phone: "+34 607 156 015",
    location: "Barcelona, España",
    website: "LinkedIn · GitHub",
  },
  summary:
    "Apasionado de la cocina con experiencia práctica en cocina de bar y organización de eventos gastronómicos para grupos grandes. Profesional administrativo con sólida trayectoria en gestión de procesos, automatización y capacitación de equipos. Busco integrar mi creatividad culinaria con mis habilidades analíticas y de gestión para aportar valor en entornos dinámicos.",
  experience: [
    {
      position: "Analista de Procesos y Formador",
      company: "Conexión Salud",
      period: "Septiembre 2021 – Marzo 2025",
      achievements: [
        "Gestión administrativa y atención a afiliados, optimizando procesos mediante automatización con Python y Power BI",
        "Lideré proyectos clave de digitalización como desarrollo de chatbot y creación de dashboards en tiempo real",
        "Capacité equipos comerciales y otros departamentos, impulsando el uso de nuevas herramientas",
      ],
    },
    {
      position: "Cocinero y Organizador de Eventos Gastronómicos",
      company: "Freelance y Bar Runa Avellaneda",
      period: "Junio 2021 – Sept 2021 (Bar) / Desde entonces (Eventos)",
      achievements: [
        "Preparación y servicio de platos con atención a calidad y tiempos",
        "Diseño y ejecución de menús personalizados para eventos privados, cocinando para grupos de hasta 31 personas",
        "Gestión integral de logística y coordinación gastronómica",
      ],
    },
  ],
  education: {
    degree: "Diploma de Educación Secundaria",
    institution: "Instituto French — Buenos Aires, Argentina",
    period: "2012 - 2018",
    details: "Especialización en Economía",
  },
  technicalSkills: ["Python", "Power BI", "Excel Avanzado", "Chatbots", "Automatización", "Análisis de Datos"],
  culinarySkills: ["Cocina Profesional", "Planificación de Menús", "Eventos Gastronómicos", "Gestión de Logística"],
  languages: [
    { language: "Español", level: "Nativo" },
    { language: "Inglés", level: "Conversacional" },
  ],
  interests: [
    "Gastronomía Creativa",
    "Desarrollo Web",
    "Proyectos Culinarios",
    "Tecnología",
    "Automatización",
    "Innovación",
  ],
  dishNames: ["Pasta Trufa", "Tarta de Berries", "Pan de Masa Madre", "Ensalada Gourmet"],
}

const colorThemes = {
  teal: { primary: "teal", accent: "teal-500", bg: "teal-50" },
  orange: { primary: "orange", accent: "rgb(242,89,13)", bg: "orange-50" },
  blue: { primary: "blue", accent: "blue-500", bg: "blue-50" },
  green: { primary: "green", accent: "green-500", bg: "green-50" },
  purple: { primary: "purple", accent: "purple-500", bg: "purple-50" },
}

export default function CurriculumEditor() {
  const [data, setData] = useState<CurriculumData>(initialData)
  const [activeTab, setActiveTab] = useState("edit")
  const [selectedTheme, setSelectedTheme] = useState("teal")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | string[]) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    }))
  }

  const handleSkillChange = (type: "technicalSkills" | "culinarySkills", skills: string) => {
    setData((prev) => ({
      ...prev,
      [type]: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill),
    }))
  }

  const handleLanguageChange = (index: number, field: "language" | "level", value: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang, i) => (i === index ? { ...lang, [field]: value } : lang)),
    }))
  }

  const downloadPDF = () => {
    window.print()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de Currículum</h1>
        <p className="text-gray-600">Edita tu información y descarga tu currículum en PDF</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Editar
          </TabsTrigger>
          <TabsTrigger value="design" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Diseño
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Vista Previa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={data.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website/LinkedIn</Label>
                  <Input
                    id="website"
                    value={data.personalInfo.website}
                    onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
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
                  rows={6}
                  placeholder="Describe tu experiencia y objetivos profesionales..."
                />
              </CardContent>
            </Card>

            {/* Experiencia Laboral */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Experiencia Laboral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="border p-4 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Puesto</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Empresa</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Período</Label>
                      <Input
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(index, "period", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Logros (uno por línea)</Label>
                      <Textarea
                        value={exp.achievements.join("\n")}
                        onChange={(e) => handleExperienceChange(index, "achievements", e.target.value.split("\n"))}
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Educación */}
            <Card>
              <CardHeader>
                <CardTitle>Educación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <Input
                    value={data.education.degree}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        education: { ...prev.education, degree: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>Institución</Label>
                  <Input
                    value={data.education.institution}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        education: { ...prev.education, institution: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>Período</Label>
                  <Input
                    value={data.education.period}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        education: { ...prev.education, period: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>Detalles</Label>
                  <Input
                    value={data.education.details}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        education: { ...prev.education, details: e.target.value },
                      }))
                    }
                  />
                </div>
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
                  <Label>Habilidades Culinarias (separadas por comas)</Label>
                  <Textarea
                    value={data.culinarySkills.join(", ")}
                    onChange={(e) => handleSkillChange("culinarySkills", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalización de Diseño</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Tema de Color</Label>
                <div className="grid grid-cols-5 gap-4 mt-3">
                  {Object.entries(colorThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTheme(key)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTheme === key ? "border-gray-900 ring-2 ring-gray-300" : "border-gray-200"
                      }`}
                    >
                      <div className={`w-full h-8 rounded bg-${theme.primary}-500 mb-2`}></div>
                      <span className="text-sm capitalize">{key}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="darkMode">Modo Oscuro</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Vista Previa del Currículum</h2>
            <Button onClick={downloadPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <CurriculumPreview data={data} theme={selectedTheme} isDarkMode={isDarkMode} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
