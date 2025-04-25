import { useAidomx } from '../providers'
import { rootSynced } from '../rules'
import type { CompilerProps } from '../types'

/**
 * Komponen RootCompiler untuk mengelola dan menggabungkan aturan dengan props.
 * Mengambil aturan dari konteks (context) atau store dan menggabungkannya dengan props yang ada.
 * Jika aturan tidak ditemukan atau tidak sesuai dengan root, maka hanya props yang dikembalikan.
 *
 * @param type {RootCompilerProps} props - Props yang diterima oleh komponen.
 * @returns `{Record<string, any>}` - Gabungan antara aturan yang diterapkan dan props yang diteruskan.
 */
export const RootCompiler = ({ name, ...props }: CompilerProps) => {
  // Ambil rules dari context atau store
  const rules = useAidomx()

  // Jika rules tidak ada, kembalikan props biasa
  if (!rules || !name || rules.root !== name) return { ...props }

  // Terapkan rules dengan rootSynced, bisa menyesuaikan vAi atau nama lainnya
  const syncedRules = rootSynced(rules, name)

  // Gabungkan rules dan props yang ada
  return {
    ...syncedRules,
    ...props, // Gabungkan properti lain yang ada
  }
}
