import { useId } from 'react'

export default function Input({ label, error, className = '', ...props }) {
  const id = useId()
  return (
    <div className={className}>
      {label && <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">{label}</label>}
      <input
        id={id}
        aria-invalid={!!error}
        className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-400' : 'border-slate-300'}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
