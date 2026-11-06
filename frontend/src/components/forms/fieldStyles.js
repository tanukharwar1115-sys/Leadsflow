// One look for every form control (Input, Select, Textarea).
export const controlClass = (error) =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 ${
    error ? 'border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100'
  }`
