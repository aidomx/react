export const generateId = (tag: string) => {
  const rand = Math.random().toString(36).substring(2, 5)
  return `${tag}.${Date.now()}-${rand}`
}
