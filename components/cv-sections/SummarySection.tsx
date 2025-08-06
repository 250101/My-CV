import React from 'react'

interface SummarySectionProps {
  summary: string
  className?: string
  layout?: 'standard' | 'compact' | 'ats' | 'highlighted'
  colorTheme?: {
    primary: string
    text: string
    accent?: string
  }
  keywords?: string[] // Keywords to highlight within the summary
}

export default function SummarySection({
  summary,
  className = '',
  layout = 'standard',
  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' },
  keywords = []
}: SummarySectionProps) {
  if (!summary.trim()) return null

  const highlightKeywords = (text: string, keywordsToHighlight: string[]) => {
    if (!keywordsToHighlight.length) return text

    let highlightedText = text
    keywordsToHighlight.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      highlightedText = highlightedText.replace(regex, `<mark class="bg-yellow-200 text-gray-900 px-1 rounded">$&</mark>`)
    })
    return highlightedText
  }

  if (layout === 'ats') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1`}>
          RESUMEN PROFESIONAL
        </h2>
        <div className="text-sm text-gray-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ 
            __html: highlightKeywords(summary, keywords) 
          }} />
        </div>
      </div>
    )
  }

  if (layout === 'compact') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-semibold ${colorTheme.text} mb-3`}>Perfil Profesional</h2>
        <div className={`text-sm ${colorTheme.text} leading-relaxed`}>
          <div dangerouslySetInnerHTML={{ 
            __html: highlightKeywords(summary, keywords) 
          }} />
        </div>
      </div>
    )
  }

  if (layout === 'highlighted') {
    return (
      <div className={`${className} bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500`}>
        <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Resumen Profesional</h2>
        <div className={`text-base ${colorTheme.text} leading-relaxed`}>
          <div dangerouslySetInnerHTML={{ 
            __html: highlightKeywords(summary, keywords) 
          }} />
        </div>
      </div>
    )
  }

  // Default standard layout
  return (
    <div className={className}>
      <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Resumen Profesional</h2>
      <div className={`text-base ${colorTheme.text} leading-relaxed`}>
        <div dangerouslySetInnerHTML={{ 
          __html: highlightKeywords(summary, keywords) 
        }} />
      </div>
    </div>
  )
}