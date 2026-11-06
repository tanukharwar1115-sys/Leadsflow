import { useId, useState } from 'react'

// Lightweight responsive area chart (no chart lib). data: [{ label, value }]
// Analytics module will add a full charting library; this covers dashboard-sized charts.
export default function AreaChart({ data, height = 220, valueLabel = 'Leads' }) {
  const id = useId()
  const [hover, setHover] = useState(null)
  if (!data?.length) return null

  const max = Math.max(...data.map((d) => d.value)) * 1.15 || 1
  const x = (i) => (data.length === 1 ? 50 : (i / (data.length - 1)) * 100)
  const y = (v) => 100 - (v / max) * 100
  const pts = data.map((d, i) => [x(i), y(d.value)])
  const line = pts.reduce((p, [px, py], i) => {
    if (i === 0) return `M${px},${py}`
    const mx = (pts[i - 1][0] + px) / 2
    return `${p} C${mx},${pts[i - 1][1]} ${mx},${py} ${px},${py}`
  }, '')
  const ticks = [0, 0.5, 1].map((f) => Math.round(max * f))
  const step = Math.ceil(data.length / 6)

  return (
    <div>
      <div className="relative" style={{ height }} onMouseLeave={() => setHover(null)}>
        <div className="absolute inset-0 flex flex-col justify-between" aria-hidden="true">
          {[...ticks].reverse().map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-7 text-right text-[10px] tabular-nums text-slate-400">{t}</span>
              <span className="h-px flex-1 border-t border-dashed border-slate-200" />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-9 right-0">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible" role="img" aria-label={`${valueLabel} over time`}>
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.585 0.233 277.117)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="oklch(0.585 0.233 277.117)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${line} L100,100 L0,100 Z`} fill={`url(#${id})`} />
            <path d={line} fill="none" stroke="oklch(0.511 0.262 276.966)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {data.map((d, i) => (
            <div
              key={i}
              className="absolute inset-y-0"
              style={{ left: `${x(i) - 50 / Math.max(data.length - 1, 1)}%`, width: `${100 / Math.max(data.length - 1, 1)}%` }}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              tabIndex={0}
              aria-label={`${d.label}: ${d.value} ${valueLabel}`}
            />
          ))}
          {hover != null && (
            <>
              <span className="pointer-events-none absolute inset-y-0 w-px bg-brand-200" style={{ left: `${x(hover)}%` }} />
              <span className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-600 shadow" style={{ left: `${x(hover)}%`, top: `${y(data[hover].value)}%` }} />
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white shadow-lg"
                style={{ left: `${Math.min(Math.max(x(hover), 8), 92)}%`, top: `calc(${y(data[hover].value)}% - 12px)` }}
              >
                <span className="text-slate-300">{data[hover].label}</span>
                <span className="ml-2 font-semibold tabular-nums">{data[hover].value} {valueLabel.toLowerCase()}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="ml-9 mt-2 flex justify-between text-[10px] text-slate-400" aria-hidden="true">
        {data.map((d, i) => (i % step === 0 ? <span key={i}>{d.label}</span> : <span key={i} />))}
      </div>
    </div>
  )
}
