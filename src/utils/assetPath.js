const rawBase = (import.meta?.env?.BASE_URL ?? '/').replace(/\/+$/, '')
const base = rawBase === '/' ? '' : rawBase

export function assetPath(path = '') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}` || normalized
}
