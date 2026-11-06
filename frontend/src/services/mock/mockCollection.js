// ⚠️ MOCK BACKEND — in-memory, resets on page reload.
// Services (src/services/*.js) are the ONLY place that talks to this. When the real API is ready,
// swap the service function bodies for `http.get/post/...` calls; pages and hooks stay unchanged.

const LATENCY_MS = 300

export const delay = (ms = LATENCY_MS) => new Promise((resolve) => setTimeout(resolve, ms))

const clone = (v) => structuredClone(v)

function apiError(message, status) {
  // Same shape getErrorMessage() reads from real axios errors.
  return Object.assign(new Error(message), { response: { status, data: { success: false, message } } })
}

export function createMockCollection(seed = [], { idPrefix = 'id' } = {}) {
  let rows = clone(seed)
  let seq = rows.length + 1

  const find = (id) => rows.findIndex((r) => r.id === id)

  return {
    async all() {
      await delay()
      return clone(rows)
    },
    async get(id) {
      await delay()
      const i = find(id)
      if (i < 0) throw apiError('Record not found', 404)
      return clone(rows[i])
    },
    async create(data) {
      await delay()
      const now = new Date().toISOString()
      const row = { ...clone(data), id: `${idPrefix}_${seq++}`, createdAt: now, updatedAt: now }
      rows = [row, ...rows]
      return clone(row)
    },
    async update(id, patch) {
      await delay()
      const i = find(id)
      if (i < 0) throw apiError('Record not found', 404)
      rows[i] = { ...rows[i], ...clone(patch), id, updatedAt: new Date().toISOString() }
      return clone(rows[i])
    },
    async remove(id) {
      await delay()
      const i = find(id)
      if (i < 0) throw apiError('Record not found', 404)
      rows = rows.filter((r) => r.id !== id)
    },
  }
}
