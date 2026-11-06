const tones = {
  slate: { box: 'bg-slate-100 text-slate-700 ring-slate-200', dot: 'bg-slate-400' },
  blue: { box: 'bg-blue-50 text-blue-700 ring-blue-200', dot: 'bg-blue-500' },
  green: { box: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
  amber: { box: 'bg-amber-50 text-amber-700 ring-amber-200', dot: 'bg-amber-500' },
  red: { box: 'bg-red-50 text-red-700 ring-red-200', dot: 'bg-red-500' },
  indigo: { box: 'bg-brand-50 text-brand-700 ring-brand-200', dot: 'bg-brand-500' },
}

// dot => small status dot before the label (good for statuses in tables).
export default function Badge({ tone = 'slate', dot = false, children }) {
  const t = tones[tone]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${t.box}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden="true" />}
      {children}
    </span>
  )
}
