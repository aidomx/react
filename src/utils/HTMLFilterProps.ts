export const HTMLFilterProps = (props: Record<string, any>) => {
  const allowed = [
    'id',
    'className',
    'style',
    'title',
    'textContent',
    'children',
    'onClick',
    'role',
  ]
  const result: Record<string, any> = {}
  for (const key in props) {
    if (allowed.includes(key)) result[key] = props[key]
  }
  return result
}
