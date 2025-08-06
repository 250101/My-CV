import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Heart, 
  Globe, 
  Award,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw
} from "lucide-react"
import { CurriculumData, SectionType } from "@/lib/types"

interface CurriculumEditorProps {
  data: CurriculumData
  onDataChange: (data: CurriculumData) => void
  selectedTemplate: string
  onTemplateChange: (template: string) => void
  selectedTheme: string
  onThemeChange: (theme: string) => void
  isDarkMode: boolean
  onToggleDarkMode: (darkMode: boolean) => void
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
  initialData: CurriculumData
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
  const [activeTab, setActiveTab] = useState("personal")
  const [editingExperience, setEditingExperience] = useState<string | null>(null)
  const [editingEducation, setEditingEducation] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<string | null>(null)

  const templates = [
    { id: "socialMedia", name: "Social Media", description: "Diseño moderno inspirado en redes sociales" },
    { id: "corporate", name: "Corporativo", description: "Estilo profesional y elegante" },
    { id: "creative", name: "Creativo", description: "Diseño innovador y llamativo" },
    { id: "minimal", name: "Minimalista", description: "Diseño limpio y simple" },
    { id: "ats", name: "ATS Optimizado", description: "Formato compatible con sistemas ATS" },
  ]

  const themes = [
    { id: "orange", name: "Naranja", color: "rgb(242,89,13)" },
    { id: "blue", name: "Azul", color: "#3B82F6" },
    { id: "green", name: "Verde", color: "#22C55E" },
    { id: "purple", name: "Púrpura", color: "#9333EA" },
    { id: "teal", name: "Teal", color: "#14B8A6" },
  ]

  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    })
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      position: "",
      company: "",
      period: "",
      achievements: [""],
      keywords: [""],
    }
    onDataChange({
      ...data,
      experience: [...data.experience, newExperience],
    })
    setEditingExperience(newExperience.id)
  }

  const updateExperience = (id: string, field: string, value: any) => {
    onDataChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    })
  }

  const removeExperience = (id: string) => {
    onDataChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      period: "",
      details: "",
      gpa: "",
    }
    onDataChange({
      ...data,
      education: [...data.education, newEducation],
    })
    setEditingEducation(newEducation.id)
  }

  const updateEducation = (id: string, field: string, value: string) => {
    onDataChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    })
  }

  const removeEducation = (id: string) => {
    onDataChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    })
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [""],
      link: "",
      imageUrls: [],
    }
    onDataChange({
      ...data,
      projects: [...data.projects, newProject],
    })
    setEditingProject(newProject.id)
  }

  const updateProject = (id: string, field: string, value: any) => {
    onDataChange({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    })
  }

  const removeProject = (id: string) => {
    onDataChange({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    })
  }

  const addArrayItem = (array: string[], setArray: (items: string[]) => void) => {
    setArray([...array, ""])
  }

  const updateArrayItem = (array: string[], index: number, value: string, setArray: (items: string[]) => void) => {
    const newArray = [...array]
    newArray[index] = value
    setArray(newArray)
  }

  const removeArrayItem = (array: string[], index: number, setArray: (items: string[]) => void) => {
    setArray(array.filter((_, i) => i !== index))
  }

  const resetData = () => {
    onDataChange(initialData)
  }

  return (
    <div className="space-y-6">
      {/* Header con botones de acción */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Editor de Currículum</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetData}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Resetear
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Tabs principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experiencia</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
        </TabsList>

        {/* Tab: Información Personal */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={data.personalInfo.name}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Título Profesional</Label>
                  <Input
                    id="title"
                    value={data.personalInfo.title}
                    onChange={(e) => updatePersonalInfo("title", e.target.value)}
                    placeholder="Ej: Desarrollador Full Stack"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    placeholder="+54 11 1234-5678"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                  placeholder="Ciudad, País"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="website">Sitio Web</Label>
                  <Input
                    id="website"
                    value={data.personalInfo.website}
                    onChange={(e) => updatePersonalInfo("website", e.target.value)}
                    placeholder="www.tusitio.com"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/tu-perfil"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={data.personalInfo.github}
                    onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    placeholder="github.com/tu-usuario"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="summary">Resumen Profesional</Label>
                <Textarea
                  id="summary"
                  value={data.summary}
                  onChange={(e) => onDataChange({ ...data, summary: e.target.value })}
                  placeholder="Describe tu experiencia profesional, objetivos y lo que te hace único..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Experiencia Laboral */}
        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experiencia Laboral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <Accordion key={exp.id} type="single" collapsible>
                    <AccordionItem value={exp.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">
                            {exp.position || "Nueva Experiencia"}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeExperience(exp.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Cargo</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              placeholder="Ej: Desarrollador Senior"
                            />
                          </div>
                          <div>
                            <Label>Empresa</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="Nombre de la empresa"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Período</Label>
                          <Input
                            value={exp.period}
                            onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                            placeholder="Ej: 2020 - Presente"
                          />
                        </div>
                        <div>
                          <Label>Logros y Responsabilidades</Label>
                          {exp.achievements.map((achievement, index) => (
                            <div key={index} className="flex gap-2 mt-2">
                              <Textarea
                                value={achievement}
                                onChange={(e) => {
                                  const newAchievements = [...exp.achievements]
                                  newAchievements[index] = e.target.value
                                  updateExperience(exp.id, "achievements", newAchievements)
                                }}
                                placeholder="Describe un logro o responsabilidad..."
                                rows={2}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newAchievements = exp.achievements.filter((_, i) => i !== index)
                                  updateExperience(exp.id, "achievements", newAchievements)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newAchievements = [...exp.achievements, ""]
                              updateExperience(exp.id, "achievements", newAchievements)
                            }}
                            className="mt-2"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Logro
                          </Button>
                        </div>
                        <div>
                          <Label>Palabras Clave</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {exp.keywords.map((keyword, index) => (
                              <Badge key={index} variant="secondary">
                                <Input
                                  value={keyword}
                                  onChange={(e) => {
                                    const newKeywords = [...exp.keywords]
                                    newKeywords[index] = e.target.value
                                    updateExperience(exp.id, "keywords", newKeywords)
                                  }}
                                  className="w-20 h-6 text-xs"
                                  placeholder="..."
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newKeywords = exp.keywords.filter((_, i) => i !== index)
                                    updateExperience(exp.id, "keywords", newKeywords)
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newKeywords = [...exp.keywords, ""]
                                updateExperience(exp.id, "keywords", newKeywords)
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
                <Button onClick={addExperience} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Experiencia
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Educación */}
        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Educación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <Accordion key={edu.id} type="single" collapsible>
                    <AccordionItem value={edu.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">
                            {edu.degree || "Nueva Educación"}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeEducation(edu.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Título</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              placeholder="Ej: Ingeniero en Sistemas"
                            />
                          </div>
                          <div>
                            <Label>Institución</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                              placeholder="Nombre de la universidad"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Período</Label>
                            <Input
                              value={edu.period}
                              onChange={(e) => updateEducation(edu.id, "period", e.target.value)}
                              placeholder="Ej: 2018 - 2022"
                            />
                          </div>
                          <div>
                            <Label>GPA</Label>
                            <Input
                              value={edu.gpa}
                              onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                              placeholder="Ej: 8.5/10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Detalles</Label>
                          <Textarea
                            value={edu.details}
                            onChange={(e) => updateEducation(edu.id, "details", e.target.value)}
                            placeholder="Información adicional sobre tu educación..."
                            rows={3}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
                <Button onClick={addEducation} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Educación
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Habilidades */}
        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Habilidades Técnicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Habilidades Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.technicalSkills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...data.technicalSkills]
                          newSkills[index] = e.target.value
                          onDataChange({ ...data, technicalSkills: newSkills })
                        }}
                        placeholder="Ej: React, Node.js"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newSkills = data.technicalSkills.filter((_, i) => i !== index)
                          onDataChange({ ...data, technicalSkills: newSkills })
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onDataChange({
                        ...data,
                        technicalSkills: [...data.technicalSkills, ""],
                      })
                    }}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Habilidad Técnica
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Habilidades Blandas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Habilidades Blandas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.softSkills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...data.softSkills]
                          newSkills[index] = e.target.value
                          onDataChange({ ...data, softSkills: newSkills })
                        }}
                        placeholder="Ej: Liderazgo, Comunicación"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newSkills = data.softSkills.filter((_, i) => i !== index)
                          onDataChange({ ...data, softSkills: newSkills })
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onDataChange({
                        ...data,
                        softSkills: [...data.softSkills, ""],
                      })
                    }}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Habilidad Blanda
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Idiomas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Idiomas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label>Idioma</Label>
                      <Input
                        value={lang.language}
                        onChange={(e) => {
                          const newLanguages = data.languages.map((l) =>
                            l.id === lang.id ? { ...l, language: e.target.value } : l
                          )
                          onDataChange({ ...data, languages: newLanguages })
                        }}
                        placeholder="Ej: Inglés"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Nivel</Label>
                      <Input
                        value={lang.level}
                        onChange={(e) => {
                          const newLanguages = data.languages.map((l) =>
                            l.id === lang.id ? { ...l, level: e.target.value } : l
                          )
                          onDataChange({ ...data, languages: newLanguages })
                        }}
                        placeholder="Ej: Avanzado"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newLanguages = data.languages.filter((l) => l.id !== lang.id)
                        onDataChange({ ...data, languages: newLanguages })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newLanguage = {
                      id: Date.now().toString(),
                      language: "",
                      level: "",
                    }
                    onDataChange({
                      ...data,
                      languages: [...data.languages, newLanguage],
                    })
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Idioma
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Certificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={cert}
                      onChange={(e) => {
                        const newCerts = [...data.certifications]
                        newCerts[index] = e.target.value
                        onDataChange({ ...data, certifications: newCerts })
                      }}
                      placeholder="Ej: AWS Certified Developer"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newCerts = data.certifications.filter((_, i) => i !== index)
                        onDataChange({ ...data, certifications: newCerts })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onDataChange({
                      ...data,
                      certifications: [...data.certifications, ""],
                    })
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Certificación
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Intereses */}
          <Card>
            <CardHeader>
              <CardTitle>Intereses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.interests.map((interest, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={interest}
                      onChange={(e) => {
                        const newInterests = [...data.interests]
                        newInterests[index] = e.target.value
                        onDataChange({ ...data, interests: newInterests })
                      }}
                      placeholder="Ej: Desarrollo Web, Música"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newInterests = data.interests.filter((_, i) => i !== index)
                        onDataChange({ ...data, interests: newInterests })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onDataChange({
                      ...data,
                      interests: [...data.interests, ""],
                    })
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Interés
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Apariencia */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Apariencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Template Selection */}
              <div>
                <Label>Plantilla</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => onTemplateChange(template.id)}
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-gray-600">{template.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Theme Selection */}
              <div>
                <Label>Tema de Color</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedTheme === theme.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => onThemeChange(theme.id)}
                    >
                      <div
                        className="w-6 h-6 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: theme.color }}
                      ></div>
                      <div className="text-xs text-center">{theme.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Modo Oscuro</Label>
                  <div className="text-sm text-gray-600">Cambiar entre tema claro y oscuro</div>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onToggleDarkMode}
                />
              </div>

              <Separator />

              {/* Custom Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Color de Fondo Personalizado</Label>
                  <Input
                    type="color"
                    value={customBackgroundColor}
                    onChange={(e) => onCustomBackgroundColorChange(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
                <div>
                  <Label>Color de Texto Personalizado</Label>
                  <Input
                    type="color"
                    value={customTextColor}
                    onChange={(e) => onCustomTextColorChange(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
