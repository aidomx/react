type Equal = Record<string, any>

export function shallowEqual<T extends Equal>(
  prev: T | undefined | null = {} as T,
  current: T | undefined | null = {} as T
): boolean {
  const prevKeys = Object.keys(prev)
  const currentKeys = Object.keys(current)
  if (prevKeys.length !== currentKeys.length) return false

  for (const key of prevKeys) {
    if (prev[key] !== current[key]) return false
  }

  return true
}
