export default function Card({ title, children, className = '' }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-5 ${className}`}>
      {title && <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>}
      {children}
    </div>
  )
}
