import { useCallback, useEffect, useState } from 'react'
import { http, getErrorMessage } from '../api/http'

async function fetchHealth(signal) {
  try {
    const { data } = await http.get('/health', { signal })
    return { loading: false, data, error: null }
  } catch (err) {
    if (err.code === 'ERR_CANCELED') return null
    return { loading: false, data: null, error: getErrorMessage(err) }
  }
}

export function useHealth() {
  const [state, setState] = useState({ loading: true, data: null, error: null })

  // Initial load: state is already loading=true, so no synchronous setState in the effect.
  useEffect(() => {
    const ctrl = new AbortController()
    fetchHealth(ctrl.signal).then((next) => next && setState(next))
    return () => ctrl.abort()
  }, [])

  const retry = useCallback(async () => {
    setState({ loading: true, data: null, error: null })
    setState(await fetchHealth())
  }, [])

  return { ...state, retry }
}
