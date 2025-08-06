import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { CurriculumData, ExportOptions } from './types'

export class CVExporter {
  
  static async exportToPDF(
    element: HTMLElement, 
    filename: string,
    options: ExportOptions = { format: 'pdf' }
  ): Promise<void> {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: options.colorMode === 'blackwhite' ? '#ffffff' : null,
        width: element.scrollWidth,
        height: element.scrollHeight,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${filename}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('Error al generar el PDF. Por favor, inténtalo de nuevo.')
    }
  }

  static async exportToWord(data: CurriculumData, filename: string): Promise<void> {
    try {
      const docContent = this.generateWordContent(data)
      const blob = new Blob([docContent], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      })
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.docx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating Word document:', error)
      throw new Error('Error al generar el documento Word. Por favor, inténtalo de nuevo.')
    }
  }

  static async exportToTXT(data: CurriculumData, filename: string): Promise<void> {
    try {
      const txtContent = this.generateTextContent(data)
      const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' })
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating TXT file:', error)
      throw new Error('Error al generar el archivo TXT. Por favor, inténtalo de nuevo.')
    }
  }

  private static generateWordContent(data: CurriculumData): string {
    // Simplified Word document structure using HTML that Word can interpret
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.2; margin: 1in; }
          h1 { font-size: 16pt; font-weight: bold; margin-bottom: 0.5em; }
          h2 { font-size: 14pt; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; border-bottom: 1px solid #333; }
          h3 { font-size: 12pt; font-weight: bold; margin-bottom: 0.25em; }
          .contact-info { margin-bottom: 1em; }
          .experience-item, .education-item { margin-bottom: 1em; }
          .achievements { margin-left: 1em; }
          .skills { margin-bottom: 0.5em; }
          .skill-tag { display: inline-block; margin-right: 0.5em; }
        </style>
      </head>
      <body>
        <h1>${data.personalInfo.name}</h1>
        <div class="contact-info">
          <strong>${data.personalInfo.title}</strong><br>
          Email: ${data.personalInfo.email}<br>
          Teléfono: ${data.personalInfo.phone}<br>
          Ubicación: ${data.personalInfo.location}
          ${data.personalInfo.linkedin ? `<br>LinkedIn: ${data.personalInfo.linkedin}` : ''}
          ${data.personalInfo.github ? `<br>GitHub: ${data.personalInfo.github}` : ''}
        </div>

        ${data.summary ? `
        <h2>RESUMEN PROFESIONAL</h2>
        <p>${data.summary}</p>
        ` : ''}

        ${data.technicalSkills.length > 0 || data.softSkills.length > 0 ? `
        <h2>COMPETENCIAS</h2>
        ${data.technicalSkills.length > 0 ? `
        <h3>Competencias Técnicas</h3>
        <div class="skills">${data.technicalSkills.join(' • ')}</div>
        ` : ''}
        ${data.softSkills.length > 0 ? `
        <h3>Habilidades Interpersonales</h3>
        <div class="skills">${data.softSkills.join(' • ')}</div>
        ` : ''}
        ` : ''}

        ${data.experience.length > 0 ? `
        <h2>EXPERIENCIA PROFESIONAL</h2>
        ${data.experience.map(exp => `
        <div class="experience-item">
          <h3>${exp.position}</h3>
          <strong>${exp.company}</strong> | ${exp.period}
          ${exp.achievements.length > 0 ? `
          <div class="achievements">
            ${exp.achievements.map(achievement => `<p>• ${achievement}</p>`).join('')}
          </div>
          ` : ''}
          ${exp.keywords.length > 0 ? `
          <p><strong>Competencias:</strong> ${exp.keywords.join(' • ')}</p>
          ` : ''}
        </div>
        `).join('')}
        ` : ''}

        ${data.education.length > 0 ? `
        <h2>FORMACIÓN ACADÉMICA</h2>
        ${data.education.map(edu => `
        <div class="education-item">
          <h3>${edu.degree}</h3>
          <strong>${edu.institution}</strong> | ${edu.period}
          ${edu.details ? `<p>${edu.details}</p>` : ''}
          ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
        </div>
        `).join('')}
        ` : ''}

        ${data.projects.length > 0 ? `
        <h2>PROYECTOS DESTACADOS</h2>
        ${data.projects.map(project => `
        <div class="education-item">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          ${project.technologies.length > 0 ? `
          <p><strong>Tecnologías:</strong> ${project.technologies.join(' • ')}</p>
          ` : ''}
          ${project.link ? `<p><strong>Enlace:</strong> ${project.link}</p>` : ''}
        </div>
        `).join('')}
        ` : ''}

        ${data.certifications.length > 0 ? `
        <h2>CERTIFICACIONES</h2>
        <ul>
          ${data.certifications.map(cert => `<li>${cert}</li>`).join('')}
        </ul>
        ` : ''}

        ${data.languages.length > 0 ? `
        <h2>IDIOMAS</h2>
        ${data.languages.map(lang => `<p><strong>${lang.language}:</strong> ${lang.level}</p>`).join('')}
        ` : ''}

        ${data.interests.length > 0 ? `
        <h2>INTERESES</h2>
        <p>${data.interests.join(' • ')}</p>
        ` : ''}
      </body>
      </html>
    `
  }

  private static generateTextContent(data: CurriculumData): string {
    let content = ''

    // Header
    content += `${data.personalInfo.name.toUpperCase()}\n`
    content += `${data.personalInfo.title}\n`
    content += `${'='.repeat(50)}\n\n`

    // Contact Information
    content += `INFORMACIÓN DE CONTACTO\n`
    content += `Email: ${data.personalInfo.email}\n`
    content += `Teléfono: ${data.personalInfo.phone}\n`
    content += `Ubicación: ${data.personalInfo.location}\n`
    if (data.personalInfo.linkedin) content += `LinkedIn: ${data.personalInfo.linkedin}\n`
    if (data.personalInfo.github) content += `GitHub: ${data.personalInfo.github}\n`
    content += '\n'

    // Summary
    if (data.summary) {
      content += `RESUMEN PROFESIONAL\n`
      content += `${'-'.repeat(20)}\n`
      content += `${data.summary}\n\n`
    }

    // Skills
    if (data.technicalSkills.length > 0 || data.softSkills.length > 0) {
      content += `COMPETENCIAS\n`
      content += `${'-'.repeat(12)}\n`
      
      if (data.technicalSkills.length > 0) {
        content += `Competencias Técnicas:\n`
        content += `${data.technicalSkills.join(' • ')}\n\n`
      }
      
      if (data.softSkills.length > 0) {
        content += `Habilidades Interpersonales:\n`
        content += `${data.softSkills.join(' • ')}\n\n`
      }
    }

    // Experience
    if (data.experience.length > 0) {
      content += `EXPERIENCIA PROFESIONAL\n`
      content += `${'-'.repeat(24)}\n`
      
      data.experience.forEach(exp => {
        content += `${exp.position}\n`
        content += `${exp.company} | ${exp.period}\n`
        
        if (exp.achievements.length > 0) {
          exp.achievements.forEach(achievement => {
            content += `• ${achievement}\n`
          })
        }
        
        if (exp.keywords.length > 0) {
          content += `Competencias: ${exp.keywords.join(' • ')}\n`
        }
        
        content += '\n'
      })
    }

    // Education
    if (data.education.length > 0) {
      content += `FORMACIÓN ACADÉMICA\n`
      content += `${'-'.repeat(19)}\n`
      
      data.education.forEach(edu => {
        content += `${edu.degree}\n`
        content += `${edu.institution} | ${edu.period}\n`
        if (edu.details) content += `${edu.details}\n`
        if (edu.gpa) content += `GPA: ${edu.gpa}\n`
        content += '\n'
      })
    }

    // Projects
    if (data.projects.length > 0) {
      content += `PROYECTOS DESTACADOS\n`
      content += `${'-'.repeat(20)}\n`
      
      data.projects.forEach(project => {
        content += `${project.name}\n`
        content += `${project.description}\n`
        if (project.technologies.length > 0) {
          content += `Tecnologías: ${project.technologies.join(' • ')}\n`
        }
        if (project.link) content += `Enlace: ${project.link}\n`
        content += '\n'
      })
    }

    // Certifications
    if (data.certifications.length > 0) {
      content += `CERTIFICACIONES\n`
      content += `${'-'.repeat(15)}\n`
      data.certifications.forEach(cert => {
        content += `• ${cert}\n`
      })
      content += '\n'
    }

    // Languages
    if (data.languages.length > 0) {
      content += `IDIOMAS\n`
      content += `${'-'.repeat(7)}\n`
      data.languages.forEach(lang => {
        content += `${lang.language}: ${lang.level}\n`
      })
      content += '\n'
    }

    // Interests
    if (data.interests.length > 0) {
      content += `INTERESES\n`
      content += `${'-'.repeat(9)}\n`
      content += `${data.interests.join(' • ')}\n`
    }

    return content
  }
}

export default CVExporter
