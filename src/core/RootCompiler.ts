import { ApplyRules } from '@/src/utils'
import { useAidomx } from '../providers'

type RootCompilerProps = {
  name: string
  [key: string]: any
}

export const RootCompiler = ({ name, ...props }: RootCompilerProps) => {
  // Ambil rules dari context atau store
  const rules = useAidomx()

  // Jika rules tidak ada, kembalikan props biasa
  if (!rules || !name || rules.root !== name) return { ...props }

  // Terapkan rules dengan ApplyRules, bisa menyesuaikan vAi atau nama lainnya
  const appliedRules = ApplyRules(rules, name)

  // Gabungkan rules dan props yang ada
  return {
    ...appliedRules,
    ...props, // Gabungkan properti lain yang ada
  }
}
