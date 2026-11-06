// tabs: [{ id, label, count? }]. Controlled via value/onChange.
export default function Tabs({ tabs, value, onChange, className = '' }) {
  return (
    <div role="tablist" className={`flex gap-1 overflow-x-auto border-b border-slate-200 ${className}`}>
      {tabs.map((t) => {
        const active = t.id === value
        return (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
            {t.count != null && (
              <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-600'}`}>{t.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
