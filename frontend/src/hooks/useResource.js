import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '../api/http'

// Load data with loading / error / reload handled once, for every module.
//   const { data, loading, error, reload, setData } = useResource(() => leadsService.list(filters), [filters])
// `fetcher` is called on mount, whenever `deps` change, and on reload().
export function useResource(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    fetcher()
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((err) => !cancelled && setState((s) => ({ ...s, loading: false, error: getErrorMessage(err) })))
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetcher is intentionally driven by `deps`
  }, [...deps, tick])

  const reload = useCallback(() => setTick((t) => t + 1), [])
  const setData = useCallback((updater) => setState((s) => ({ ...s, data: typeof updater === 'function' ? updater(s.data) : updater })), [])

  return { ...state, reload, setData }
}
