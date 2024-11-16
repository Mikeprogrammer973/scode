import generatePDF, { Options, Resolution, Margin } from "react-to-pdf";
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
                            <p className="text-gray-600 bg-gray-100 p-4 rounded">
                                {content.original_msg}
                            </p>
                        </section>
                        {/* Encrypted Message */}
                        <section className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Encrypted Message
                            </h2>
                            <p className="text-gray-600 bg-gray-100 p-4 rounded">
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
                                <p className="text-gray-600 bg-gray-100 p-4 rounded">
                                    {content.decryp_config.pattern}
                                </p>
                            </div>
                            {/* Subseção: Parameters */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-600 mb-2">
                                    Parameters
                                </h3>
                                <p className="text-gray-600 bg-gray-100 p-4 rounded">
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

            <button
                onClick={generatePDF_}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Download PDF
            </button>
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

   // Altura da imagem no PDF após escala
   const scaledHeight = canvasHeight * scaleFactor;

   let yOffset = 0; // Posição inicial no PDF

   while (yOffset < canvasHeight) {
     const section = canvas
       .getContext("2d")!
       .getImageData(0, yOffset, canvasWidth, pdfHeight / scaleFactor);

     const tempCanvas = document.createElement("canvas");
     tempCanvas.width = canvasWidth;
     tempCanvas.height = pdfHeight / scaleFactor;
     const tempCtx = tempCanvas.getContext("2d")!;
     tempCtx.putImageData(section, 0, 0);

     const sectionImage = tempCanvas.toDataURL("image/png");

     pdf.addImage(sectionImage, "PNG", 0, 0, pdfWidth, pdfHeight);

     yOffset += pdfHeight / scaleFactor;

     if (yOffset < canvasHeight) pdf.addPage();
   }

    pdf.save("scode_decrypt_config.pdf");
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
  }
};
