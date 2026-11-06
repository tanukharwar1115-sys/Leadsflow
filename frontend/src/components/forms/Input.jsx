import { useId } from 'react'
import Field from './Field'
import { controlClass } from './fieldStyles'

export default function Input({ label, error, hint, className = '', id: idProp, ...props }) {
  const auto = useId()
  const id = idProp || auto
  return (
    <Field id={id} label={label} error={error} hint={hint} className={className}>
      <input id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-msg` : undefined} className={controlClass(error)} {...props} />
    </Field>
  )
}
