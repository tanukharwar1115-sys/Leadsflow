import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Sparkline from './Sparkline'

const tones = {
  indigo: { tile: 'from-brand-500 to-violet-500 shadow-brand-500/30', spark: 'oklch(0.585 0.233 277.117)' },
  blue: { tile: 'from-sky-500 to-blue-600 shadow-blue-500/30', spark: '#2563eb' },
  green: { tile: 'from-emerald-500 to-teal-600 shadow-emerald-500/30', spark: '#059669' },
  amber: { tile: 'from-amber-400 to-orange-500 shadow-amber-500/30', spark: '#d97706' },
}

// trend: { value: '+12%', up: true }   spark: number[]
export default function StatCard({ label, value, icon: Icon, hint, tone = 'indigo', trend, spark }) {
  const t = tones[tone]
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {Icon && (
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg ${t.tile}`}>
            <Icon size={19} aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold tracking-tight tabular-nums text-slate-900">{value}</p>
        <Sparkline data={spark} color={t.spark} />
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {trend && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold ${trend.up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {trend.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend.value}
          </span>
        )}
        {hint && <span className="text-slate-500">{hint}</span>}
      </div>
    </div>
  )
}
