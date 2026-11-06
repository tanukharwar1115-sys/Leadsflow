const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-9 w-9 text-sm' }
// Stable colour per name so the same person always gets the same avatar.
const palette = ['from-brand-500 to-violet-500', 'from-sky-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600', 'from-rose-500 to-pink-600']

export default function Avatar({ name = '?', size = 'md' }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('')
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-sm ${palette[hue]} ${sizes[size]}`}>
      {initials}
    </span>
  )
}
