import { useMemo } from "react"
import { Container } from "../util/components/ui/container"
import { Section, SubSection } from "../util/components/ui/section"
import { DocsSidebar } from "../util/components/ui/sidebar"
import { DataTable } from "../util/components/ui/data-table"
import { Callout } from "../util/components/ui/callout"
import { Code } from "../util/components/ui/code"
import { version } from "../util/global";

import { allGlobalSymbols, allSymbols, allNames } from "@zyther/scode-core"

type Example = { explanation: string; pattern: string }

const EXAMPLES: Example[] = [
  { explanation: "Encodes the message in Morse code", pattern: "¬" },
  { explanation: "Encodes the message using the SCEnigma type", pattern: "?" },
  {
    explanation:
      "First, encode with MutationTemplate.reciprocity, then encode the previous result with SCFrama",
    pattern: "&§",
  },
  {
    explanation: "Encode with OrderTemplate.random, then SCVigenère, then SCPolybe",
    pattern: "°|#",
  },
]

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "ciphers", label: "Ciphers" },
  { id: "templates", label: "Templates" },
  { id: "pattern", label: "Pattern" },
  { id: "decrypt", label: "Decrypt" },
]

export default function Documentation() {
  const { symbols, names, globalSymbols } = useMemo(() => {
    const all = allSymbols()
    return {
      symbols: all,
      names: allNames(),
      globalSymbols: allGlobalSymbols(),
    }
  }, [])

  const symbolRows = symbols.map((sym, i) => ({
    name: names[i],
    symbol: sym,
  }))

  const restrictedRows = symbolRows.filter(
    (r) => globalSymbols.indexOf(r.symbol) === -1
  )

  return (
    <div className="relative bg-white dark:bg-[#0a0a0a]">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <DocsSidebar items={NAV} />

          <div className="min-w-0">
            <header className="mb-16">
              <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
                <span>Manual · v{version}</span>
              </div>
              <h1 className="text-4xl text-black/80 dark:text-white/80 font-semibold leading-[0.95] tracking-tighter sm:text-5xl md:text-6xl">
                Documentation
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                Everything you need to understand SCode's encoders, decoders,
                and pattern system.
              </p>
            </header>

            {/* OVERVIEW */}
            <Section id="overview" title="Overview" kicker="01 / Start here">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                SCode is a platform dedicated to converting messages using
                different types of manual coding. It's designed for those who
                want to transform messages into traditional, easy-to-understand
                codes — ensuring safe and fun communication.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Message encoding",
                    body: "Convert messages into manual codes like Morse. Encode so they're readable only to those who know the cipher.",
                  },
                  {
                    title: "Message decoding",
                    body: "Decrypt encoded messages back to their original format. Paste the pattern and go.",
                  },
                  {
                    title: "Intuitive interface",
                    body: "With a few clicks, turn text into code and vice versa. No setup, no accounts.",
                  },
                  {
                    title: "Manual codings",
                    body: "Support for different types of manual coding — ideal for enthusiasts of traditional encryption.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl border border-gray-200 bg-white/60 p-5 transition-colors hover:border-gray-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {f.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>

              <SubSection title="Technologies used">
                <p>
                  <strong>React.js.</strong> Provides a dynamic and responsive
                  user experience.
                </p>
                <p>
                  <strong>Conversion algorithms.</strong> Efficient algorithms
                  convert messages into manual codes and decode them back.
                </p>
              </SubSection>
            </Section>

            {/* CIPHERS */}
            <Section id="ciphers" title="Ciphers" kicker="02 / Encoders">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                SCode offers multiple encoding modes that can be used
                independently or — better yet — combined.
              </p>

              <SubSection title="SCSimply">
                <p>
                  Encodes messages at three different levels depending on the
                  chosen coding level.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    <Code>key</Code>: uppercase A–Z (ASCII 65–90).
                  </li>
                  <li>
                    <Code>key_m</Code>: alternates A→Z and Z→A.
                  </li>
                  <li>
                    <Code>a_num</Code>: represents each letter by a number
                    (A=1, B=2, …).
                  </li>
                </ul>
              </SubSection>

              <SubSection title="SCMorse">
                <p>
                  Encodes messages in Morse code via <Code>initSymbols</Code>{" "}
                  during instantiation. Example: "A" → <Code>.-</Code>, "B" →{" "}
                  <Code>-...</Code>.
                </p>
              </SubSection>

              <SubSection title="SCBacon">
                <p>
                  Uses sequences of five A/B letters. Example: A ={" "}
                  <Code>AABAA</Code>, B = <Code>AABAB</Code>, C ={" "}
                  <Code>AABBA</Code>.
                </p>
              </SubSection>

              <SubSection title="SCBinary">
                <p>
                  Represents information as sequences of eight binary digits.
                  Example: "A" = <Code>01000001</Code>.
                </p>
              </SubSection>

              <SubSection title="SCFrama">
                <p>
                  Replaces letters with special symbols (e.g. ⁂, ⁋, ₹). Each
                  letter of a keyword is mapped to a symbol from a predefined
                  list.
                </p>
              </SubSection>

              <SubSection title="SCNavajo">
                <p>
                  Uses Navajo words (e.g. "Wol-la-chee", "Shush", "Moasi") as
                  encoding symbols. No transformation — just a symbol table.
                </p>
              </SubSection>

              <SubSection title="SCPolybe">
                <p>Encodes and decodes using a Polybius grid.</p>
                <p>
                  <strong>Encode:</strong>
                </p>
                <ol className="list-decimal space-y-1 pl-5">
                  <li>Generate a random grid from a scrambled alphabet.</li>
                  <li>
                    For each character, find its position and replace it with a
                    row/column pair.
                  </li>
                  <li>Return the encoded message and the scrambled sequence used.</li>
                </ol>
                <p>
                  <strong>Decode:</strong>
                </p>
                <ol className="list-decimal space-y-1 pl-5">
                  <li>Rebuild the same grid from the scrambled sequence.</li>
                  <li>For each number pair, look up the corresponding letter.</li>
                  <li>Return the decoded message.</li>
                </ol>
              </SubSection>

              <SubSection title="SCVigenère">
                <p>
                  Implements the Vigenère cipher. On creation, receives{" "}
                  <Code>key</Code> (random) and <Code>msg</Code>. The key is
                  repeated to match the message length.
                </p>
                <p>
                  <strong>Encode:</strong> shifts each letter by the
                  corresponding key position.
                </p>
                <p>
                  <strong>Decode:</strong> the inverse operation.
                </p>
              </SubSection>

              <SubSection title="SCEnigma">
                <p>
                  A modern implementation of the WWII Enigma machine,
                  simulating rotors, reflector, and plugboard.
                </p>
                <p>
                  <strong>Components:</strong>
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    <strong>Rotors (SCECRotor):</strong> letter substitution
                    per an internal configuration.
                  </li>
                  <li>
                    <strong>Reflector (SCECReflector):</strong> redirects the
                    signal back, allowing symmetric ciphering.
                  </li>
                  <li>
                    <strong>Plugboard (SCECPlugboard):</strong> swaps letter
                    pairs before/after the rotor path.
                  </li>
                </ul>
                <p>
                  <strong>How it works:</strong>
                </p>
                <ol className="list-decimal space-y-1 pl-5">
                  <li>
                    Letter passes through the plugboard, then converts to a
                    number (A=0, B=1, …).
                  </li>
                  <li>
                    Number passes through the rotors left→right, then through
                    the reflector, then right→left.
                  </li>
                  <li>
                    Number converts back to a letter, then through the
                    plugboard again.
                  </li>
                  <li>
                    The first rotor advances per letter; when it reaches a
                    position, it advances the next, like an odometer.
                  </li>
                </ol>
              </SubSection>
            </Section>

            {/* TEMPLATES */}
            <Section id="templates" title="Templates" kicker="03 / Transforms">
              <SubSection title="MutationTemplate">
                <p>
                  Two ways to transform messages: reciprocity and decalation.
                </p>
                <p>
                  <strong>Reciprocity.</strong> Replaces each letter with its
                  opposite in the alphabet (A↔Z, B↔Y, …). Example: "HELLO" →{" "}
                  <Code>SVOOL</Code>.
                </p>
                <p>
                  <strong>Decalation.</strong> Shifts letters by a random
                  number (1–24). Example: "HELLO" with shift 3 →{" "}
                  <Code>KHOOR</Code>.
                </p>
              </SubSection>

              <SubSection title="OrderTemplate">
                <p>Two methods for reordering: reverse and random shuffle.</p>
                <p>
                  <strong>Reverse.</strong> Reverses character order. Example:
                  "HELLO" → <Code>OLLEH</Code>.
                </p>
                <p>
                  <strong>Random.</strong> Replaces each character with one
                  from a scrambled alphabet. Example: with alphabet{" "}
                  <Code>QWERTYUIOPASDFGHJKLZXCVBNM</Code>, "HELLO" →{" "}
                  <Code>ITSSG</Code>.
                </p>
              </SubSection>
            </Section>

            {/* PATTERN */}
            <Section id="pattern" title="Pattern" kicker="04 / Composition">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                A coding pattern is a combination of one or more symbols, each
                referencing a specific cipher.
              </p>

              <SubSection title="Symbols">
                <DataTable
                  columns={[
                    { header: "Class", accessor: (r) => r.name },
                    {
                      header: "Symbol",
                      accessor: (r) => <Code>{r.symbol}</Code>,
                    },
                  ]}
                  rows={symbolRows}
                  rowKey={(r) => r.name}
                />
              </SubSection>

              <SubSection title="Pattern construction">
                <p>Examples of combining symbols into a pattern:</p>
                <DataTable
                  columns={[
                    { header: "Explanation", accessor: (r) => r.explanation },
                    {
                      header: "Pattern",
                      accessor: (r) => <Code>{r.pattern}</Code>,
                    },
                  ]}
                  rows={EXAMPLES}
                  rowKey={(r, i) => String(i)}
                />
              </SubSection>

              <Callout variant="warning" title="Restricted symbols">
                <p className="text-gray-800 dark:text-gray-100">
                  Some symbols can only appear at the end of a pattern. Placing
                  them in the middle produces an error.
                </p>
                <div className="mt-4">
                  <DataTable
                    columns={[
                      { header: "Class", accessor: (r) => r.name },
                      {
                        header: "Symbol",
                        accessor: (r) => <Code>{r.symbol}</Code>,
                      },
                    ]}
                    rows={restrictedRows}
                    rowKey={(r) => r.name}
                  />
                </div>
              </Callout>
            </Section>

            {/* DECRYPT */}
            <Section id="decrypt" title="Decrypt" kicker="05 / Decoding">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"> 
                Every encoding generated on SCode is followed by a document
                with the settings needed to decode it.
              </p>
              <SubSection title="Tutorial">
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    <strong>Paste the encrypted message</strong> in the first
                    text box.
                  </li>
                  <li>
                    <strong>Paste the configuration parameters</strong> in the
                    second box (leave empty if not needed).
                  </li>
                  <li>
                    <strong>Paste the pattern</strong> (the one used to encode)
                    in the last box, then click "Decrypt message".
                  </li>
                </ol>
              </SubSection>
            </Section>
          </div>
        </div>
      </Container>
    </div>
  )
}