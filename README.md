# Aidomx React

[![npm version](https://img.shields.io/npm/v/@aidomx/react?color=blue&label=npm)](https://www.npmjs.com/package/@aidomx/react)
[![license](https://img.shields.io/npm/l/@aidomx/react?cacheSeconds=60)](LICENSE)
[![Build status](https://github.com/aidomx/react/actions/workflows/ci.yml/badge.svg)](#)
[![NPM Downloads](https://img.shields.io/npm/dw/%40aidomx%2Freact)](#)

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
  routes: {
    '/': ['box'],
  },
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

# Penggunaan createStore

createStore digunakan untuk mengatur data pada component, mirip dengan useState tetapi tidak, karena `createStore` hanya mengatur data berdasarkan yang ada di component.

## Contoh

```ts
const store = createStore(rules)

store.rupa('products', async (ctx) => {
  // referensi berdasarkan components[products].data
  await ctx.add({ name: 'baju' })

  // ctx.get()
  // ctx.update()
  // ctx.remove()
  // ctx.reset()
})
```

---

# Penggunaan createGhost

createGhost digunakan untuk membuat elemen virtual yang terhubung dengan data yang sudah ada. Ini memungkinkan kita untuk mengatur elemen tanpa mengubah data utama, memberikan lebih banyak fleksibilitas dan efisiensi dalam merender UI.

## Contoh penggunaan createGhost:

```ts
import { createGhost } from '@aidomx/react'

const VirtualBox = createGhost('box', {
  className: 'virtual-box'
})

export default function Home() {
  return (
    <div>
      <VirtualBox />
    </div>
  )
}
```

---

# Routes dan Pengaturan Akses

Dalam Aidomx, pengaturan routes dapat dilakukan di dalam rules untuk membatasi akses dan menentukan bagaimana elemen harus ditangani pada pathname tertentu.

## Struktur routes:

```ts
routes: {
  "/": []
}
```

Di sini, setiap rute dihubungkan dengan path yang sesuai dan daftar komponen yang diizinkan untuk mengaksesnya. Sistem ini memungkinkan pengaturan akses lebih lanjut berdasarkan rute dan data terkait.

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
- [x] createStore untuk memanipulasi data per-komponen.
- [x] createVirtual untuk membuat component.

---

## Kenapa Aidomx?

Aidomx memungkinkan kamu membangun komponen yang fleksibel, dinamis, dan tetap terstruktur — tanpa harus mencampurkan banyak logika di dalam JSX.

Dengan pemisahan aturan berbasis identitas, Aidomx mempermudah scaling antarkomponen dan mengurangi ketergantungan pada className berulang.

## Lisensi

MIT © 2025 [@aidomx](https://github.com/aidomx/react/LICENSE)

---

Aidomx dibuat dan dikembangkan oleh [@aidomx](https://github.com/aidomx)

> “UI yang rapi dan fleksibel bukan soal library besar, tapi cara kita menyusunnya. Aidomx membawanya jadi lebih ringan.”
