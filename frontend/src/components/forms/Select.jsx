import { useId } from 'react'
import Field from './Field'
import { controlClass } from './fieldStyles'

// options: [{ value, label }]. `placeholder` adds a disabled empty first option.
export default function Select({ label, error, hint, className = '', id: idProp, options = [], placeholder, ...props }) {
  const auto = useId()
  const id = idProp || auto
  return (
    <Field id={id} label={label} error={error} hint={hint} className={className}>
      <select id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-msg` : undefined} className={controlClass(error)} {...props}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>
  )
}
