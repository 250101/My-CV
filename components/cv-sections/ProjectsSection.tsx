import React from 'react'
import { Project } from '@/lib/types'

interface ProjectsSectionProps {
  projects: Project[]
  className?: string
  layout?: 'detailed' | 'compact' | 'ats'
  showImages?: boolean
  colorTheme?: {
    primary: string
    text: string
  }
}

export default function ProjectsSection({
  projects,
  className = '',
  layout = 'detailed',
  showImages = false,
  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' }
}: ProjectsSectionProps) {
  if (!projects.length) return null

  if (layout === 'ats') {
    return (
      <div className={className}>
        <h2 className={`text-lg font-bold ${colorTheme.text} mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1`}>
          PROYECTOS DESTACADOS
        </h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id}>
              <h3 className={`font-bold ${colorTheme.text}`}>{project.name}</h3>
              <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Tecnologías: {project.technologies.join(' • ')}
                </p>
              )}
              {project.link && (
                <p className="text-sm text-gray-600 mt-1">
                  Enlace: {project.link}
                </p>
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
        <h2 className={`text-xl font-bold ${colorTheme.text} mb-4`}>Proyectos</h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id}>
              <h3 className={`font-semibold ${colorTheme.text} text-sm`}>{project.name}</h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default detailed layout
  return (
    <div className={className}>
      <h2 className={`text-xl font-bold ${colorTheme.text} mb-6`}>Proyectos Destacados</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id}>
            {showImages && project.imageUrls && project.imageUrls[0] && (
              <img 
                src={project.imageUrls[0]} 
                alt={project.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            )}
            <h3 className={`text-lg font-semibold ${colorTheme.text} mb-2`}>{project.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{project.description}</p>
            
            {project.technologies.length > 0 && (
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Tecnologías utilizadas:</h4>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {project.link && (
              <a 
                href={project.link}
                className={`text-sm ${colorTheme.primary} hover:underline`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver proyecto →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}