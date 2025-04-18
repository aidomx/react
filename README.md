# Aidomx React

[![npm version](https://img.shields.io/npm/v/@aidomx/react?color=blue&label=npm)](https://www.npmjs.com/package/@aidomx/react)
[![license](https://img.shields.io/npm/l/@aidomx/react?cacheSeconds=60)](LICENSE)
[![Build status](https://github.com/aidomx/react/actions/workflows/ci.yml/badge.svg)](#)

**Lightweight, reactive, and identity-driven React integration**

**Aidomx React** adalah integrasi untuk framework [aidomx](https://github.com/aidomx/aidomx) — pendekatan ringan dan modular untuk menerapkan struktur, gaya, dan interaksi secara deklaratif berbasis identitas komponen.

---

## Fitur Utama

- Penulisan UI berbasis identitas (`vAi`) untuk struktur dan perilaku yang bersih
- Integrasi ringan dan kontekstual melalui React Context
- Dapat digunakan di Next.js, Vite, CRA, dan lainnya
- Minim boilerplate dan sangat fleksibel untuk sistem desain yang kompleks

---

## Instalasi

```bash
npm install @aidomx/react
```

---

## Struktur Penggunaan

### 1. `rules/index.ts`

```ts
import { defineRules } from '@aidomx/react'

export const rules = defineRules({
  root: 'container',
  className:
    'min-h-screen bg-gray-100 flex items-center justify-center flex-col gap-4',
  components: [
    {
      name: 'brand',
      className: 'text-4xl font-bold text-blue-600',
    },
    {
      name: 'button',
      className: 'px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded',
      onClick: () => alert('You clicked a button!'),
    },
    {
      name: 'box',
      className:
        'p-4 border border-dashed border-gray-400 rounded w-full max-w-md',
    },
  ],
})
```

---

### 2. `app/layout.tsx`

```tsx
import './globals.css'
import { AidomxProvider } from '@aidomx/react'
import { rules } from '@/rules'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AidomxProvider value={rules}>{children}</AidomxProvider>
      </body>
    </html>
  )
}
```

---

### 3. `app/page.tsx` (atau `app/Home.tsx`)

```tsx
'use client'

import { Aidomx, Text, Button, Box } from '@aidomx/react'

export default function Home() {
  return (
    <Aidomx name="container">
      <Text vAi="brand">Hello aidomx!</Text>
      <Box vAi="box">
        <p className="text-gray-600">
          This is a box component with custom styles.
        </p>
        <Button vAi="button">Click Me</Button>
      </Box>
    </Aidomx>
  )
}
```

---

## Benchmark Sederhana

Aidomx menggunakan pendekatan deklaratif ringan dan berbasis identitas. Berikut hasil pengukuran waktu render halaman pada lingkungan pengembangan:

| Halaman                          | Waktu Render (dev) |
| -------------------------------- | ------------------ |
| Home (Aidomx + styling + button) | 62.90ms            |
| About (tanpa Aidomx)             | 60.30ms            |

**Kesimpulan:** Overhead dari penggunaan Aidomx sangat minimal (~2ms) dan tetap menjaga efisiensi bahkan dengan komponen interaktif dan styling aktif.

---

## Roadmap

- [x] Provider dan konversi `rules` ke komponen berbasis context
- [x] Wrapper dinamis untuk `Layout` dan `UI`
- [x] Skeleton renderer berbasis rules
- [x] Modularisasi dan utilitas `eventMaps`
- [ ] Sistem autoGen untuk membuat ekspor komponen UI dari rules
- [ ] Fitur include/exclude untuk logika deklaratif di rules
- [ ] Komponen tambahan dan preset siap pakai (`Card`, `Form`, dsb.)

---

## Kenapa Aidomx?

Aidomx memungkinkan kamu membangun komponen yang fleksibel, dinamis, dan tetap terstruktur — tanpa harus mencampurkan banyak logika di dalam JSX.

Dengan pemisahan aturan berbasis identitas, Aidomx mempermudah scaling antarkomponen dan mengurangi ketergantungan pada className berulang.

## Lisensi

MIT © 2025 [@aidomx](https://github.com/aidomx/react/LICENSE)

---

Aidomx dibuat dan dikembangkan oleh [@aidomx](https://github.com/aidomx)

> “UI yang rapi dan fleksibel bukan soal library besar, tapi cara kita menyusunnya. Aidomx membawanya jadi lebih ringan.”
