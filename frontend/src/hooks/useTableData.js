import { useMemo, useState } from 'react'

const compare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a ?? '').localeCompare(String(b ?? ''), undefined, { numeric: true, sensitivity: 'base' })
}

// Client-side search + sort + pagination over an array.
// Later, for server-side lists, the same return shape can be fed from API params instead.
//   searchKeys: fields to match the query against      accessors: { key: row => value } for computed sort values
export function useTableData(rows, { searchKeys = [], pageSize = 10, initialSort = null, accessors = {} } = {}) {
  const [query, setQueryState] = useState('')
  const [sort, setSort] = useState(initialSort)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q)))
  }, [rows, query, searchKeys])

  const sorted = useMemo(() => {
    if (!sort) return filtered
    const get = accessors[sort.key] || ((r) => r[sort.key])
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => dir * compare(get(a), get(b)))
  }, [filtered, sort, accessors])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const pageRows = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  return {
    query,
    setQuery: (q) => { setQueryState(q); setPage(1) },
    sort,
    // click cycle: asc -> desc -> none
    toggleSort: (key) => {
      setPage(1)
      setSort((s) => (!s || s.key !== key ? { key, dir: 'asc' } : s.dir === 'asc' ? { key, dir: 'desc' } : null))
    },
    page: safePage,
    setPage,
    pageCount,
    pageSize,
    total: sorted.length,
    pageRows,
  }
}
