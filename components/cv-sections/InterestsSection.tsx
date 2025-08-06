import React from 'react'

interface InterestsSectionProps {
  interests: string[]
  className?: string
  layout?: 'tags' | 'list' | 'ats'
  colorTheme?: {
    primary: string
    text: string
  }
}

export default function InterestsSection({
  interests,
  className = '',
  layout = 'tags',
  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' }
}: InterestsSectionProps) {
  if (!interests.length) return null

  const validInterests = interests.filter(interest => interest.trim())
  if (!validInterests.length) return null

  if (layout === 'ats') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1`}>
          INTERESES
        </h2>
        <div className="text-sm text-gray-700 leading-relaxed">
          {validInterests.join(' • ')}
        </div>
      </div>
    )
  }

  if (layout === 'list') {
    return (
      <div className={className}>
        <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Intereses</h2>
        <ul className="space-y-1">
          {validInterests.map((interest, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span className="text-sm text-gray-700">{interest}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Default tags layout
  return (
    <div className={className}>
      <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Intereses</h2>
      <div className="flex flex-wrap gap-2">
        {validInterests.map((interest, index) => (
          <span 
            key={index} 
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full border border-gray-200"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  )
}