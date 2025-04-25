import { HTMLAttributes, ReactNode } from 'react'

export type Props = HTMLAttributes<HTMLElement> & {
  /**
   * Child nodes to be rendered inside the dynamic element
   */
  children?: ReactNode

  /**
   * Identifier for root-level rules (Aidomx root)
   */
  name?: string

  /**
   * Feature type untuk component (untuk mapping ke featureMaps)
   */
  featureType?: string

  /**
   * Tag name to use for the rendered element (e.g., div, section, header)
   */
  tagName?: string

  /**
   * Identifier unik untuk komponen level dalam Aidomx
   */
  vAi?: string
}
