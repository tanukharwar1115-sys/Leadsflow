import { useCallback, useState } from 'react'

const KEY = 'leadflow.sidebar.collapsed'

// localStorage is only a convenience; the UI works even if it fails.
function read() {
  try { return localStorage.getItem(KEY) === '1' } catch { return false }
}

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(read)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      try { localStorage.setItem(KEY, c ? '0' : '1') } catch { /* ignore */ }
      return !c
    })
  }, [])

  return {
    collapsed,
    toggleCollapsed,
    mobileOpen,
    openMobile: () => setMobileOpen(true),
    closeMobile: () => setMobileOpen(false),
  }
}
