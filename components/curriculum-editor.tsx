"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"
import { HexColorPicker, HexColorInput } from "react-colorful"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { v4 as uuidv4 } from "uuid"

// Define the interfaces here
export interface PersonalInfo {
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

export interface Experience {
  id: string
  position: string
  company: string
  period: string
  achievements: string[]
  keywords: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  details: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  imageUrls?: string[]
}

export interface CurriculumData {
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

// This component was previously named CurriculumGenerator and contained the full editor logic.
// It is now renamed to CurriculumEditor to align with its intended role and remove redundancy.
export default function CurriculumEditor({
  data,
  onDataChange,
  selectedTemplate,
  onTemplateChange,
  selectedTheme,
  onThemeChange,
  isDarkMode,
  onDarkModeChange,
  customBackgroundColor,
  onCustomBackgroundColorChange,
  customTextColor,
  onCustomTextColorChange,
  customTagPrimaryColor,
  onCustomTagPrimaryColorChange,
  customTagSecondaryColor,
  onCustomTagSecondaryColorChange,
}: {
  data: CurriculumData
  onDataChange: (data: CurriculumData) => void
  selectedTemplate: string
  onTemplateChange: (template: string) => void
  selectedTheme: string
  onThemeChange: (theme: string) => void
  isDarkMode: boolean
  onDarkModeChange: (isDarkMode: boolean) => void
  customBackgroundColor: string
  onCustomBackgroundColorChange: (color: string) => void
  customTextColor: string
  onCustomTextColorChange: (color: string) => void
  customTagPrimaryColor: string
  onCustomTagPrimaryColorChange: (color: string) => void
  customTagSecondaryColor: string
  onCustomTagSecondaryColorChange: (color: string) => void
}) {
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    })
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
          id: uuidv4(),
          position: "",
          company: "",
          period: "",
          achievements: [],
          keywords: [],
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
        {
          id: uuidv4(),
          degree: "",
          institution: "",
          period: "",
          details: "",
        },
      ],
    })
  }

  const removeEducation = (id: string) => {
    onDataChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
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
        {
          id: uuidv4(),
          name: "",
          description: "",
          technologies: [],
          link: "",
          imageUrls: [],
        },
      ],
    })
  }

  const removeProject = (id: string) => {
    onDataChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    })
  }

  const handleSkillChange = (type: "technicalSkills" | "softSkills", value: string) => {
    onDataChange({
      ...data,
      [type]: value.split(",").map((s) => s.trim()),
    })
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
      languages: [...data.languages, { id: uuidv4(), language: "", level: "" }],
    })
  }

  const removeLanguage = (id: string) => {
    onDataChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    })
  }

  const handleCertificationsChange = (value: string) => {
    onDataChange({
      ...data,
      certifications: value.split(",").map((c) => c.trim()),
    })
  }

  const handleInterestsChange = (value: string) => {
    onDataChange({
      ...data,
      interests: value.split(",").map((i) => i.trim()),
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
        exp.id === expId
          ? {
              ...exp,
              achievements: [...exp.achievements, ""],
            }
          : exp,
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

  const handleProjectTechnologiesChange = (projectId: string, value: string) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === projectId ? { ...proj, technologies: value.split(",").map((t) => t.trim()) } : proj,
      ),
    })
  }

  const handleProjectImageUrlsChange = (projectId: string, value: string) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === projectId ? { ...proj, imageUrls: value.split(",").map((url) => url.trim()) } : proj,
      ),
    })
  }

  const handleKeywordsChange = (value: string) => {
    onDataChange({ ...data, keywords: value.split(",").map((s) => s.trim()) })
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg overflow-y-auto h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Información</h2>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experiencia</TabsTrigger>
          <TabsTrigger value="design">Diseño</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-4">
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
                  type="tel"
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
                <Label htmlFor="website">Sitio Web</Label>
                <Input
                  id="website"
                  value={data.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
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
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={data.personalInfo.github}
                  onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="profilePhoto">URL Foto de Perfil</Label>
                <Input
                  id="profilePhoto"
                  value={data.personalInfo.profilePhoto}
                  onChange={(e) => handlePersonalInfoChange("profilePhoto", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="profilePhotoBackgroundColor">Color de Fondo Foto de Perfil</Label>
                <div className="flex items-center gap-2">
                  <HexColorInput
                    id="profilePhotoBackgroundColor"
                    color={data.personalInfo.profilePhotoBackgroundColor || "#E0E7FF"}
                    onChange={(color) => handlePersonalInfoChange("profilePhotoBackgroundColor", color)}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: data.personalInfo.profilePhotoBackgroundColor || "transparent" }}
                  />
                </div>
                <HexColorPicker
                  color={data.personalInfo.profilePhotoBackgroundColor || "#E0E7FF"}
                  onChange={(color) => handlePersonalInfoChange("profilePhotoBackgroundColor", color)}
                  className="mt-2"
                />
              </div>
              <Separator />
              <div>
                <Label htmlFor="portfolioTitle">Título del Portfolio/QR</Label>
                <Input
                  id="portfolioTitle"
                  value={data.personalInfo.portfolioTitle}
                  onChange={(e) => handlePersonalInfoChange("portfolioTitle", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="portfolioDescription">Descripción del Portfolio/QR</Label>
                <Textarea
                  id="portfolioDescription"
                  value={data.personalInfo.portfolioDescription}
                  onChange={(e) => handlePersonalInfoChange("portfolioDescription", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="portfolioWebsite">Sitio Web del Portfolio</Label>
                <Input
                  id="portfolioWebsite"
                  value={data.personalInfo.portfolioWebsite}
                  onChange={(e) => handlePersonalInfoChange("portfolioWebsite", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="qrCodeImage">URL o Data URL de Imagen de Código QR</Label>
                <Input
                  id="qrCodeImage"
                  value={data.personalInfo.qrCodeImage || ""}
                  onChange={(e) => handlePersonalInfoChange("qrCodeImage", e.target.value)}
                  placeholder="data:image/png;base64,..."
                />
                {data.personalInfo.qrCodeImage && (
                  <img
                    src={data.personalInfo.qrCodeImage || "/placeholder.svg"}
                    alt="QR Code Preview"
                    className="mt-2 w-24 h-24 object-contain border rounded"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resumen Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={data.summary}
                onChange={(e) => onDataChange({ ...data, summary: e.target.value })}
                rows={5}
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="technicalSkills">Habilidades Técnicas (separadas por comas)</Label>
                <Input
                  id="technicalSkills"
                  value={data.technicalSkills.join(", ")}
                  onChange={(e) => handleSkillChange("technicalSkills", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="softSkills">Habilidades Interpersonales (separadas por comas)</Label>
                <Input
                  id="softSkills"
                  value={data.softSkills.join(", ")}
                  onChange={(e) => handleSkillChange("softSkills", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Idiomas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`language-${lang.id}`}>Idioma</Label>
                    <Input
                      id={`language-${lang.id}`}
                      value={lang.language}
                      onChange={(e) => handleLanguageChange(lang.id, "language", e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`level-${lang.id}`}>Nivel</Label>
                    <Input
                      id={`level-${lang.id}`}
                      value={lang.level}
                      onChange={(e) => handleLanguageChange(lang.id, "level", e.target.value)}
                    />
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeLanguage(lang.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addLanguage} className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" /> Añadir Idioma
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Certificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={data.certifications.join(", ")}
                onChange={(e) => handleCertificationsChange(e.target.value)}
                placeholder="Certificación 1, Certificación 2, ..."
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Intereses</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={data.interests.join(", ")}
                onChange={(e) => handleInterestsChange(e.target.value)}
                placeholder="Interés 1, Interés 2, ..."
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Palabras Clave (para ATS)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                id="keywords"
                value={data.keywords.join(", ")}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                rows={3}
                placeholder="Palabras clave relevantes para tu industria o puesto deseado, separadas por comas."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Experiencia Laboral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border p-4 rounded-md space-y-3 relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div>
                    <Label htmlFor={`position-${exp.id}`}>Posición</Label>
                    <Input
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`company-${exp.id}`}>Empresa</Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`period-${exp.id}`}>Período</Label>
                    <Input
                      id={`period-${exp.id}`}
                      value={exp.period}
                      onChange={(e) => handleExperienceChange(exp.id, "period", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Logros (uno por línea)</Label>
                    {exp.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Textarea
                          value={achievement}
                          onChange={(e) => handleAchievementChange(exp.id, index, e.target.value)}
                          rows={2}
                        />
                        <Button variant="destructive" size="icon" onClick={() => removeAchievement(exp.id, index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => addAchievement(exp.id)} variant="outline" className="w-full mt-2">
                      <PlusCircle className="h-4 w-4 mr-2" /> Añadir Logro
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor={`keywords-${exp.id}`}>Palabras Clave (separadas por comas)</Label>
                    <Input
                      id={`keywords-${exp.id}`}
                      value={exp.keywords.join(", ")}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "keywords",
                          e.target.value.split(",").map((k) => k.trim()),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addExperience} className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" /> Añadir Experiencia
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Educación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="border p-4 rounded-md space-y-3 relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div>
                    <Label htmlFor={`degree-${edu.id}`}>Título/Grado</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`institution-${edu.id}`}>Institución</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edu-period-${edu.id}`}>Período</Label>
                    <Input
                      id={`edu-period-${edu.id}`}
                      value={edu.period}
                      onChange={(e) => handleEducationChange(edu.id, "period", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`details-${edu.id}`}>Detalles</Label>
                    <Textarea
                      id={`details-${edu.id}`}
                      value={edu.details}
                      onChange={(e) => handleEducationChange(edu.id, "details", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`gpa-${edu.id}`}>GPA (Opcional)</Label>
                    <Input
                      id={`gpa-${edu.id}`}
                      value={edu.gpa || ""}
                      onChange={(e) => handleEducationChange(edu.id, "gpa", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addEducation} className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" /> Añadir Educación
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Proyectos Destacados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} className="border p-4 rounded-md space-y-3 relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div>
                    <Label htmlFor={`project-name-${project.id}`}>Nombre del Proyecto</Label>
                    <Input
                      id={`project-name-${project.id}`}
                      value={project.name}
                      onChange={(e) => handleProjectChange(project.id, "name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-description-${project.id}`}>Descripción</Label>
                    <Textarea
                      id={`project-description-${project.id}`}
                      value={project.description}
                      onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-technologies-${project.id}`}>Tecnologías (separadas por comas)</Label>
                    <Input
                      id={`project-technologies-${project.id}`}
                      value={project.technologies.join(", ")}
                      onChange={(e) => handleProjectTechnologiesChange(project.id, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-link-${project.id}`}>Enlace (URL)</Label>
                    <Input
                      id={`project-link-${project.id}`}
                      value={project.link || ""}
                      onChange={(e) => handleProjectChange(project.id, "link", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-images-${project.id}`}>URLs de Imágenes (separadas por comas)</Label>
                    <Input
                      id={`project-images-${project.id}`}
                      value={project.imageUrls?.join(", ") || ""}
                      onChange={(e) => handleProjectImageUrlsChange(project.id, e.target.value)}
                      placeholder="URL1, URL2, URL3..."
                    />
                    {project.imageUrls && project.imageUrls.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.imageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url || "/placeholder.svg?height=50&width=50"}
                            alt={`Imagen ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button onClick={addProject} className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" /> Añadir Proyecto
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Opciones de Diseño</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="template-select">Seleccionar Plantilla</Label>
                <Select value={selectedTemplate} onValueChange={onTemplateChange}>
                  <SelectTrigger id="template-select">
                    <SelectValue placeholder="Selecciona una plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="socialMedia">Inspirada en Redes Sociales</SelectItem>
                    <SelectItem value="ats">ATS Friendly</SelectItem>
                    <SelectItem value="corporate">Corporativa</SelectItem>
                    <SelectItem value="creative">Creativa</SelectItem>
                    <SelectItem value="minimal">Minimalista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="theme-select">Seleccionar Tema de Color</Label>
                <Select value={selectedTheme} onValueChange={onThemeChange}>
                  <SelectTrigger id="theme-select">
                    <SelectValue placeholder="Selecciona un tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orange">Naranja (Predeterminado)</SelectItem>
                    <SelectItem value="teal">Verde Azulado</SelectItem>
                    <SelectItem value="blue">Azul</SelectItem>
                    <SelectItem value="green">Verde</SelectItem>
                    <SelectItem value="purple">Púrpura</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="darkMode"
                  checked={isDarkMode}
                  onCheckedChange={(checked: boolean) => onDarkModeChange(checked)}
                />
                <Label htmlFor="darkMode">Modo Oscuro</Label>
              </div>

              <Separator />

              <h4 className="text-lg font-semibold mt-4">Colores Personalizados</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Estos colores anularán los colores del tema seleccionado.
              </p>

              <div>
                <Label htmlFor="customBackgroundColor">Color de Fondo Personalizado</Label>
                <div className="flex items-center gap-2">
                  <HexColorInput
                    id="customBackgroundColor"
                    color={customBackgroundColor}
                    onChange={onCustomBackgroundColorChange}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: customBackgroundColor || "transparent" }}
                  />
                </div>
                <HexColorPicker
                  color={customBackgroundColor}
                  onChange={onCustomBackgroundColorChange}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="customTextColor">Color de Texto Principal Personalizado</Label>
                <div className="flex items-center gap-2">
                  <HexColorInput
                    id="customTextColor"
                    color={customTextColor}
                    onChange={onCustomTextColorChange}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: customTextColor || "transparent" }}
                  />
                </div>
                <HexColorPicker color={customTextColor} onChange={onCustomTextColorChange} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="customTagPrimaryColor">Color de Etiqueta Primaria Personalizado</Label>
                <div className="flex items-center gap-2">
                  <HexColorInput
                    id="customTagPrimaryColor"
                    color={customTagPrimaryColor}
                    onChange={onCustomTagPrimaryColorChange}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: customTagPrimaryColor || "transparent" }}
                  />
                </div>
                <HexColorPicker
                  color={customTagPrimaryColor}
                  onChange={onCustomTagPrimaryColorChange}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="customTagSecondaryColor">Color de Etiqueta Secundaria Personalizado</Label>
                <div className="flex items-center gap-2">
                  <HexColorInput
                    id="customTagSecondaryColor"
                    color={customTagSecondaryColor}
                    onChange={onCustomTagSecondaryColorChange}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: customTagSecondaryColor || "transparent" }}
                  />
                </div>
                <HexColorPicker
                  color={customTagSecondaryColor}
                  onChange={onCustomTagSecondaryColorChange}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
