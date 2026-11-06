import { useCallback, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { ToastContext } from './toastContext'

const styles = {
  success: { icon: CheckCircle2, cls: 'text-emerald-600' },
  error: { icon: AlertCircle, cls: 'text-red-600' },
  info: { icon: Info, cls: 'text-brand-600' },
}

export default function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => setItems((l) => l.filter((t) => t.id !== id)), [])
  const push = useCallback((type, message) => {
    const id = ++idRef.current
    setItems((l) => [...l.slice(-3), { id, type, message }])
    setTimeout(() => dismiss(id), 4000)
  }, [dismiss])

  const api = useMemo(
    () => ({ success: (m) => push('success', m), error: (m) => push('error', m), info: (m) => push('info', m) }),
    [push],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-2 sm:left-auto sm:right-4">
        {items.map((t) => {
          const { icon: Icon, cls } = styles[t.type]
          return (
            <div key={t.id} role="status" className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
              <Icon size={18} className={`mt-0.5 shrink-0 ${cls}`} aria-hidden="true" />
              <p className="flex-1 text-sm text-slate-700">{t.message}</p>
              <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss" className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
