import type { ReactNode } from "react"

type SectionProps = {
  id: string
  title: string
  kicker?: string
  children: ReactNode
}

export function Section({ id, title, kicker, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-gray-200/80 py-16 first:border-t-0 first:pt-0 dark:border-white/[0.06]"
    >
      <div className="mb-10 flex items-baseline gap-4">
        {kicker && (
          <span className="font-mono text-xs uppercase tracking-widest text-lime-600 dark:text-lime-400">
            {kicker}
          </span>
        )}
        <h2 className="text-2xl mb-4 font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          {title}
        </h2>
      </div>
      <div className="space-y-10">{children}</div>
    </section>
  )
}

type SubSectionProps = {
  title: string
  children: ReactNode
}

export function SubSection({ title, children }: SubSectionProps) {
  return (
    <div className="group/sub">
      <h3 className="text-base mt-3 font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h3>
      <div className="mt-2 mb-6 py-2 space-y-4 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </div>
  )
}