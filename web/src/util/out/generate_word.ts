import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  type IParagraphOptions,
} from "docx"
import { saveAs } from "file-saver"

export type DecryptConfig = {
  pattern: string
  params: string
}

export type DecryptDocContent = {
  originalMsg: string
  encryptedMsg: string
  config: DecryptConfig
}

export async function generateWordDocument(
  content: DecryptDocContent,
  filename = "scode_decrypt_config.docx"
): Promise<void> {
  const heading = (text: string) =>
    new Paragraph({
      children: [
        new TextRun({ text, bold: true, size: 24, color: "0A0A0A" }),
      ],
      spacing: { before: 300, after: 150 },
    })

  const body = (text: string) =>
    new Paragraph({
      text,
      size: 20,
      alignment: AlignmentType.LEFT,
      spacing: { after: 200 },
    } as IParagraphOptions)

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "SCode — Decode configuration",
                bold: true,
                size: 36,
                color: "0A0A0A",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 500 },
          }),

          heading("Original message"),
          body(content.originalMsg),

          heading("Encrypted message"),
          body(content.encryptedMsg),

          heading("Decode configuration"),
          heading("Pattern"),
          body(content.config.pattern),
          heading("Parameters"),
          body(content.config.params),

          new Paragraph({
            children: [
              new TextRun({
                text: `© ${new Date().getFullYear()} SCode. All rights reserved.`,
                size: 18,
                color: "999999",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 600 },
          }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, filename)
}