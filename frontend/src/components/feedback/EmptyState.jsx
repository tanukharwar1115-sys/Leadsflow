export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      {Icon && (
        <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <Icon size={20} aria-hidden="true" />
        </span>
      )}
      <h3 className="font-medium text-slate-800">{title}</h3>
      {description && <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
