import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import Skeleton from '../feedback/Skeleton'

// Presentational table. Data/sort/page state lives in the parent (see hooks/useTableData).
// columns: [{ key, header, sortable?, render?(row), className? }]
// sort: { key, dir: 'asc'|'desc' } | null     onSort(key)
export default function DataTable({ columns, rows, rowKey = 'id', sort, onSort, loading = false, skeletonRows = 5, empty, onRowClick }) {
  if (!loading && rows.length === 0 && empty) return empty

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500">
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key
              const ariaSort = c.sortable ? (active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined
              return (
                <th key={c.key} scope="col" aria-sort={ariaSort} className={`whitespace-nowrap px-5 py-3 font-semibold ${c.className || ''}`}>
                  {c.sortable ? (
                    <button type="button" onClick={() => onSort(c.key)} className="inline-flex items-center gap-1 uppercase tracking-wide hover:text-slate-800">
                      {c.header}
                      {active ? (sort.dir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />) : <ChevronsUpDown size={12} className="opacity-50" />}
                    </button>
                  ) : c.header}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {loading
            ? Array.from({ length: skeletonRows }, (_, i) => (
                <tr key={i}>{columns.map((c) => <td key={c.key} className="px-5 py-4"><Skeleton className="h-4 w-3/4" /></td>)}</tr>
              ))
            : rows.map((row) => (
                <tr
                  key={row[rowKey]}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  onKeyDown={onRowClick ? (e) => e.key === 'Enter' && onRowClick(row) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  className={`transition-colors hover:bg-brand-50/40 ${onRowClick ? 'cursor-pointer focus:bg-brand-50/60 focus:outline-none' : ''}`}
                >
                  {columns.map((c) => (
                    <td key={c.key} className={`whitespace-nowrap px-5 py-3.5 text-slate-600 ${c.className || ''}`}>{c.render ? c.render(row) : row[c.key]}</td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
