import { useRef, useState } from "react"
import { logo } from "../global/logo"
import { generatePdfFromElement } from "./generate_pdf"
import { generateWordDocument, type DecryptDocContent } from "./generate_word"
import { generateTxtFile } from "./generate_txt"

type PdfContentProps = {
  original_msg: string
  encrypt_msg: string
  decryp_config: {
    pattern: string
    params: string
  }
}

type DownloadKind = "pdf" | "word" | "txt"

export function PdfContent({
  original_msg,
  encrypt_msg,
  decryp_config,
}: PdfContentProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState<DownloadKind | null>(null)
  const [error, setError] = useState<string | null>(null)

  const docContent: DecryptDocContent = {
    originalMsg: original_msg,
    encryptedMsg: encrypt_msg,
    config: decryp_config,
  }

  async function handleDownload(kind: DownloadKind) {
    setBusy(kind)
    setError(null)
    try {
      if (kind === "pdf") {
        if (!previewRef.current) throw new Error("Preview not ready.")
        await generatePdfFromElement(previewRef.current)
      } else if (kind === "word") {
        await generateWordDocument(docContent)
      } else {
        generateTxtFile(docContent)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed.")
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* prv do documento */}
      <div
        ref={previewRef}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.02]"
      >
        {/* hder */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SCode" className="h-6 w-auto" />
            <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
              /scode
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Decode config
          </span>
        </div>

        {/* body */}
        <div className="space-y-6 p-6 sm:p-8">
          <Field label="Original message" value={original_msg} />
          <Field label="Encrypted message" value={encrypt_msg} />

          <div className="space-y-4 border-t border-gray-200 pt-6 dark:border-white/[0.08]">
            <div className="font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Decode configuration
            </div>
            <Field label="Pattern" value={decryp_config.pattern} mono />
            <Field label="Parameters" value={decryp_config.params} mono />
          </div>
        </div>

        {/* fter */}
        <div className="border-t border-gray-200 px-6 py-4 dark:border-white/[0.08]">
          <p className="font-mono text-[10px] text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} SCode · All rights reserved
          </p>
        </div>
      </div>

      {/* baixar */}
      <div>
        <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-500">
          Download the decode configuration
        </div>
        <div className="flex flex-wrap gap-2">
          <DownloadButton
            label="PDF"
            onClick={() => handleDownload("pdf")}
            loading={busy === "pdf"}
          />
          <DownloadButton
            label="Word"
            onClick={() => handleDownload("word")}
            loading={busy === "word"}
          />
          <DownloadButton
            label="TXT"
            onClick={() => handleDownload("txt")}
            loading={busy === "txt"}
          />
        </div>

        {error && (
          <p className="mt-3 font-mono text-xs text-amber-600 dark:text-amber-400">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

// utils

function Field({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {label}
      </div>
      <pre
        className={`overflow-x-auto whitespace-pre-wrap break-all rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-800 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-gray-200 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value || "—"}
      </pre>
    </div>
  )
}

function DownloadButton({
  label,
  onClick,
  loading,
}: {
  label: string
  onClick: () => void
  loading: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 disabled:cursor-wait disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-gray-300 dark:hover:border-lime-400 dark:hover:text-lime-400"
    >
      {loading ? (
        <>
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime-500 dark:bg-lime-400" />
          Generating…
        </>
      ) : (
        <>
          {label}
          <span className="transition-transform group-hover:translate-y-0.5">↓</span>
        </>
      )}
    </button>
  )
}