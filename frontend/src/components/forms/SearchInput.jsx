import { Search, X } from 'lucide-react'

// Controlled. onChange receives the string value.
export default function SearchInput({ value, onChange, placeholder = 'Search…', label = 'Search', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-8 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600">
          <X size={14} />
        </button>
      )}
    </div>
  )
}
