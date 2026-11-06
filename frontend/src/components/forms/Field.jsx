// Label + control slot + hint/error. The control must use id and aria-describedby={`${id}-msg`}.
export default function Field({ id, label, error, hint, className = '', children }) {
  return (
    <div className={className}>
      {label && <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>}
      {children}
      {error ? (
        <p id={`${id}-msg`} className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p id={`${id}-msg`} className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  )
}
