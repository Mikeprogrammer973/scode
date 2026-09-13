import { Link, useNavigate } from "react-router-dom"
import { routes } from "../util/global"
import { Container } from "../util/components/ui/container"

const QUICK_LINKS = [
  { label: "Documentation", route: routes.doc },
  { label: "Encrypt",       route: routes.encrypt },
  { label: "Decrypt",       route: routes.decrypt },
]

export default function Unfound() {
  const navigate = useNavigate()

  return (
    <div className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-white dark:bg-[#0a0a0a]">
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
      {/* glow central */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-lime-300/20 via-transparent to-transparent blur-3xl sm:h-[600px] sm:w-[800px] dark:from-lime-400/[0.08]"
      />

      <Container className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
            <span>Error 404</span>
          </div>

          <h1 className="text-7xl font-semibold leading-[0.9] tracking-tighter sm:text-8xl md:text-9xl">
            <span className="bg-gradient-to-br from-gray-900 to-gray-400 bg-clip-text text-transparent dark:from-white dark:to-gray-600">
              404
            </span>
          </h1>

          <h2 className="mt-8 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Page not found
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find the page you're looking for. It may have
            been moved, renamed, or never existed.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-gray-700 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              Go back
            </button>
            <Link
              to={routes.home}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-white/15 dark:text-gray-300 dark:hover:border-lime-400 dark:hover:text-lime-400"
            >
              Go home
            </Link>
          </div>

          <div className="mt-16 border-t border-gray-200 pt-8 dark:border-white/10">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Or jump to
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.route}
                  to={link.route}
                  className="rounded-full border border-gray-200 px-4 py-1.5 text-xs text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-white/[0.08] dark:text-gray-400 dark:hover:border-lime-400 dark:hover:text-lime-400"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="mailto:technopro.net@gmail.com"
                className="rounded-full border border-gray-200 px-4 py-1.5 text-xs text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-white/[0.08] dark:text-gray-400 dark:hover:border-lime-400 dark:hover:text-lime-400"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}