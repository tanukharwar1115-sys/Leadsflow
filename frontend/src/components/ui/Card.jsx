// flush => no body padding (for tables). Header only renders when title/actions given.
export default function Card({ title, description, actions, flush = false, children, className = '' }) {
  return (
    <section className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            {title && <h2 className="text-[15px] font-semibold tracking-tight text-slate-900">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className={flush ? '' : 'p-5'}>{children}</div>
    </section>
  )
}
