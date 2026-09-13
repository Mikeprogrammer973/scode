import type { ReactNode } from "react"

type Column<T> = {
  header: string
  accessor: (row: T) => ReactNode
}

type DataTableProps<T> = {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T, i: number) => string
}

export function DataTable<T>({ columns, rows, rowKey }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-black/60">
              {columns.map((c) => (
                <th
                  key={c.header}
                  className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400"
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={rowKey(row, i)}
                className="border-b border-gray-100 last:border-b-0 dark:border-white/5"
              >
                {columns.map((c) => (
                  <td
                    key={c.header}
                    className="px-5 py-4 align-top text-gray-700 dark:text-gray-300"
                  >
                    {c.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}