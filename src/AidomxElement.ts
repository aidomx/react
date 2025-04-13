import type { Rules } from 'aidomx'
import { withRootElement } from './withRootElement'
import { withoutRootElement } from './withoutRootElement'

type Data = Rules | Record<string, any>

export const AidomxElement = async (data: Data) => {
  if (typeof document === 'undefined') return

  if ('root' in data && data.root) {
    await withRootElement(data)
  } else {
    await withoutRootElement(data)
  }
}
