import { cacheMap } from '@/src/_maps'
import { CACHE_KEY_RULES } from '@/src/constants/cacheKey'
import type {
  AddStore,
  CacheRules,
  DataObject,
  GetStore,
  GetStoreProps,
  RemoveStore,
  ResetStore,
  UpdateStore,
  UpdateStoreProps,
} from '@/src/types'
import { logWarning } from '@/src/utils'

/**
 * Membuat kumpulan fungsi aksi untuk mengelola data store berdasarkan pathId dan rules yang diberikan.
 * Digunakan sebagai bagian dari hasil `generateStore()` untuk melakukan operasi seperti add, get, update, remove, dan reset.
 *
 * @param pathId - ID path dari komponen yang akan dimanipulasi.
 * @param rules - Struktur rules yang diambil dari cacheMap, berisi daftar komponen dan datanya.
 * @returns Objek berisi fungsi-fungsi manipulasi data store.
 */
export const ActionsStore = (pathId: string, rules: CacheRules) => {
  /**
   * Menambahkan data baru ke komponen tertentu.
   * Secara otomatis menambahkan ID berdasarkan urutan data terakhir.
   *
   * @param data - Objek data yang akan ditambahkan.
   */
  const add: AddStore = async (data: DataObject) => {
    try {
      const component = rules.components?.find((c) => c.name === pathId)

      // Cek apakah component ditemukan
      if (!component) {
        return logWarning(`Component with pathId ${pathId} not found.`)
      }

      if (!Array.isArray(component.data)) {
        component.data = []
      }

      // Proses data untuk menambahkannya ke component.data
      const nextId = `${pathId}.${component.data?.length + 1}`

      const newData = {
        id: nextId,
        ...data,
      }

      component.data.push(newData)

      // Update cacheMap
      cacheMap.set(CACHE_KEY_RULES, rules)
    } catch (error) {
      return logWarning(`Error adding data: ${error}`)
    }
  }

  /**
   * Mengambil data dari komponen, dapat difilter berdasarkan kunci tertentu.
   *
   * @param props.select - Objek dengan nama properti sebagai kunci dan boolean sebagai penanda apakah properti tersebut diambil.
   * @returns Data yang difilter sesuai properti yang dipilih atau seluruh rules jika tidak ada `select`.
   */
  const get: GetStore = async ({ select }: GetStoreProps) => {
    try {
      if (!rules) {
        throw new Error('No rules found in cache.')
      }

      if (!select || Object.keys(select).length === 0) {
        return rules
      }

      const component = rules.components?.find((c) => c.name === pathId)

      if (!component) {
        throw new Error(`Component ${pathId} not foun in rules.`)
      }

      const selected = component.data?.map((item: DataObject) => {
        const filtered: Record<string, any> = {}

        for (const key in select) {
          if (select[key] && key in item) {
            filtered[key] = item[key]
          }
        }

        return filtered
      })

      return selected
    } catch (error) {
      logWarning(`Error getting rules: ${error}`)
    }
  }

  /**
   * Memperbarui data dalam komponen berdasarkan ID dan callback untuk memodifikasi data lama.
   *
   * @param id - ID data yang ingin diperbarui.
   * @param cb - Fungsi callback untuk memodifikasi data sebelumnya.
   * @returns Promise yang menyelesaikan proses update.
   */
  const update: UpdateStore = async (id: string, cb: UpdateStoreProps) => {
    return new Promise((resolve, reject) => {
      try {
        const component = rules.components?.find((c) => c.name === pathId)

        if (!component || !Array.isArray(component.data)) {
          return reject(
            logWarning(`Component ${pathId} not found or data is invalid.`)
          )
        }

        const index = component.data.findIndex((item) => item.id === id)

        if (index === -1) {
          return reject(
            logWarning(`No data found to update in component ${pathId}.`)
          )
        }

        const prev = component.data[index]
        const next = cb(prev)

        component.data[index] = {
          ...prev,
          ...next,
        }

        cacheMap.set(CACHE_KEY_RULES, rules)
        resolve(rules)
      } catch (error: any) {
        reject(logWarning(error?.message ?? 'Update failed.'))
      }
    })
  }

  /**
   * Menghapus data berdasarkan ID dari komponen.
   * Setelah penghapusan, ID akan diurut ulang secara otomatis.
   *
   * @param id - ID data yang ingin dihapus.
   * @returns Promise yang menyelesaikan proses penghapusan.
   */
  const remove: RemoveStore = async (id: string) => {
    return new Promise((resolve, reject) => {
      try {
        const component = rules.components?.find((c) => c.name === pathId)

        if (!component || !Array.isArray(component.data)) {
          return reject(logWarning(`Component ${pathId} not found.`))
        }

        const index = component.data.findIndex((item) => item.id === id)

        if (index === -1) {
          return reject(logWarning(`Data with ID ${id} not found.`))
        }

        // Hapus item
        component.data.splice(index, 1)

        // Reset ulang ID agar terurut ulang
        component.data = component.data.map((item, idx) => ({
          ...item,
          id: `${pathId}.${idx + 1}`,
        }))

        cacheMap.set(CACHE_KEY_RULES, rules)
        resolve(rules)
      } catch (error: any) {
        reject(logWarning(error?.message ?? 'Remove failed.'))
      }
    })
  }

  /**
   * Mereset semua data dalam komponen ke kondisi kosong.
   *
   * @returns Promise yang menyelesaikan proses reset.
   */
  const reset: ResetStore = async () => {
    return new Promise((resolve, reject) => {
      try {
        const component = rules.components?.find((c) => c.name === pathId)

        if (!component) {
          return reject(logWarning(`Component ${pathId} not found.`))
        }

        component.data = []
        cacheMap.set(CACHE_KEY_RULES, rules)
        resolve(rules)
      } catch (error: any) {
        reject(logWarning(error?.message ?? 'Reset failed.'))
      }
    })
  }

  return {
    add,
    get,
    update,
    remove,
    reset,
  }
}
