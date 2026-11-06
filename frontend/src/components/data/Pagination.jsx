import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'

// Presentational: parent owns `page` (1-based).
export default function Pagination({ page, pageCount, total, pageSize, onPageChange }) {
  if (total === 0) return null
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-sm text-slate-500 sm:flex-row">
      <p>Showing <span className="font-medium text-slate-700">{from}–{to}</span> of <span className="font-medium text-slate-700">{total}</span></p>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          <ChevronLeft size={14} /> Prev
        </Button>
        <span aria-live="polite">Page {page} of {pageCount}</span>
        <Button variant="secondary" size="sm" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} aria-label="Next page">
          Next <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  )
}
