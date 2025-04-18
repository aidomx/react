# Changelog

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
