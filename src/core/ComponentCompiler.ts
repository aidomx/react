import { useAidomx } from '../providers'
import { componentsSynced } from '../rules'
import type { CompilerProps, Component } from '../types'

/**
 * Komponen ComponentCompiler untuk mengelola dan menggabungkan aturan dengan props berdasarkan komponen.
 * Mengambil aturan dari konteks (context) atau store dan mencocokkan dengan komponen yang sesuai berdasarkan nama.
 * Jika komponen tidak ditemukan, maka hanya props yang dikembalikan.
 *
 * @param {ComponentCompilerProps} props - Props yang diterima oleh komponen.
 * @returns `{Record<string, any>}` - Gabungan antara aturan yang diterapkan dan props yang diteruskan.
 */
export const ComponentCompiler = ({ name = '', ...props }: CompilerProps) => {
  const rules = useAidomx()

  const component: Component | undefined = rules?.components?.find(
    (c) => c.name === name
  )

  if (!component) return { ...props }

  const syncedRules = componentsSynced(component, name)

  return {
    ...syncedRules,
    ...props,
  }
}
