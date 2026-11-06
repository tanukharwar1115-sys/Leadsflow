import { useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'

// trigger({open, toggle}) render-prop. Closes on outside click / Escape.
export default function Popover({ trigger, children, align = 'right', width = 'w-80' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)

  return (
    <div ref={ref} className="relative">
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <div className={`absolute z-40 mt-2 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white shadow-lg ${width} ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}
