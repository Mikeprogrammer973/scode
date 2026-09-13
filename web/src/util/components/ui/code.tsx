import type { ReactNode } from "react"

type CodeProps = { children: ReactNode }

export function Code({ children }: CodeProps) {
  return (
    <code className="rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[0.85em] text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
      {children}
    </code>
  )
}