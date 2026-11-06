import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, CalendarCheck, MessageSquareText, PhoneCall, Sparkles, Users } from 'lucide-react'
import Spinner from '../components/feedback/Spinner'
import ErrorState from '../components/feedback/ErrorState'
import { useHealth } from '../hooks/useHealth'

const features = [
  { icon: Users, title: 'Lead CRM & pipeline', text: 'Capture every enquiry and move it from first contact to closed deal in one place.' },
  { icon: Sparkles, title: 'AI qualification', text: 'Score and qualify leads automatically so your team talks to the right people first.' },
  { icon: PhoneCall, title: 'AI voice agents', text: 'Answer property enquiries instantly, day or night, and book viewings for you.' },
  { icon: MessageSquareText, title: 'Email & WhatsApp follow-ups', text: 'Automated, personal follow-ups that stop the moment a lead replies.' },
  { icon: CalendarCheck, title: 'Viewings & appointments', text: 'Scheduling with reminders that cut no-shows.' },
  { icon: BarChart3, title: 'Analytics & reports', text: 'See what converts, which sources pay off and how every agent performs.' },
]

export default function HomePage() {
  const { loading, data, error, retry } = useHealth()

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
            <Sparkles size={13} aria-hidden="true" /> AI-powered CRM
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Turn every enquiry into a{' '}
            <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">closed deal</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            LeadFlow AI helps real estate agencies capture, qualify and follow up with leads automatically, so your agents spend time on viewings, not admin.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/app" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-brand-500 to-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:from-brand-600 hover:to-brand-700">
              Open dashboard preview <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <span className="text-sm text-slate-500">Sign-in coming soon · sample data</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900">Everything from first enquiry to signed contract</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-lg shadow-brand-500/25">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dev status widget: shows API/DB health. To be removed or moved to an admin page before launch. */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">System status</h2>
          {loading && <Spinner label="Checking API…" />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {data && (
            <dl className="grid grid-cols-3 gap-4 text-sm">
              <div><dt className="text-slate-500">API</dt><dd className="font-medium text-emerald-700">{data.status}</dd></div>
              <div><dt className="text-slate-500">Database</dt><dd className="font-medium text-emerald-700">{data.db}</dd></div>
              <div><dt className="text-slate-500">Uptime</dt><dd className="font-medium">{Math.round(data.uptime)}s</dd></div>
            </dl>
          )}
        </div>
      </section>
    </>
  )
}
