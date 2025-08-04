"use client"

import { useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

import SocialMediaInspiredTemplate from "./templates/social-media-inspired-template"
import ATSTemplate from "./templates/ats-template"
import CorporateTemplate from "./templates/corporate-template"
import CreativeTemplate from "./templates/creative-template"
import MinimalTemplate from "./templates/minimal-template"
import type { CurriculumData } from "./curriculum-editor" // Import type from editor

interface CurriculumPreviewProps {
  data: CurriculumData
  selectedTemplate: string
  selectedTheme: string
  isDarkMode: boolean
  customBackgroundColor: string
  customTextColor: string
  customTagPrimaryColor: string
  customTagSecondaryColor: string
  profilePhotoBackgroundColor?: string
  onSectionClick: (sectionId: string) => void
  onDownloadStart: () => void
  onDownloadEnd: () => void
  isDownloading: boolean
}

export default function CurriculumPreview({
  data,
  selectedTemplate,
  selectedTheme,
  isDarkMode,
  customBackgroundColor,
  customTextColor,
  customTagPrimaryColor,
  customTagSecondaryColor,
  profilePhotoBackgroundColor,
  onSectionClick,
  onDownloadStart,
  onDownloadEnd,
  isDownloading,
}: CurriculumPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  const handleDownloadPdf = async () => {
    if (previewRef.current) {
      onDownloadStart()
      try {
        const canvas = await html2canvas(previewRef.current, {
          scale: 2, // Increase scale for better quality
          useCORS: true, // Enable CORS for images if any
          logging: true,
        })
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF("p", "mm", "a4") // Portrait, millimeters, A4 size
        const imgWidth = 210 // A4 width in mm
        const pageHeight = 297 // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        let heightLeft = imgHeight
        let position = 0

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }

        pdf.save(`${data.personalInfo.name || "curriculum"}.pdf`)
      } catch (error) {
        console.error("Error generating PDF:", error)
        alert("Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.")
      } finally {
        onDownloadEnd()
      }
    }
  }

  const templateProps = {
    data,
    selectedTheme,
    isDarkMode,
    customBackgroundColor,
    customTextColor,
    customTagPrimaryColor,
    customTagSecondaryColor,
    profilePhotoBackgroundColor,
    onSectionClick,
    previewRef, // Pass the ref to the selected template
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button onClick={handleDownloadPdf} disabled={isDownloading}>
          {isDownloading ? (
            "Descargando..."
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" /> Descargar PDF
            </>
          )}
        </Button>
      </div>
      {/* The actual template rendering will happen inside this div, which is referenced by previewRef */}
      {(() => {
        switch (selectedTemplate) {
          case "socialMedia":
            return <SocialMediaInspiredTemplate {...templateProps} />
          case "ats":
            return <ATSTemplate {...templateProps} />
          case "corporate":
            return <CorporateTemplate {...templateProps} />
          case "creative":
            return <CreativeTemplate {...templateProps} />
          case "minimal":
            return <MinimalTemplate {...templateProps} />
          default:
            return <SocialMediaInspiredTemplate {...templateProps} />
        }
      })()}
    </div>
  )
}
