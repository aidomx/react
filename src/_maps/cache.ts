/**
 * Cache global untuk menyimpan hasil filtering props berdasarkan nama komponen root.
 * Digunakan untuk menghindari pengolahan ulang jika props belum berubah secara dangkal.
 */
export const cacheMap = new Map<string, any>()
