import type { ReactNode } from "react"

type CardProps = {
  children: ReactNode
  index?: number
  className?: string
}

export function Card({ children, index, className = "" }: CardProps) {
  return (
    <article
      className={
        "group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 " +
        "hover:-translate-y-1 hover:border-gray-900 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] " +
        "dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-lime-400/60 dark:hover:shadow-[0_20px_60px_-20px_rgba(163,230,53,0.25)] " +
        className
      }
    >
      {typeof index === "number" && (
        <span className="mb-8 font-mono text-xs text-gray-400 dark:text-gray-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      {children}
    </article>
  )
}