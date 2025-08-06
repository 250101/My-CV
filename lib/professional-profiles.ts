import { ProfessionalProfile, ProfileConfig, SectionType } from "./types"

export const PROFESSIONAL_PROFILES: Record<ProfessionalProfile, ProfileConfig> = {
  [ProfessionalProfile.ADMINISTRATIVE]: {
    name: "Administrativo",
    description: "Perfil optimizado para roles administrativos, gestión y soporte organizacional",
    requiredSections: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.EXPERIENCE,
      SectionType.EDUCATION,
      SectionType.TECHNICAL_SKILLS,
      SectionType.SOFT_SKILLS
    ],
    optionalSections: [
      SectionType.CERTIFICATIONS,
      SectionType.LANGUAGES,
      SectionType.INTERESTS
    ],
    sectionOrder: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.TECHNICAL_SKILLS,
      SectionType.SOFT_SKILLS,
      SectionType.EXPERIENCE,
      SectionType.EDUCATION,
      SectionType.CERTIFICATIONS,
      SectionType.LANGUAGES
    ],
    keySkillsFocus: [
      "Gestión administrativa",
      "Organización",
      "Atención al detalle",
      "Microsoft Office",
      "Planificación",
      "Comunicación efectiva",
      "Gestión de archivos",
      "Soporte ejecutivo"
    ],
    contentPrompts: {
      summary: "Enfócate en eficiencia organizacional, gestión de procesos administrativos, soporte a equipos y manejo de sistemas de gestión.",
      achievements: "Destaca mejoras en procesos, reducción de tiempos, organización de eventos, gestión de bases de datos y soporte a equipos directivos.",
      skills: "Prioriza herramientas office, sistemas de gestión, comunicación, organización y atención al detalle."
    }
  },

  [ProfessionalProfile.CUSTOMER_SERVICE]: {
    name: "Atención al Cliente",
    description: "Perfil especializado en servicio al cliente, soporte y relaciones comerciales",
    requiredSections: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.EXPERIENCE,
      SectionType.SOFT_SKILLS,
      SectionType.LANGUAGES
    ],
    optionalSections: [
      SectionType.EDUCATION,
      SectionType.TECHNICAL_SKILLS,
      SectionType.CERTIFICATIONS,
      SectionType.INTERESTS
    ],
    sectionOrder: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.SOFT_SKILLS,
      SectionType.EXPERIENCE,
      SectionType.LANGUAGES,
      SectionType.TECHNICAL_SKILLS,
      SectionType.EDUCATION,
      SectionType.CERTIFICATIONS
    ],
    keySkillsFocus: [
      "Atención al cliente",
      "Comunicación efectiva",
      "Resolución de conflictos",
      "Empatía",
      "Trabajo bajo presión",
      "CRM",
      "Ventas",
      "Soporte técnico"
    ],
    contentPrompts: {
      summary: "Resalta experiencia en servicio al cliente, resolución de problemas, satisfacción del cliente y habilidades de comunicación.",
      achievements: "Incluye métricas de satisfacción del cliente, resolución de casos, ventas generadas y mejoras en procesos de atención.",
      skills: "Enfócate en habilidades de comunicación, herramientas CRM, idiomas y capacidades de resolución de problemas."
    }
  },

  [ProfessionalProfile.CULINARY]: {
    name: "Cocinero / Gastronomía",
    description: "Perfil para profesionales culinarios, chefs y especialistas en gastronomía",
    requiredSections: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.EXPERIENCE,
      SectionType.TECHNICAL_SKILLS,
      SectionType.SOFT_SKILLS
    ],
    optionalSections: [
      SectionType.EDUCATION,
      SectionType.CERTIFICATIONS,
      SectionType.PROJECTS,
      SectionType.INTERESTS,
      SectionType.LANGUAGES
    ],
    sectionOrder: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.TECHNICAL_SKILLS,
      SectionType.EXPERIENCE,
      SectionType.SOFT_SKILLS,
      SectionType.CERTIFICATIONS,
      SectionType.PROJECTS,
      SectionType.EDUCATION,
      SectionType.LANGUAGES
    ],
    keySkillsFocus: [
      "Técnicas culinarias",
      "Gestión de cocina",
      "Seguridad alimentaria",
      "Creación de menús",
      "Control de costos",
      "Liderazgo de equipo",
      "Innovación gastronómica",
      "Organización de eventos"
    ],
    contentPrompts: {
      summary: "Destaca especialidades culinarias, experiencia en diferentes tipos de cocina, liderazgo de equipo y innovación gastronómica.",
      achievements: "Incluye creación de menús exitosos, gestión de equipos, control de costos, eventos organizados y reconocimientos culinarios.",
      skills: "Enfócate en técnicas específicas de cocina, conocimiento de ingredientes, gestión de cocina y creatividad culinaria."
    }
  },

  [ProfessionalProfile.TEAM_TRAINER]: {
    name: "Capacitador de Equipos",
    description: "Perfil para formadores, capacitadores y especialistas en desarrollo de talento",
    requiredSections: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.EXPERIENCE,
      SectionType.EDUCATION,
      SectionType.SOFT_SKILLS,
      SectionType.CERTIFICATIONS
    ],
    optionalSections: [
      SectionType.TECHNICAL_SKILLS,
      SectionType.PROJECTS,
      SectionType.LANGUAGES,
      SectionType.INTERESTS
    ],
    sectionOrder: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.SOFT_SKILLS,
      SectionType.EXPERIENCE,
      SectionType.EDUCATION,
      SectionType.CERTIFICATIONS,
      SectionType.PROJECTS,
      SectionType.TECHNICAL_SKILLS,
      SectionType.LANGUAGES
    ],
    keySkillsFocus: [
      "Capacitación y desarrollo",
      "Diseño instruccional",
      "Facilitación",
      "Evaluación de desempeño",
      "Comunicación efectiva",
      "Liderazgo",
      "Metodologías de enseñanza",
      "Gestión del talento"
    ],
    contentPrompts: {
      summary: "Resalta experiencia en formación, desarrollo de programas de capacitación, evaluación de desempeño y mejora de competencias.",
      achievements: "Incluye programas desarrollados, personas capacitadas, mejoras en desempeño de equipos y metodologías implementadas.",
      skills: "Enfócate en técnicas de capacitación, herramientas de e-learning, evaluación y desarrollo de competencias."
    }
  },

  [ProfessionalProfile.CUSTOMER_EXPERIENCE]: {
    name: "Líder de Equipos - Customer Experience",
    description: "Perfil para líderes especializados en experiencia del cliente y gestión de equipos",
    requiredSections: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.EXPERIENCE,
      SectionType.SOFT_SKILLS,
      SectionType.TECHNICAL_SKILLS
    ],
    optionalSections: [
      SectionType.EDUCATION,
      SectionType.CERTIFICATIONS,
      SectionType.PROJECTS,
      SectionType.LANGUAGES,
      SectionType.INTERESTS
    ],
    sectionOrder: [
      SectionType.PERSONAL_INFO,
      SectionType.SUMMARY,
      SectionType.SOFT_SKILLS,
      SectionType.TECHNICAL_SKILLS,
      SectionType.EXPERIENCE,
      SectionType.PROJECTS,
      SectionType.EDUCATION,
      SectionType.CERTIFICATIONS,
      SectionType.LANGUAGES
    ],
    keySkillsFocus: [
      "Experiencia del cliente",
      "Liderazgo de equipos",
      "Análisis de datos",
      "Gestión de procesos",
      "KPIs y métricas",
      "Mejora continua",
      "Comunicación estratégica",
      "Design thinking"
    ],
    contentPrompts: {
      summary: "Destaca liderazgo en mejora de experiencia del cliente, gestión de equipos, análisis de métricas y implementación de estrategias.",
      achievements: "Incluye mejoras en satisfacción del cliente, KPIs alcanzados, equipos liderados y proyectos de transformación implementados.",
      skills: "Enfócate en liderazgo, análisis de datos, herramientas CX, gestión de equipos y metodologías de mejora continua."
    }
  }
}

export function getProfileConfig(profile: ProfessionalProfile): ProfileConfig {
  return PROFESSIONAL_PROFILES[profile]
}

export function getAllProfiles(): ProfileConfig[] {
  return Object.values(PROFESSIONAL_PROFILES)
}