import { AttrMaps } from '../_maps'

/**
 * Level atribut berdasarkan peraturan yang telah ditentukan dalam `AttrMaps`.
 * Misalnya: "denied", "danger", "warning", dll.
 */
export type AttributeLevel = keyof typeof AttrMaps

/**
 * Hasil validasi HTML props.
 * `filtered` berisi atribut yang diperbolehkan, sementara `issues` berisi masalah yang ditemukan.
 */
export interface ValidationResult {
  /**
   * Atribut yang sudah difilter, hanya yang aman untuk diteruskan.
   */
  filtered: Record<string, any>

  /**
   * Daftar masalah yang ditemukan selama validasi.
   * Berisi key dan level peringatan (misalnya: "danger", "warning").
   */
  issues: { key: string; level: AttributeLevel }[]
}

/**
 * Fungsi untuk memvalidasi properti HTML.
 * Menyaring atribut berdasarkan level keamanan yang ditentukan dalam `AttrMaps`.
 * Atribut yang "denied" akan diabaikan, sedangkan atribut dengan level "danger" atau "warning" akan dilaporkan.
 *
 * @param {Record<string, any>} props - Properti HTML yang akan divalidasi
 * @returns {ValidationResult} - Hasil validasi yang berisi properti yang difilter dan masalah yang ditemukan
 */
export function validateHTMLProps(
  props: Record<string, any>
): ValidationResult {
  const result: Record<string, any> = {}
  const issues: { key: string; level: AttributeLevel }[] = []

  // Iterasi untuk setiap key dalam props
  for (const key in props) {
    let matchedLevel: AttributeLevel | undefined

    // Cek level yang cocok berdasarkan AttrMaps
    for (const level in AttrMaps) {
      const attrs = AttrMaps[level as AttributeLevel]
      if (Array.isArray(attrs) && attrs.includes(key)) {
        matchedLevel = level as AttributeLevel
        break
      }
    }

    // Menyaring dan menangani berdasarkan level
    if (matchedLevel === 'denied') {
      // Atribut yang ditolak akan diabaikan
      continue
    } else if (matchedLevel === 'danger' || matchedLevel === 'warning') {
      // Masukkan ke dalam issues jika ada masalah
      issues.push({ key, level: matchedLevel })
      result[key] = props[key] // Tetap diteruskan meskipun ada masalah
    } else {
      // Atribut yang diterima akan diteruskan
      result[key] = props[key]
    }
  }

  // Mengembalikan hasil validasi
  return { filtered: result, issues }
}
