import { ghostElements } from '../_maps/ghostElements'

/**
 * Validasi html elements sebelum pembuatan component.
 *
 * @param string tag
 * @returns boolean
 */
export const HTMLValidateElements = (tag: string): boolean => {
  return ghostElements.includes(tag) ?? false
}
