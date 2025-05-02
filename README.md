# Aidomx React

[![npm version](https://img.shields.io/npm/v/@aidomx/react?color=blue&label=npm)](https://www.npmjs.com/package/@aidomx/react)
[![license](https://img.shields.io/npm/l/@aidomx/react?cacheSeconds=60)](LICENSE)
[![Build status](https://github.com/aidomx/react/actions/workflows/ci.yml/badge.svg)](#)
[![NPM Downloads](https://img.shields.io/npm/dw/%40aidomx%2Freact)](#)

<<<<<<< HEAD
**Lightweight, reactive, and identity-driven React integration**

**Aidomx React** adalah integrasi untuk framework [aidomx](https://github.com/aidomx/aidomx) — pendekatan ringan dan modular untuk menerapkan struktur, gaya, dan interaksi secara deklaratif berbasis identitas komponen.

---

## Fitur Utama

- Penulisan UI berbasis identitas (`vAi`) untuk struktur dan perilaku yang bersih
- Integrasi ringan dan kontekstual melalui React Context
- Dapat digunakan di Next.js, Vite, CRA, dan lainnya
- Minim boilerplate dan sangat fleksibel untuk sistem desain yang kompleks
=======
**Reactive UI powered by identity, logic rules, and dynamic scope**

---

## Apa itu Aidomx?

**@aidomx/react** adalah integrasi React untuk sistem berbasis logika dan identitas dari `@aidomx/core`. Ini memungkinkan kamu membangun UI yang sangat dinamis, modular, dan terpisah dari logika melalui _rule-driven rendering_.

---

## Perubahan Terbaru

- Semua logika kini dikelola oleh `@aidomx/core`
- Komponen `Aidomx` bertanggung jawab merender UI berdasarkan scope dan rules
- Dukungan penuh terhadap `Next.js 15` dan `React 19`
>>>>>>> 97c6176 (big refactor for prepare production)

---

## Instalasi

```bash
npm install @aidomx/react
```

<<<<<<< HEAD
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
=======
> Pastikan @aidomx/core sudah tersedia secara lokal atau sebagai dependency.

---

# Contoh Penggunaan

1. src/rules/index.ts

```ts
import { defineRules } from '@aidomx/core'

export const rules = defineRules({
  root: 'container',
  debug: true,
  components: [],
  routes: {
    // Daftar components
    '/': ['dashboard'],
  },
  skeleton: {
    name: 'container',
    status: true,
    delay: 200,
    content: 'Preparing ghost components...',
  },
})
```

2. src/rules/components/dashboard.ts

```ts
import type { RuleComponent } from '@aidomx/core'

const dashboard: RuleComponent[] = [
  {
    name: 'title',
    design: {
      type: 'h2',
      className: 'text-2xl font-semibold mb-2',
      content: 'Dashboard Overview',
    },
  },
  {
    name: 'refreshButton',
    design: {
      type: 'button',
      className: 'bg-green-500 p-2 text-white rounded',
      content: 'Refresh',
    },
    listeners: {
      onClick: () => {
        alert('Data refreshed!')
      },
    },
  },
  {
    name: 'stats',
    design: {
      type: 'div',
      className: 'grid grid-cols-2 gap-4',
    },
    scope: [
      {
        name: 'usersCard',
        design: {
          type: 'div',
          className: 'p-4 bg-white shadow rounded',
          content: 'Users: 1240',
        },
      },
      {
        name: 'ordersCard',
        design: {
          type: 'div',
          className: 'p-4 bg-white shadow rounded',
          content: 'Orders: 312',
        },
      },
    ],
  },
]

export default dashboard
```

3. src/app/about/About.tsx

```ts
'use client'

import { Aidomx } from '@/providers/Aidomx'
import dashboard from '@/rules/components/dashboard'
import { useEffect, useRef, useState } from 'react'

export default function About() {
  const start = useRef(performance.now())
  const [renderTime, setRenderTime] = useState('')
  const [interactTime, setInteractTime] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const end = performance.now()
    setRenderTime((end - start.current).toFixed(2) + 'ms')

    const interactStart = performance.now()
    const interactEnd = performance.now()
    setInteractTime((interactEnd - interactStart).toFixed(2) + 'ms')

    setMounted(true)
  }, [])

  if (!mounted) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-4 text-gray-500">
        <div>Waktu render: {renderTime}</div>
        <div>Waktu interaksi: {interactTime}</div>
      </div>
      <Aidomx name="container" scope={{ dashboard }} />
    </div>
>>>>>>> 97c6176 (big refactor for prepare production)
  )
}
```

---

<<<<<<< HEAD
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
import { createVirtual } from '@aidomx/react'

const vr = createVirtual(rules)

vr.createGhost('box', {
 entries: [
    {
      name: 'products',
      tag: 'ol',
      children: [
        {
          tag: 'li',
          text: 'Baju lebaran',
        },
      ],
    },
 ],
 autoCompile: true
})
```
`createGhost` akan secara otomatis menulis di `rules`, ini cukup meringankan beban menulis html.

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
=======
# Arsitektur & Integrasi

Aidomx terdiri dari dua bagian utama:

- @aidomx/core – mendefinisikan aturan, struktur, logika, dan pemetaan UI

- @aidomx/react – merender dan mengintegrasikan UI dalam ekosistem React

# Fleksibilitas

- Gunakan AidomxProvider jika ingin memberikan fleksibilitas penamaan dan kontrol context.

### example

```ts
import './globals.css'
import { AidomxProvider } from '@/providers'
import { rules } from '@/rules'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className="">
        <AidomxProvider value={rules}>{children}</AidomxProvider>
      </body>
    </html>
  )
}
```

---

# Roadmap

[x] Pemisahan antara core dan react

[x] Dukungan scope dan data dinamis

[x] Skeleton loading bawaan

[ ] Dukungan async rule injection

[ ] Plugin resmi untuk Svelte, Vue, Solid

---

# Lisensi

MIT © 2025 @aidomx

---

> Dibuat untuk mendorong pemisahan logika dan tampilan secara eksplisit — scalable, predictable, composable.
>>>>>>> 97c6176 (big refactor for prepare production)
