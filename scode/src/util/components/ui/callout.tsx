import type { ReactNode } from "react"

type CalloutProps = {
  title?: string
  children: ReactNode
  variant?: "warning" | "info"
}

export function Callout({ title, children, variant = "info" }: CalloutProps) {
  const styles =
    variant === "warning"
      ? "border-amber-300/60 bg-amber-50 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/[0.06] dark:text-amber-200"
      : "border-gray-200 bg-gray-50 text-gray-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300"

  return (
    <div className={`rounded-xl border px-5 py-4 ${styles}`}>
      {title && (
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-900 dark:text-gray-50">
          {title}
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}