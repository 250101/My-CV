import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { CurriculumData } from './types'

class CVExporter {
  /**
   * Genera un PDF de alta calidad desde el DOM renderizado
   * @param element - El elemento DOM del CV a exportar
   * @param filename - Nombre del archivo
   */
  static async exportToPDF(element: HTMLElement, filename: string): Promise<void> {
    try {
      console.log('Iniciando generación de PDF...')
      
      // Configuración de html2canvas para alta calidad
      const canvas = await html2canvas(element, {
        scale: 2, // Doble resolución para mejor calidad
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        // Configuración para manejar estilos complejos
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-preview="true"]') as HTMLElement
          if (clonedElement) {
            // Aplicar estilos adicionales para mejor renderizado
            clonedElement.style.transform = 'none'
            clonedElement.style.position = 'relative'
            clonedElement.style.width = '100%'
            clonedElement.style.height = 'auto'
            
            // Asegurar que todos los elementos sean visibles
            const allElements = clonedElement.querySelectorAll('*')
            allElements.forEach((el) => {
              const element = el as HTMLElement
              element.style.visibility = 'visible'
              element.style.display = element.style.display === 'none' ? 'block' : element.style.display
            })
          }
        }
      })

      // Calcular dimensiones del PDF (A4)
      const imgWidth = 210 // mm
      const pageHeight = 297 // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      // Crear PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0

      // Agregar primera página
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Agregar páginas adicionales si es necesario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Descargar el PDF
      pdf.save(`${filename}.pdf`)
      
      console.log('PDF generado exitosamente')
    } catch (error) {
      console.error('Error en exportToPDF:', error)
      throw new Error('Error al generar el PDF. Por favor, inténtalo de nuevo.')
    }
  }

  /**
   * Genera contenido de texto plano para exportación
   * @param data - Datos del CV
   * @param filename - Nombre del archivo
   */
  static exportToTXT(data: CurriculumData, filename: string): void {
    try {
      console.log('Iniciando exportación TXT...')
      
      let content = `${data.personalInfo.name.toUpperCase()}\n`
      content += `${data.personalInfo.title}\n\n`
      
      // Información de contacto
      content += `INFORMACIÓN DE CONTACTO:\n`
      if (data.personalInfo.email) content += `Email: ${data.personalInfo.email}\n`
      if (data.personalInfo.phone) content += `Teléfono: ${data.personalInfo.phone}\n`
      if (data.personalInfo.location) content += `Ubicación: ${data.personalInfo.location}\n`
      if (data.personalInfo.linkedin) content += `LinkedIn: ${data.personalInfo.linkedin}\n`
      if (data.personalInfo.github) content += `GitHub: ${data.personalInfo.github}\n`
      content += '\n'

      // Resumen
      if (data.summary) {
        content += `RESUMEN PROFESIONAL:\n${data.summary}\n\n`
      }

      // Experiencia
      if (data.experience.length > 0) {
        content += `EXPERIENCIA LABORAL:\n`
        data.experience.forEach(exp => {
          content += `${exp.position}\n`
          content += `${exp.company} | ${exp.period}\n`
          if (exp.achievements.length > 0) {
            exp.achievements.forEach(achievement => {
              content += `• ${achievement}\n`
            })
          }
          content += '\n'
        })
      }

      // Educación
      if (data.education.length > 0) {
        content += `FORMACIÓN ACADÉMICA:\n`
        data.education.forEach(edu => {
          content += `${edu.degree}\n`
          content += `${edu.institution} | ${edu.period}\n`
          if (edu.details) content += `${edu.details}\n`
          if (edu.gpa) content += `GPA: ${edu.gpa}\n`
          content += '\n'
        })
      }

      // Habilidades
      if (data.technicalSkills.length > 0 || data.softSkills.length > 0) {
        content += `COMPETENCIAS:\n`
        if (data.technicalSkills.length > 0) {
          content += `Técnicas: ${data.technicalSkills.join(', ')}\n`
        }
        if (data.softSkills.length > 0) {
          content += `Interpersonales: ${data.softSkills.join(', ')}\n`
        }
        content += '\n'
      }

      // Proyectos
      if (data.projects.length > 0) {
        content += `PROYECTOS DESTACADOS:\n`
        data.projects.forEach(project => {
          content += `${project.name}\n`
          if (project.description) content += `${project.description}\n`
          if (project.technologies.length > 0) {
            content += `Tecnologías: ${project.technologies.join(', ')}\n`
          }
          if (project.link) content += `Enlace: ${project.link}\n`
          content += '\n'
        })
      }

      // Certificaciones
      if (data.certifications.length > 0) {
        content += `CERTIFICACIONES:\n`
        data.certifications.forEach(cert => {
          content += `• ${cert}\n`
        })
        content += '\n'
      }

      // Idiomas
      if (data.languages.length > 0) {
        content += `IDIOMAS:\n`
        data.languages.forEach(lang => {
          content += `${lang.language}: ${lang.level}\n`
        })
        content += '\n'
      }

      // Intereses
      if (data.interests.length > 0) {
        content += `INTERESES:\n${data.interests.join(', ')}\n`
      }

      // Crear y descargar archivo
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.txt`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      console.log('TXT exportado exitosamente')
    } catch (error) {
      console.error('Error en exportToTXT:', error)
      throw new Error('Error al generar el archivo de texto. Por favor, inténtalo de nuevo.')
    }
  }
}

export default CVExporter
