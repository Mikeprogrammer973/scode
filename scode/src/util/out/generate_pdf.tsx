import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, IParagraphOptions } from "docx";
import { saveAs } from "file-saver";
import { logo } from "../global/logo";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PdfContent {
    original_msg: string
    encrypt_msg: string
    decryp_config: {
        pattern: string
        params: string
    }
}

export function PdfContent(content: PdfContent)
{
    return (
        <div className="p-4">
            <div
                id="content-to-pdf"
                className="bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto font-mono"
            >
                {/* Cabeçalho */}
                <header className="flex items-center justify-between py-4 px-2 mb-2 bg-slate-800">
                    <img
                        src={logo} 
                        alt="Secret Code Logo"
                        className="w-8"
                    />
                    <h1 className="text-xl font-light text-gray-400">Secret Code</h1>
                </header>

                {/* Corpo do documento */}
                <div className="p-8">
                    <main>
                        {/* Original Message */}
                        <section className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Original Message
                            </h2>
                            <p className="text-gray-600 bg-gray-100 p-4 rounded break-all">
                                {content.original_msg}
                            </p>
                        </section>
                        {/* Encrypted Message */}
                        <section className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Encrypted Message
                            </h2>
                            <p className="text-gray-600 bg-gray-100 p-4 rounded break-all">
                                {content.encrypt_msg}
                            </p>
                        </section>
                        {/* Decryptage Config */}
                        <section className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Decryptage Config
                            </h2>
                            {/* Subseção: Pattern */}
                            <div className="mb-4">
                                <h3 className="text-lg font-medium text-gray-600 mb-2">Pattern</h3>
                                <p className="text-gray-600 bg-gray-100 p-4 rounded break-all">
                                    {content.decryp_config.pattern}
                                </p>
                            </div>
                            {/* Subseção: Parameters */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-600 mb-2">
                                    Parameters
                                </h3>
                                <p className="text-gray-600 bg-gray-100 p-4 rounded break-all">
                                    {content.decryp_config.params}
                                </p>
                            </div>
                        </section>
                    </main>
                    {/* Rodapé */}
                    <footer className="border-t pt-4 mt-6 text-gray-500 text-sm">
                        <div className="flex gap-5 justify-between">
                            <p>&copy; {new Date().getFullYear()} Secret Code. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <button
                    onClick={generatePDF_}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Download PDF DOC
                </button>
                <button
                    onClick={()=>generateWordDocument(content)}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Download WORD DOC
                </button>
                <button
                    onClick={()=>generateTxtFile(content)}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Download TXT DOC
                </button>
            </div>
        </div>
    )
}

export const generatePDF_ = async (): Promise<void> => {
  const element = document.getElementById("content-to-pdf");

  if (!element) {
    console.error("Elemento não encontrado.");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Aumenta a qualidade do canvas
      useCORS: true, // Para suportar imagens externas
    });

    const pdf = new jsPDF("l", "mm", "a4");
   // Dimensões do PDF
   const pdfWidth = pdf.internal.pageSize.getWidth();
   const pdfHeight = pdf.internal.pageSize.getHeight();

   // Dimensões do Canvas
   const canvasWidth = canvas.width;
   const canvasHeight = canvas.height;

   // Escala para ajustar a largura do canvas à largura do PDF
   const scaleFactor = pdfWidth / canvasWidth;

   let yOffset = 0; // Posição inicial no canvas
   const marginBottom = 0; 
   const marginTop = 0; 

   while (yOffset < canvasHeight) {
     // Fatiar a área visível do canvas
     const sectionHeight = pdfHeight / scaleFactor - marginBottom / scaleFactor;
     const section = canvas
       .getContext("2d")!
       .getImageData(0, yOffset, canvasWidth, sectionHeight);

     // Criar canvas temporário para cada seção
     const tempCanvas = document.createElement("canvas");
     tempCanvas.width = canvasWidth;
     tempCanvas.height = sectionHeight;
     const tempCtx = tempCanvas.getContext("2d")!;
     tempCtx.putImageData(section, 0, 0);

     const sectionImage = tempCanvas.toDataURL("image/png");

     // Adicionar a seção ao PDF
     pdf.addImage(sectionImage, "PNG", 0, marginTop, pdfWidth, pdfHeight - marginBottom);

     yOffset += sectionHeight;

     // Adicionar uma nova página se não estivermos no final
     if (yOffset < canvasHeight) pdf.addPage();
   }


    pdf.save("scode_decrypt_config.pdf");
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
  }
};

export const generateWordDocument = (content: PdfContent) => {
    const doc = new Document({
        sections: [
          {
            children: [
              // Cabeçalho
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Secret Code",
                    bold: true,
                    size: 48, // Maior tamanho para o título
                    color: "0000FF", // Azul para o título
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),
    
              // Corpo: Original Message
              new Paragraph({
                children: [
                    new TextRun({
                        text: "Original Message:",
                        bold: true,
                        size: 24,
                        color: "2B6CB0", // Azul para os subtítulos
                      })
                ]
              }),
              new Paragraph({
                text: content.original_msg,
                size: 20,
                alignment: AlignmentType.LEFT,
                spacing: { after: 300 },
              } as IParagraphOptions),
    
              // Corpo: Encrypted Message
              new Paragraph({
                children: [
                    new TextRun({
                        text: "Encrypted Message:",
                        bold: true,
                        size: 24,
                        color: "2B6CB0", // Azul para os subtítulos
                      })
                ]
              }),
              new Paragraph({
                text: content.encrypt_msg,
                size: 20,
                alignment: AlignmentType.LEFT,
                spacing: { after: 300 },
              } as IParagraphOptions),
    
              // Corpo: Decryptage Config
              new Paragraph({
                children: [
                    new TextRun({
                        text: "Decryptage Config:",
                        bold: true,
                        size: 24,
                        color: "2B6CB0", // Azul para os subtítulos
                      })
                ]
              }),
    
              new Paragraph({
                children: [
                    new TextRun({
                        text: "Pattern",
                        bold: true,
                        size: 20,
                        color: "1A202C", // Cor para os subtítulos internos
                      })
                ]
              }),
              new Paragraph({
                text: content.decryp_config.pattern,
                size: 20,
                alignment: AlignmentType.LEFT,
                spacing: { after: 200 },
              } as IParagraphOptions),
    
              new Paragraph({
                children: [
                    new TextRun({
                        text: "Parameters",
                        bold: true,
                        size: 20,
                        color: "1A202C", // Cor para os subtítulos internos
                      })
                ]
              }),
              new Paragraph({
                text: content.decryp_config.params,
                size: 20,
                alignment: AlignmentType.LEFT,
                spacing: { after: 300 },
              } as IParagraphOptions),
    
              // Rodapé
              new Paragraph({
                children: [
                  new TextRun({
                    text: `© ${new Date().getFullYear()} Secret Code. All rights reserved.`,
                    size: 18,
                    color: "999999", // Cor cinza para o rodapé
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 600 },
              }),
            ],
          },
        ],
      });
    
  
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "scode_decrypt_config.docx");
    });
};

const generateTxtFile = (content_: PdfContent) => {
    const content = `
      Secret Code
      ------------
  
      Original Message:
      ${content_.original_msg}
  
      Encrypted Message:
      ${content_.encrypt_msg}
  
      Decryptage Config:

      - Pattern: 
      ${content_.decryp_config.pattern}

      - Parameters: 
      ${content_.decryp_config.params}

  
      © ${new Date().getFullYear()} Secret Code. All rights reserved.
    `;
  
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    // Criar link para download
    const link = document.createElement("a");
    link.href = url;
    link.download = "scode_decrypt_config.txt";
    link.click();
  
    // Revogar URL após uso
    URL.revokeObjectURL(url);
}
  
