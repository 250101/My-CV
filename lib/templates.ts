export interface TemplateConfig {
  id: string
  name: string
  description: string
  className: string
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  layout: 'vertical' | 'two-column' | 'horizontal'
  hasPhoto: boolean
  hasQR: boolean
}

export const CV_TEMPLATES: TemplateConfig[] = [
  {
    id: 'professional',
    name: 'Profesional',
    description: 'Diseño limpio y elegante, ideal para entornos corporativos',
    className: 'template-professional',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#3b82f6'
    },
    layout: 'vertical',
    hasPhoto: true,
    hasQR: true
  },
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Diseño contemporáneo con elementos visuales atractivos',
    className: 'template-modern',
    colors: {
      primary: '#7c3aed',
      secondary: '#5b21b6',
      background: '#f8fafc',
      text: '#334155',
      accent: '#8b5cf6'
    },
    layout: 'two-column',
    hasPhoto: true,
    hasQR: true
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Diseño simple y directo, perfecto para ATS',
    className: 'template-minimal',
    colors: {
      primary: '#374151',
      secondary: '#1f2937',
      background: '#ffffff',
      text: '#111827',
      accent: '#6b7280'
    },
    layout: 'vertical',
    hasPhoto: false,
    hasQR: false
  },
  {
    id: 'creative',
    name: 'Creativo',
    description: 'Diseño innovador para industrias creativas',
    className: 'template-creative',
    colors: {
      primary: '#f59e0b',
      secondary: '#d97706',
      background: '#fefefe',
      text: '#1f2937',
      accent: '#fbbf24'
    },
    layout: 'horizontal',
    hasPhoto: true,
    hasQR: true
  }
]

export const getTemplateById = (id: string): TemplateConfig | undefined => {
  return CV_TEMPLATES.find(template => template.id === id)
}

export const getDefaultTemplate = (): TemplateConfig => {
  return CV_TEMPLATES[0] // Professional template
} 