const variants = {
  primary: 'bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-sm shadow-brand-600/30 hover:from-brand-600 hover:to-brand-700 disabled:from-brand-300 disabled:to-brand-300 disabled:shadow-none',
  secondary: 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50',
  danger: 'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-sm shadow-red-600/30 hover:from-red-600 hover:to-red-700 disabled:from-red-300 disabled:to-red-300 disabled:shadow-none',
}
const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm' }

export default function Button({ variant = 'primary', size = 'md', loading = false, disabled, className = '', type = 'button', children, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
      {children}
    </button>
  )
}
