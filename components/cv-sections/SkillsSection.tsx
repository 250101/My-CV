import React from 'react'

interface SkillsSectionProps {
  technicalSkills: string[]
  softSkills: string[]
  className?: string
  layout?: 'combined' | 'separated' | 'compact' | 'ats'
  highlightKeywords?: boolean
  colorTheme?: {
    primary: string
    text: string
    accent?: string
  }
  prioritySkills?: string[] // Skills to highlight prominently
}

export default function SkillsSection({
  technicalSkills,
  softSkills,
  className = '',
  layout = 'separated',
  highlightKeywords = true,
  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' },
  prioritySkills = []
}: SkillsSectionProps) {
  const allSkills = [...technicalSkills, ...softSkills]
  
  if (!allSkills.length) return null

  const renderSkillsList = (skills: string[], title?: string, isPriority = false) => {
    if (!skills.length) return null

    const skillsToRender = skills.filter(skill => skill.trim())
    if (!skillsToRender.length) return null

    return (
      <div className="mb-4">
        {title && (
          <h3 className={`font-semibold ${colorTheme.text} mb-2 text-base`}>{title}</h3>
        )}
        <div className="flex flex-wrap gap-2">
          {skillsToRender.map((skill, index) => {
            const isHighlighted = prioritySkills.includes(skill) || isPriority
            return (
              <span
                key={index}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  highlightKeywords && isHighlighted
                    ? 'bg-blue-100 text-blue-800 border-blue-200 font-medium'
                    : highlightKeywords
                    ? 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {skill}
              </span>
            )
          })}
        </div>
      </div>
    )
  }

  if (layout === 'ats') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1`}>
          COMPETENCIAS Y HABILIDADES
        </h2>
        <div className="space-y-3">
          {technicalSkills.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Competencias Técnicas:</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {technicalSkills.join(' • ')}
              </p>
            </div>
          )}
          {softSkills.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Habilidades Interpersonales:</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {softSkills.join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (layout === 'compact') {
    return (
      <div className={className}>
        <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Habilidades Clave</h2>
        <div className="flex flex-wrap gap-2">
          {allSkills.slice(0, 12).map((skill, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                highlightKeywords
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (layout === 'combined') {
    return (
      <div className={className}>
        <h2 className={`text-xl font-bold ${colorTheme.text} mb-6`}>Habilidades</h2>
        {renderSkillsList(allSkills)}
      </div>
    )
  }

  // Default separated layout
  return (
    <div className={className}>
      <h2 className={`text-xl font-bold ${colorTheme.text} mb-6`}>Habilidades</h2>
      <div className="space-y-4">
        {renderSkillsList(technicalSkills, "Competencias Técnicas")}
        {renderSkillsList(softSkills, "Habilidades Interpersonales")}
      </div>
    </div>
  )
}