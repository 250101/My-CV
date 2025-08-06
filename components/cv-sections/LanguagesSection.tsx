import React from 'react'
import { Language } from '@/lib/types'

interface LanguagesSectionProps {
  languages: Language[]
  className?: string
  layout?: 'detailed' | 'compact' | 'ats'
  colorTheme?: {
    primary: string
    text: string
  }
}

export default function LanguagesSection({
  languages,
  className = '',
  layout = 'detailed',
  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' }
}: LanguagesSectionProps) {
  if (!languages.length) return null

  const validLanguages = languages.filter(lang => lang.language.trim() && lang.level.trim())
  if (!validLanguages.length) return null

  if (layout === 'ats') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1`}>
          IDIOMAS
        </h2>
        <div className="text-sm text-gray-700 leading-relaxed">
          {validLanguages.map((lang, index) => `${lang.language}: ${lang.level}`).join(' • ')}
        </div>
      </div>
    )
  }

  if (layout === 'compact') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-3`}>Idiomas</h2>
        <div className="space-y-1">
          {validLanguages.map((lang) => (
            <div key={lang.id} className="flex justify-between text-sm">
              <span className="font-medium">{lang.language}</span>
              <span className="text-gray-600">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default detailed layout
  return (
    <div className={className}>
      <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Idiomas</h2>
      <div className="space-y-3">
        {validLanguages.map((lang) => (
          <div key={lang.id} className="flex justify-between items-center">
            <span className={`font-medium ${colorTheme.text}`}>{lang.language}</span>
            <span className={`text-sm px-3 py-1 rounded-full bg-blue-100 ${colorTheme.primary}`}>
              {lang.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
