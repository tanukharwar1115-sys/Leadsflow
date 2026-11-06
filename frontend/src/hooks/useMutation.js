import { useCallback, useState } from 'react'
import { getErrorMessage } from '../api/http'

// Wrap a create/update/delete call with a pending flag and a normalized error.
//   const save = useMutation(leadsService.create)
//   try { await save.run(values); toast.success('Saved') } catch { /* save.error holds the message */ }
export function useMutation(fn) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      return await fn(...args)
    } catch (err) {
      setError(getErrorMessage(err))
      throw err
    } finally {
      setLoading(false)
    }
  }, [fn])

  return { run, loading, error }
}
