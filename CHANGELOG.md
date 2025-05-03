# Changelog

Semua perubahan signifikan pada project ini akan didokumentasikan di sini.

Format:

- **Added**: Penambahan fitur baru
- **Changed**: Perubahan perilaku atau struktur yang sudah ada
- **Deprecated**: Fitur yang akan dihapus di versi mendatang
- **Removed**: Fitur yang sudah dihapus
- **Fixed**: Perbaikan bug
- **Security**: Perubahan terkait keamanan

---

## [v0.1.1] - 3 May, 2025

### Added

- New error boundary components: `MissConfig.tsx` and `NotFound.tsx` for better debugging experience.
- Semantic release support via `.releaserc` and GitHub Actions workflow `.github/workflows/release.yml`.
- Type definitions folder `src/types/` for better type separation and clarity.

### Changed

- Refactored `GhostWrapper.tsx`, `Skeleton.tsx`, and `Aidomx.tsx` to align with the latest core structure.
- Improved resilience and flexibility in rendering logic using `@aidomx/core@0.1.0`.

### Removed

- Removed legacy route resolution and debug config logic that are no longer relevant in production use.

### Notes

- First stable release to align with `@aidomx/core@0.1.0`.
- Designed for high-performance dynamic rendering in React using rule-based architecture.

## [v0.1.0] - 2 May, 2025

### Changed

- **All core logic has been moved to [`@aidomx/core`](https://www.npmjs.com/package/@aidomx/core).**
- `@aidomx/react` now focuses solely on **UI rendering and React integration**.

### Removed

- Virtual element manipulation (`createGhost`, `spawnGhosts`, `sortGhost`, etc.)
- State management features (`createStore`, `rupa`, etc.)
- CLI and runtime abstractions

### Added

- Lightweight rendering components using `rules` definition
- Simplified and optimized `AidomxProvider` for React Context
- Compatibility layer with `@aidomx/core`

### Notes

This version marks a structural split:  
`@aidomx/react` is now responsible only for rendering components using declarative rules. All logic, transformation, and dynamic composition is now maintained and extended through `@aidomx/core`.

## [0.0.5] - 25 April 2025

### Added

- Menambahkan `src/constants/rulesKey.ts` dan `ghostId.ts` untuk konsistensi key internal Aidomx.
- Menambahkan `src/features/nested-list` sebagai contoh fitur turunan rules-based.
- Menambahkan `src/_maps/features.ts`, `ghostMap.ts`, `rulesProps.ts`, dan `ghostElements.ts` untuk konfigurasi pemetaan internal dan pengelolaan ghost elements.
- Menambahkan `src/rules/virtual/` sebagai sistem layer virtual dengan `actions.ts`, `index.ts`, dan `README.md`.
- Menambahkan `src/rules/store/manipulation.ts` sebagai alias logic (`morph`, `mutate`, `rupa`, `evolve`) untuk store components.
- Menambahkan `src/rules/manage/componentsSynced.ts` dan `rootSynced.ts` untuk menyinkronkan aturan root dan components.
- Menambahkan `README.md` pada folder `store` dan `virtual` untuk dokumentasi internal modular system.
- Menambahkan `src/utils/resolvedPath.ts` dan `src/utils/normalizeRules.ts` sebagai proteksi data.
- Penambahan `createGhost` untuk dukungan layer virtual UI.

### Changed

- Struktur ekspor `src/rules/index.ts` kini mengekspor seluruh bagian rules: `defineRules`, `manage`, `store`, `route`, dan `virtual`.
- Menyederhanakan struktur `src/core/` menjadi hanya compiler logika utama: `RootCompiler.ts`, `ComponentCompiler.ts`, dan `CreateElementWrapper.tsx`.
- Refactor internal struktur rules dan store agar lebih modular.
- Penyesuaian struktur `routes` dan `secureRules` untuk membatasi akses berbasis pathname.
- Implementasi `onList` dan `onState` yang sepenuhnya digantikan oleh `createStore`.

### Deleted

- Sebagian besar file lama telah dihapus, guna untuk modularisasi dalam pengembangan.

### Notes

- Versi ini menandai refactor besar menuju sistem rules-based yang lebih modular, dapat diskalakan, dan siap menuju fase eksperimen penuh.
- Tujuan utama adalah memisahkan concerns, mempermudah dokumentasi, dan menyederhanakan proses integrasi logika ghost layer dan virtual layer.

## [0.0.4] - 18 April 2025

### Added

- Penambahan `ui element` dan `layouts` berbasis sistem rules.
- Penambahan `CreateElementWrapper` untuk membungkus komponen secara dinamis dengan tag dan rules.
- Implementasi `ComponentCompiler` dan `RootCompiler` untuk memisahkan logika apply rules berdasarkan jenis komponen.
- Penerapan `Registry` untuk mendukung konsep _ghost components_ agar komponen bisa digunakan tanpa harus didefinisikan secara eksplisit.
- Pembuatan sistem rules berbasis `registry` agar lebih fleksibel dibanding `proxy`.
- Penambahan `Aidomx` sebagai alias root registry default.
- Draft awal untuk `useOnList` dan `useOnState` sebagai rencana hooks modular (belum digunakan aktif).
- Penambahan utilitas `eventMap` untuk mengidentifikasi semua properti event handler React.
- Penambahan fungsi `excludeEventHandlers()` untuk memisahkan event handler dari objek komponen sebelum cloning.

### Changed

- Refactor besar-besaran `defineRules`, menggabungkan utilitas dan proxy menjadi satu sistem terpusat.
- Perubahan strategi dari `proxy-based` ke `registry-based` dalam mendefinisikan dan memanggil komponen.
- Refactor `ApplyRules` agar otomatis menyaring props dan menerapkan rules dengan lebih konsisten.
- Penyederhanaan logika skeleton dan penerapannya langsung melalui registry, tidak perlu lagi dicek di tiap layout/ui.
- Penyesuaian struktur agar lebih deklaratif, mendukung arsitektur UI berbasis data dan rules-driven rendering.
- Default `skeleton.className` kini lebih ringan, tanpa `animate-pulse` agar tidak membebani render.

### Fixed

- Menghindari error `DataCloneError` akibat cloning fungsi event handler seperti `onClick`, `onScroll`, dll, dengan memisahkannya sebelum cloning dan menyuntik ulang setelahnya.
- Performa render Aidomx di Next.js sekarang stabil pada kisaran `~40ms` untuk halaman dengan rules aktif dan komponen interaktif.

### Removed

- Rencana penggunaan direktori `src/hooks/` ditunda karena `onList` dan `onState` masih dikelola dalam `src/utils`.

## [0.0.3] - 17 April 2025

### Added

- Dukungan untuk komponen `Aidomx` sebagai layout berbasis `name`
- Implementasi `AidomxProvider` untuk penyediaan `rules` secara global melalui Context API
- Penambahan komponen UI dasar: `Text`, `Box`, dan `Button`
- Utility `ApplyRules` dan `ApplyComponentRules` untuk menerapkan atribut seperti `className`, `style`, dan event handler secara dinamis
- Struktur `rules` yang fleksibel, mendukung definisi root dan komponen berbasis `name`
- Integrasi contoh penggunaan di `app/Home.tsx`
- Penyusunan direktori `rules/` untuk manajemen konfigurasi secara modular

### Changed

- Transisi dari manipulasi DOM langsung ke pendekatan per-komponen yang lebih idiomatik di React
- Penghapusan ketergantungan langsung terhadap core `aidomx`, menjadikan `@aidomx/react` lebih mandiri
- Perubahan atribut `v-ai` menjadi `vAi` untuk konsistensi konvensi penamaan dalam JSX

---

## [0.0.2] - 16 April 2025

### Added

- Penambahan dependensi utama `aidomx`
- Penambahan badge status untuk npm dan CI
- Perbaikan metadata pada `package.json`
- Penambahan file `CHANGELOG.md`
- Pembaruan status lisensi di npmjs

---

## [0.0.1] - 14 April 2025

### Added

- Rilis awal proyek `@aidomx/react`
