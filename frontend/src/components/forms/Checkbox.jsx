import { useId } from 'react'

export default function Checkbox({ label, className = '', id: idProp, ...props }) {
  const auto = useId()
  const id = idProp || auto
  return (
    <label htmlFor={id} className={`inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 ${className}`}>
      <input id={id} type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-brand-600" {...props} />
      {label}
    </label>
  )
}
