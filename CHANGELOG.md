# Changelog

## [0.0.4] - Upcoming

### Added

- Penambahan direktori `src/hooks/` untuk modularisasi logika seperti `useOnList`, `useOnState`, dan lainnya.
- Menyiapkan pola hooks terpisah untuk event handler dan state.
- Draft `useOnList`: untuk menangani event-event seperti `onClick`, `onHover`, dll.
- Draft `useOnState`: untuk state sinkron antara controlled dan uncontrolled component.

### Changed

- Menyesuaikan struktur kode agar lebih deklaratif dan fleksibel, mendukung sistem hook internal.

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
