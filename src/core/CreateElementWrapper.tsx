import { HTMLAttributes, ReactNode, createElement } from 'react'
import { RootCompiler } from '@/src/core/RootCompiler'
import { useAidomx } from '../providers'
import { ComponentCompiler } from './ComponentCompiler'

type Props = HTMLAttributes<HTMLElement> & {
  /**
   * Child nodes to be rendered inside the dynamic element
   */
  children?: ReactNode

  /**
   * Identifier for root-level rules (Aidomx root)
   */
  name?: string

  /**
   * Tag name to use for the rendered element (e.g., div, section, header)
   */
  tagName?: string

  /**
   * Identifier for component-level rules
   */
  vAi?: string
}

/**
 * CreateElementWrapper
 *
 * Membuat elemen HTML dinamis berdasarkan rules yang diberikan (root atau komponen).
 * - Jika `name` cocok dengan `rules.root`, maka dianggap root.
 * - Jika `vAi` cocok dengan komponen dalam rules, maka dianggap component.
 *
 * Props yang diterapkan akan digabung dari hasil `RootCompiler` atau `ComponentCompiler`.
 */
export const CreateElementWrapper = ({
  children,
  name = '',
  tagName = 'div',
  vAi = '',
  ...props
}: Props) => {
  const rules = useAidomx()
  const component = rules?.components?.find((c) => c.name === (vAi || name))
  let appliedProps: Record<string, any> = {}

  if (!component) {
    // Jika tidak ditemukan komponen, anggap ini root element
    appliedProps = RootCompiler({ name, ...props })
  } else {
    // Jika ditemukan, terapkan sebagai komponen
    appliedProps = ComponentCompiler({ name: vAi || name, ...props })
  }

  return createElement(tagName, { ...appliedProps }, children)
}
