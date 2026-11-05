import Spinner from '../components/ui/Spinner'
import ErrorState from '../components/ui/ErrorState'
import { useHealth } from '../hooks/useHealth'

export default function HomePage() {
  const { loading, data, error, retry } = useHealth()

  return (
    <section>
      <h1 className="text-3xl font-bold">AI-powered CRM for real estate agencies</h1>
      <p className="mt-2 text-slate-600">Auth aur dashboard Phase 2 aur 4 mein aayenge.</p>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">System status</h2>
        {loading && <Spinner label="Checking API…" />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && (
          <dl className="grid grid-cols-3 gap-4 text-sm">
            <div><dt className="text-slate-500">API</dt><dd className="font-medium text-green-700">{data.status}</dd></div>
            <div><dt className="text-slate-500">Database</dt><dd className="font-medium text-green-700">{data.db}</dd></div>
            <div><dt className="text-slate-500">Uptime</dt><dd className="font-medium">{Math.round(data.uptime)}s</dd></div>
          </dl>
        )}
      </div>
    </section>
  )
}
