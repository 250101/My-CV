import React from 'react'

interface CertificationsSectionProps {
  certifications: string[]
  className?: string
  layout?: 'list' | 'compact' | 'ats'
  colorTheme?: {
    primary: string
    text: string
  }
}

export default function CertificationsSection({
  certifications,
  className = '',
  layout = 'list',
  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' }
}: CertificationsSectionProps) {
  if (!certifications.length) return null

  const validCertifications = certifications.filter(cert => cert.trim())
  if (!validCertifications.length) return null

  if (layout === 'ats') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1`}>
          CERTIFICACIONES
        </h2>
        <div className="text-sm text-gray-700 leading-relaxed">
          {validCertifications.join(' • ')}
        </div>
      </div>
    )
  }

  if (layout === 'compact') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-3`}>Certificaciones</h2>
        <div className="flex flex-wrap gap-1">
          {validCertifications.map((cert, index) => (
            <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {cert}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // Default list layout
  return (
    <div className={className}>
      <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Certificaciones</h2>
      <ul className="space-y-2">
        {validCertifications.map((cert, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
            <span className="text-sm text-gray-700">{cert}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}