import { useRootElement, useWithoutRootElement, type Rules } from 'aidomx'

type Data = Rules | Record<string, any>

export const AidomxElement = async (data: Data) => {
  if (typeof document === 'undefined') return

  if ('root' in data && data.root) {
    await useRootElement(data)
  } else {
    await useWithoutRootElement(data)
  }
}
