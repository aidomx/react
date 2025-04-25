import { createElement } from 'react'
import { useAidomx } from '../providers'
import { RootCompiler } from './RootCompiler'
import { ComponentCompiler } from './ComponentCompiler'
import { featureMaps } from '../_maps'
import type { Props, Rules } from '../types'
import { HTMLValidateElements } from '../security'

/**
 * CreateElementWrapper
 *
 * Membuat elemen HTML dinamis berdasarkan rules yang diberikan (root atau komponen).
 * - Jika `name` cocok dengan `rules.root`, maka dianggap root
 * - Jika `vAi` cocok dengan komponen dalam rules, maka dianggap component
 *
 * Props yang diterapkan akan digabung dari hasil `RootCompiler` atau `ComponentCompiler`.
 *
 * @param ReactNode children
 * @param string name
 * @param string featureType
 * @param string tagName
 * @param string vAi
 * @param Record<string, any> props
 */
export const CreateElementWrapper = ({
  children,
  name = '',
  featureType = '',
  tagName = 'div',
  vAi = '',
  ...props
}: Props) => {
  const rules = useAidomx()

  const appliedProps = resolveProps({
    rules,
    rootId: name,
    componentId: vAi,
    props: props,
  })

  const isValidElements = HTMLValidateElements(tagName)

  if (!isValidElements) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Aidomx] element "${tagName}" tidak didukung.`)
    }

    return
  }

  if (featureType) {
    if (
      !featureMaps.includes(featureType) &&
      process.env.NODE_ENV === 'development'
    ) {
      console.warn(
        `[Aidomx] featureType "${featureType}" tidak ditemukan di featureMaps.`
      )
    }

    return createElement(tagName, { ...appliedProps }, children)
  }

  return createElement(tagName, { ...appliedProps }, children)
}

/**
 * resolveProps
 *
 * Mengembalikan props yang telah dikompilasi berdasarkan tipe (root atau komponen)
 * dari rules yang aktif. Dapat digunakan terpisah di luar CreateElementWrapper.
 *
 * @param rules - Seluruh rules aktif dari Aidomx
 * @param rootId - ID root yang digunakan untuk RootCompiler jika tidak ditemukan komponen
 * @param componentId - ID komponen yang digunakan untuk ComponentCompiler jika ditemukan
 * @param props - Props asli yang diteruskan ke elemen
 * @returns Objek props hasil kompilasi
 */
export const resolveProps = ({
  rules,
  rootId = '',
  componentId = '',
  props = {},
}: {
  rules: Rules
  rootId?: string
  componentId?: string
  props?: Record<string, any>
}) => {
  const component = rules?.components?.find(
    (c) => c.name === (componentId || rootId)
  )

  return !component
    ? RootCompiler({ name: componentId, ...props })
    : ComponentCompiler({ name: rootId || componentId, ...props })
}
