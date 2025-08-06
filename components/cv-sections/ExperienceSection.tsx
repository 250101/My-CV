import React from 'react'
import { Experience } from '@/lib/types'

interface ExperienceSectionProps {
  experiences: Experience[]
  className?: string
  showKeywords?: boolean
  highlightKeywords?: boolean
  colorTheme?: {
    primary: string
    text: string
    accent?: string
  }
  layout?: 'detailed' | 'compact' | 'ats'
}

export default function ExperienceSection({
  experiences,
  className = '',
  showKeywords = true,
  highlightKeywords = true,
  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' },
  layout = 'detailed'
}: ExperienceSectionProps) {
  if (!experiences.length) return null

  const renderKeywords = (keywords: string[]) => {
    if (!showKeywords || !keywords.length) return null
    
    return (
      <div className="mt-2">
        <div className="flex flex-wrap gap-1">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                highlightKeywords 
                  ? 'bg-blue-100 text-blue-800 font-medium' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const renderAchievements = (achievements: string[]) => {
    if (!achievements.length) return null

    return (
      <ul className="mt-2 space-y-1">
        {achievements.map((achievement, index) => (
          <li key={index} className="text-sm leading-relaxed">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
            <span className="ml-1">{achievement}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (layout === 'ats') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1`}>
          EXPERIENCIA PROFESIONAL
        </h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="border-b border-gray-200 pb-3 last:border-b-0">
              <div className="mb-2">
                <h3 className={`font-bold ${colorTheme.text} text-base`}>{exp.position}</h3>
                <div className="flex justify-between items-start mt-1">
                  <p className={`${colorTheme.primary} font-medium`}>{exp.company}</p>
                  <p className="text-gray-600 text-sm">{exp.period}</p>
                </div>
              </div>
              {renderAchievements(exp.achievements)}
              {showKeywords && exp.keywords.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-1">Competencias:</p>
                  <p className="text-sm text-gray-700">{exp.keywords.join(' • ')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (layout === 'compact') {
    return (
      <div className={className}>
        <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Experiencia Profesional</h2>
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-semibold ${colorTheme.text}`}>{exp.position}</h3>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <p className={`${colorTheme.primary} text-sm mb-1`}>{exp.company}</p>
              {exp.achievements.length > 0 && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {exp.achievements[0]}
                </p>
              )}
              {renderKeywords(exp.keywords)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default detailed layout
  return (
    <div className={className}>
      <h2 className={`text-xl font-bold ${colorTheme.text} mb-6`}>Experiencia Profesional</h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${colorTheme.text}`}>{exp.position}</h3>
                <p className={`${colorTheme.primary} font-medium text-base`}>{exp.company}</p>
              </div>
              <span className="text-gray-600 text-sm font-medium ml-4">{exp.period}</span>
            </div>
            {renderAchievements(exp.achievements)}
            {renderKeywords(exp.keywords)}
          </div>
        ))}
      </div>
    </div>
  )
}