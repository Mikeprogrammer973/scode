import { useEffect, useState } from "react"

type Item = { id: string; label: string }

type DocsSidebarProps = {
  items: Item[]
  label?: string
}

export function DocsSidebar({ items, label = "Documentation" }: DocsSidebarProps) {
  const [active, setActive] = useState(items[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            break
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    )
    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {label}
      </div>
      <nav className="mt-6">
        <ul className="space-y-0.5">
          {items.map((item, i) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-900 dark:bg-black/60 dark:text-white"
                      : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-black/30 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`h-4 w-px transition-colors ${
                      isActive
                        ? "bg-lime-500 dark:bg-lime-400"
                        : "bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-white/20"
                    }`}
                  />
                  <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}