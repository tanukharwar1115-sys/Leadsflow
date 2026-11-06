import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

// Built on the native <dialog>: browser gives us focus trap, Escape and top-layer for free.
// Content unmounts when closed, so forms inside reset every time.
export default function Modal({ open, onClose, title, description, children, footer, size = 'md' }) {
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto w-[calc(100%-2rem)] ${sizes[size]} rounded-xl p-0 text-slate-900 shadow-xl backdrop:bg-slate-900/40`}
    >
      {open && (
        <div>
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
            <div>
              <h2 id={titleId} className="text-base font-semibold">{title}</h2>
              {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
            </div>
            <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <X size={18} />
            </button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
          {footer && <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-3">{footer}</div>}
        </div>
      )}
    </dialog>
  )
}
