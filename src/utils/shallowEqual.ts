type Equal = Record<string, any>

export const shallowEqual = <T extends Record<string, any> | null>(
  prev: T,
  current: T
): boolean => {
  if (prev === current) return true
  if (!prev || !current) return false

  const prevKeys = Object.keys(prev)
  const currentKeys = Object.keys(current)

  if (prevKeys.length !== currentKeys.length) return false

  for (let key of prevKeys) {
    if (prev[key] !== current[key]) return false
  }

  return true
}
