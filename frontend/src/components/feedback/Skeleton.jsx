export default function Skeleton({ className = 'h-4 w-full' }) {
  return <div aria-hidden="true" className={`animate-pulse rounded bg-slate-200 ${className}`} />
}
