import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export async function generatePdfFromElement(
  element: HTMLElement,
  filename = "scode_decrypt_config.pdf"
): Promise<void> {
  const canvas = await html2canvas(element, { scale: 2 })

  const pdf = new jsPDF("l", "mm", "a4")
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  const scaleFactor = pdfWidth / canvasWidth

  let yOffset = 0

  while (yOffset < canvasHeight) {
    const sectionHeight = pdfHeight / scaleFactor
    const section = canvas
      .getContext("2d")!
      .getImageData(0, yOffset, canvasWidth, sectionHeight)

    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = canvasWidth
    tempCanvas.height = sectionHeight
    const tempCtx = tempCanvas.getContext("2d")!
    tempCtx.putImageData(section, 0, 0)

    const sectionImage = tempCanvas.toDataURL("image/png")
    pdf.addImage(sectionImage, "PNG", 0, 0, pdfWidth, pdfHeight)

    yOffset += sectionHeight
    if (yOffset < canvasHeight) pdf.addPage()
  }

  pdf.save(filename)
}