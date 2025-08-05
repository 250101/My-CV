"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, MinusCircle, Palette, Type, Tag, Tags } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

interface CurriculumGeneratorProps {
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
}

export function CurriculumGenerator({
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
}: CurriculumGeneratorProps) {
  const [activeSection, setActiveSection] = useState<string | null>("personalInfo")

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
        { id: Date.now().toString(), name: "", description: "", technologies: [""], imageUrls: [""] },
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

  const handleProjectImageChange = (projId: string, index: number, value: string) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === projId
          ? {
              ...proj,
              imageUrls: proj.imageUrls ? proj.imageUrls.map((url, i) => (i === index ? value : url)) : [value],
            }
          : proj,
      ),
    })
  }

  const addProjectImage = (projId: string) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === projId ? { ...proj, imageUrls: [...(proj.imageUrls || []), ""] } : proj,
      ),
    })
  }

  const removeProjectImage = (projId: string, index: number) => {
    onDataChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === projId
          ? {
              ...proj,
              imageUrls: proj.imageUrls ? proj.imageUrls.filter((_, i) => i !== index) : [],
            }
          : proj,
      ),
    })
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

  return (
    <ScrollArea className="h-[calc(100vh-48px)] pr-4">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="template-select">Plantilla</Label>
              <Select value={selectedTemplate} onValueChange={onTemplateChange}>
                <SelectTrigger id="template-select">
                  <SelectValue placeholder="Selecciona una plantilla" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="socialMedia">Inspirado en Redes Sociales</SelectItem>
                  <SelectItem value="ats">ATS Optimizado</SelectItem>
                  <SelectItem value="corporate">Corporativo</SelectItem>
                  <SelectItem value="creative">Creativo/Diseño</SelectItem>
                  <SelectItem value="minimal">Minimalista</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="theme-select">Tema de Color</Label>
              <Select value={selectedTheme} onValueChange={onThemeChange}>
                <SelectTrigger id="theme-select">
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orange">Naranja</SelectItem>
                  <SelectItem value="teal">Verde Azulado</SelectItem>
                  <SelectItem value="blue">Azul</SelectItem>
                  <SelectItem value="green">Verde</SelectItem>
                  <SelectItem value="purple">Púrpura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode-switch">Modo Oscuro</Label>
              <Switch id="dark-mode-switch" checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
            </div>
            <div>
              <Label htmlFor="custom-bg-color" className="flex items-center gap-2">
                <Palette className="h-4 w-4" /> Color de Fondo Personalizado
              </Label>
              <Input
                id="custom-bg-color"
                type="color"
                value={customBackgroundColor}
                onChange={(e) => onCustomBackgroundColorChange(e.target.value)}
                className="w-full h-10 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custom-text-color" className="flex items-center gap-2">
                <Type className="h-4 w-4" /> Color de Texto Principal
              </Label>
              <Select value={customTextColor} onValueChange={onCustomTextColorChange}>
                <SelectTrigger id="custom-text-color">
                  <SelectValue placeholder="Selecciona color de texto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">Negro</SelectItem>
                  <SelectItem value="white">Blanco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="custom-tag-primary-color" className="flex items-center gap-2">
                <Tag className="h-4 w-4" /> Color de Etiqueta Primaria
              </Label>
              <Input
                id="custom-tag-primary-color"
                type="color"
                value={customTagPrimaryColor}
                onChange={(e) => onCustomTagPrimaryColorChange(e.target.value)}
                className="w-full h-10 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custom-tag-secondary-color" className="flex items-center gap-2">
                <Tags className="h-4 w-4" /> Color de Etiqueta Secundaria
              </Label>
              <Input
                id="custom-tag-secondary-color"
                type="color"
                value={customTagSecondaryColor}
                onChange={(e) => onCustomTagSecondaryColorChange(e.target.value)}
                className="w-full h-10 mt-1"
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
          <AccordionItem value="personalInfo" id="personalInfo">
            <AccordionTrigger>Información Personal</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 p-4">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={data.personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                />
                <Label htmlFor="title">Título Profesional</Label>
                <Input
                  id="title"
                  value={data.personalInfo.title}
                  onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                />
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                />
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                />
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                />
                <Label htmlFor="website">Sitio Web</Label>
                <Input
                  id="website"
                  value={data.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                />
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                />
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={data.personalInfo.github}
                  onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                />
                <Label htmlFor="profilePhoto">URL Foto de Perfil</Label>
                <Input
                  id="profilePhoto"
                  value={data.personalInfo.profilePhoto}
                  onChange={(e) => handlePersonalInfoChange("profilePhoto", e.target.value)}
                />
                <Label htmlFor="profilePhotoBackgroundColor">Color de Fondo Foto de Perfil</Label>
                <Input
                  id="profilePhotoBackgroundColor"
                  type="color"
                  value={data.personalInfo.profilePhotoBackgroundColor || ""}
                  onChange={(e) => handlePersonalInfoChange("profilePhotoBackgroundColor", e.target.value)}
                />
                <Label htmlFor="portfolioTitle">Título del Portfolio</Label>
                <Input
                  id="portfolioTitle"
                  value={data.personalInfo.portfolioTitle}
                  onChange={(e) => handlePersonalInfoChange("portfolioTitle", e.target.value)}
                />
                <Label htmlFor="portfolioDescription">Descripción del Portfolio</Label>
                <Textarea
                  id="portfolioDescription"
                  value={data.personalInfo.portfolioDescription}
                  onChange={(e) => handlePersonalInfoChange("portfolioDescription", e.target.value)}
                />
                <Label htmlFor="portfolioWebsite">URL del Portfolio</Label>
                <Input
                  id="portfolioWebsite"
                  value={data.personalInfo.portfolioWebsite}
                  onChange={(e) => handlePersonalInfoChange("portfolioWebsite", e.target.value)}
                />
                <Label htmlFor="qrCodeImage">URL Imagen Código QR</Label>
                <Input
                  id="qrCodeImage"
                  value={data.personalInfo.qrCodeImage || ""}
                  onChange={(e) => handlePersonalInfoChange("qrCodeImage", e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

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
                    <Label>URLs de Imágenes</Label>
                    {(proj.imageUrls || []).map((url, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={url} onChange={(e) => handleProjectImageChange(proj.id, index, e.target.value)} />
                        <Button variant="outline" size="sm" onClick={() => removeProjectImage(proj.id, index)}>
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addProjectImage(proj.id)}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Añadir URL de Imagen
                    </Button>
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
      </div>
    </ScrollArea>
  )
}
