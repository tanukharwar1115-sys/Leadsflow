import { useId } from 'react'
import Field from './Field'
import { controlClass } from './fieldStyles'

export default function Textarea({ label, error, hint, className = '', id: idProp, rows = 4, ...props }) {
  const auto = useId()
  const id = idProp || auto
  return (
    <Field id={id} label={label} error={error} hint={hint} className={className}>
      <textarea id={id} rows={rows} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-msg` : undefined} className={controlClass(error)} {...props} />
    </Field>
  )
}
