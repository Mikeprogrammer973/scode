import { Link } from "react-router-dom"
import { routes, version } from "../util/global"
import { Container } from "../util/components/ui/container"
import { Card } from "../util/components/ui/card"

type Highlight = {
  title: string
  description: string
  tag: string,
  info_url: string
}

const HIGHLIGHTS: Highlight[] = [
  {
    tag: "WWII cipher",
    info_url: "https://en.wikipedia.org/wiki/Enigma_machine",
    title: "Enigma machine",
    description:
      "Cipher device developed and used in the early- to mid-20th century to protect commercial, diplomatic, and military communication.",
  },
  {
    tag: "Two-symbol system",
    info_url: "https://en.wikipedia.org/wiki/Binary_code",
    title: "Binary code",
    description:
      'A binary code represents text, computer processor instructions, or any other data using a two-symbol system — often "0" and "1".',
  },
  {
    tag: "Ancient Greece",
    info_url: "https://en.wikipedia.org/wiki/Polybius_square",
    title: "Polybius square",
    description:
      "A cipher device invented by the ancient Greeks Cleoxenus and Democleitus, and made famous by the historian and scholar Polybius.",
  },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white text-gray-900 dark:bg-[#0a0a0a] dark:text-white">
      {/* bg grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* glow rdl no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-lime-300/30 via-violet-400/20 to-transparent blur-3xl dark:from-lime-400/10 dark:via-violet-500/10"
      />

      {/* banner */}
      <section className="relative">
        <Container className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-24 md:py-32">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
            <span>Hand-coding tools · v{version}</span>
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            Transform
            <br />
            your messages{" "}
            <span className="bg-gradient-to-r from-lime-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent dark:from-lime-400 dark:via-emerald-400 dark:to-violet-400">
              by hand.
            </span>
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Encode and decode with classic ciphers. Built for cryptography
            enthusiasts, learners, and anyone curious about how secrets were
            kept before computers.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to={routes.encrypt}
              className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-gray-700 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300"
            >
              Start encrypting
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              to={routes.doc}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-white/15 dark:text-gray-300 dark:hover:border-lime-400 dark:hover:text-lime-400"
            >
              Read the docs
            </Link>
          </div>

          {/* stats */}
          <div className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-gray-200 pt-8 dark:border-white/10">
            {[
              { k: "10+", v: "Ciphers available" },
              { k: "∞", v: "Messages to crack" },
              { k: "0", v: "Data leaves your browser" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-mono text-2xl font-medium text-gray-900 dark:text-white">
                  {s.k}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="about" className="relative border-t border-gray-200 dark:border-white/10">
        <Container className="py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                01 / About
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl leading-snug tracking-tight text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                SCode offers <em className="font-serif italic text-gray-500 dark:text-gray-400">simple</em> and
                effective tools for encoding and decoding messages using manual
                methods. Ideal for cryptography enthusiasts and anyone who wants
                to learn more about different coding methods.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="highlights" className="relative border-t border-gray-200 dark:border-white/10">
        <Container className="py-24 md:py-32">
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                02 / Highlights
              </div>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
                The ciphers that
                <br />
                shaped history.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {HIGHLIGHTS.map((item, i) => (
              <Card key={item.title} index={i}>
                <div className="font-mono text-xs uppercase tracking-widest text-lime-600 dark:text-lime-400">
                  {item.tag}
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                <Link to={item.info_url} target="_blank" rel="noopener noreferrer" className="mt-8 cursor-pointer flex items-center gap-2 text-xs font-medium text-gray-400 transition-colors group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-lime-400">
                  Explore
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-t border-gray-200 dark:border-white/10">
        <Container className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
              Ready to hide something?
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              No sign-up. No tracking. Just you, a message, and a cipher.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={routes.encrypt}
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-gray-700 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300"
              >
                Encrypt a message
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}