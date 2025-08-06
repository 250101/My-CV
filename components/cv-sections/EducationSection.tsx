import React from 'react'
import { Education } from '@/lib/types'

interface EducationSectionProps {
  education: Education[]
  className?: string
  layout?: 'detailed' | 'compact' | 'ats'
  colorTheme?: {
    primary: string
    text: string
  }
}

export default function EducationSection({
  education,
  className = '',
  layout = 'detailed',
  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' }
}: EducationSectionProps) {
  if (!education.length) return null

  if (layout === 'ats') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1`}>
          FORMACIÓN ACADÉMICA
        </h2>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id}>
              <h3 className={`font-bold ${colorTheme.text}`}>{edu.degree}</h3>
              <div className="flex justify-between items-start mt-1">
                <p className={`${colorTheme.primary} font-medium`}>{edu.institution}</p>
                <p className="text-gray-600 text-sm">{edu.period}</p>
              </div>
              {edu.details && (
                <p className="text-sm text-gray-700 mt-1">{edu.details}</p>
              )}
              {edu.gpa && (
                <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
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
        <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Formación</h2>
        <div className="space-y-2">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-start">
                <h3 className={`font-semibold ${colorTheme.text} text-sm`}>{edu.degree}</h3>
                <span className="text-xs text-gray-500">{edu.period}</span>
              </div>
              <p className={`${colorTheme.primary} text-sm`}>{edu.institution}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default detailed layout
  return (
    <div className={className}>
      <h2 className={`text-xl font-bold ${colorTheme.text} mb-6`}>Formación Académica</h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className={`font-semibold ${colorTheme.text} text-base`}>{edu.degree}</h3>
                <p className={`${colorTheme.primary} font-medium`}>{edu.institution}</p>
              </div>
              <span className="text-gray-600 text-sm">{edu.period}</span>
            </div>
            {edu.details && (
              <p className="text-sm text-gray-600 mt-1">{edu.details}</p>
            )}
            {edu.gpa && (
              <p className="text-sm text-gray-600 mt-1">GPA: <span className="font-medium">{edu.gpa}</span></p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}