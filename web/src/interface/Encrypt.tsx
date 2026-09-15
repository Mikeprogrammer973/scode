import { useState } from "react"
import valid_pattern from "../util/encrypt/verify_pattern"
import encrypt_msg from "../util/encrypt/encrypt_msg"
import { PdfContent } from "../util/out/PdfContent"
import { Container } from "../util/components/ui/container"
import { Callout } from "../util/components/ui/callout"
import { Code } from "../util/components/ui/code"
import { version } from "../util/global";

import { encode, format_str } from "@zyther/scode-core"

type EncryptResult =
  | { status: "success"; msg: string; crypted: string; config: string }
  | { status: "empty" }
  | { status: "invalid" }
  | { status: "error"; message: string }

export default function Encrypt() {
  const [txt, setTxt] = useState("")
  const [pattern, setPattern] = useState("")
  const [result, setResult] = useState<EncryptResult | null>(null)

  function generateCrypt() {
    if (!txt.trim()) {
      setResult({ status: "empty" })
      return
    }
    if (!valid_pattern(pattern)) {
      setResult({ status: "invalid" })
      return
    }
    try {
      const encode = encrypt_msg(pattern, format_str(txt))
      if (encode.crypted_msg === "error") {
        setResult({ status: "error", message: "Could not encrypt the message." })
        return
      }
      setResult({
        status: "success",
        msg: encode.msg,
        crypted: encode.crypted_msg,
        config: encode.decrypt_config as string,
      })
    } catch (e) {
      setResult({
        status: "error",
        message: e instanceof Error ? e.message : "Unexpected error.",
      })
    }
  }

  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-[#0a0a0a]">
      {/* grid de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-lime-300/20 via-transparent to-transparent blur-3xl sm:h-[500px] sm:w-[700px] dark:from-lime-400/[0.07]"
      />

      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
              <span>Encrypt · v{version}</span>
            </div>
            <h1 className="text-4xl text-gray-800 dark:text-gray-100 font-semibold leading-[0.95] tracking-tighter sm:text-5xl">
              Encrypt a message
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Write your message, define a cipher pattern, and get an encoded
              result with the configuration needed to decode it later.
            </p>
          </header>

          {/* form */}
          <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 backdrop-blur-sm sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.02]">
            {/* msg */}
            <div className="mb-8">
              <label
                htmlFor="msg"
                className="font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-500"
              >
                Your message
              </label>
              <textarea
                id="msg"
                rows={8}
                value={txt}
                onChange={(e) => setTxt(e.target.value)}
                placeholder="Type your message here…"
                className="mt-3 block w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-lime-400"
              />
            </div>

            {/* ptern */}
            <div className="mb-8">
              <label
                htmlFor="pattern"
                className="font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-500"
              >
                Cipher pattern
              </label>
              <input
                id="pattern"
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="e.g. ¬ or &§ or °|#"
                className="mt-3 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-mono text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-lime-400"
              />
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                Combine symbols from the{" "}
                <a
                  href="/documentation#pattern"
                  className="underline decoration-dotted underline-offset-2 hover:text-gray-900 dark:hover:text-white"
                >
                  pattern reference
                </a>
                .
              </p>
            </div>

            <button
              type="button"
              onClick={generateCrypt}
              disabled={!txt.trim() || !pattern.trim()}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300"
            >
              Encrypt message
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>

          {/* res */}
          {result && (
            <div className="mt-10">
              {result.status === "empty" && (
                <Callout variant="warning" title="Empty message">
                  <p className="text-yellow-600 dark:text-yellow-400">Your message shouldn't be empty.</p>
                </Callout>
              )}

              {result.status === "invalid" && (
                <Callout variant="warning" title="Invalid pattern">
                  <p className="text-gray-800 dark:text-gray-100">
                      <span className="text-red-600 dark:text-red-400">The cipher pattern isn't valid. Check the{" "}</span>
                      <a
                        href="/documentation#pattern"
                        className="underline text-gray-600 dark:text-gray-400 decoration-dotted underline-offset-2"
                      >
                        pattern reference
                      </a>
                      .
                  </p>
                </Callout>
              )}

              {result.status === "error" && (
                <Callout variant="warning" title="Encryption failed">
                  <p className="text-red-600 dark:text-red-400">{result.message}</p>
                </Callout>
              )}

              {result.status === "success" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-lime-300/60 bg-lime-50/60 p-6 dark:border-lime-400/20 dark:bg-lime-400/[0.05]">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-lime-700 dark:text-lime-400">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
                      Encrypted successfully
                    </div>
                    <pre className="mt-4 overflow-x-auto rounded-lg border border-lime-300/40 bg-white/60 p-4 font-mono text-sm text-gray-900 dark:border-lime-400/20 dark:bg-black/20 dark:text-gray-100">
                      {result.crypted}
                    </pre>
                    <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-500">
                      Pattern <Code>{pattern}</Code>
                    </div>
                  </div>

                  {/* PDF / download */}
                  <PdfContent
                    original_msg={result.msg}
                    encrypt_msg={result.crypted}
                    decryp_config={{
                      pattern,
                      params: result.config,
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}