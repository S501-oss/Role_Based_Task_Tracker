export const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch { return fallback }
  },
  set(key, value) {
    try {
      if (value === undefined) return
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(key) } catch {}
  }
}