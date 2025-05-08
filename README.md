# Aidomx React

[![npm version](https://img.shields.io/npm/v/@aidomx/react?color=blue&label=npm)](https://www.npmjs.com/package/@aidomx/react)
[![license](https://img.shields.io/npm/l/@aidomx/react?cacheSeconds=60)](LICENSE)
[![Build status](https://github.com/aidomx/react/actions/workflows/ci.yml/badge.svg)](#)
[![NPM Downloads](https://img.shields.io/npm/dw/%40aidomx%2Freact)](#)

**Reactive UI powered by identity, logic rules, and dynamic scope**

---

## Apa itu Aidomx?

**@aidomx/react** adalah integrasi React untuk sistem berbasis logika dan identitas dari `@aidomx/core`. Ini memungkinkan kamu membangun UI yang sangat dinamis, modular, dan terpisah dari logika melalui _rule-driven rendering_.

---

## Perubahan Terbaru

- Semua logika kini dikelola oleh `@aidomx/core`
- Komponen `Aidomx` bertanggung jawab merender UI berdasarkan scope dan rules
- Dukungan penuh terhadap `Next.js 15` dan `React 19`

---

## Instalasi

```bash
npm install @aidomx/react
```

> Pastikan @aidomx/core sudah tersedia secara lokal atau sebagai dependency.

---

### Contoh Penggunaan

1. `src/rules/index.ts`

```ts
import { defineConfig } from '@aidomx/core'
import { dashboard } from './dashboard'
import * as TestHandler from './core/test'

export const rules = defineConfig({
  define: {
    root: 'container',
    components: { dashboard },
    design: {
      type: 'div',
      className: 'p-4 w-full h-screen',
    },
    skeleton: {
      name: 'container',
      className:
        'flex flex-col gap-3 items-center justify-center h-[100vh] text-lg',
      status: true,
      delay: 150,
      content: 'Preparing ghost components...',
    },
  },
  use: {
    name: 'refreshButton',
    maps: [TestHandler],
  },
  autoCompile: true,
  devMode: false,
})
```

Sekarang hot reload tidak lagi menjadi masalah dalam sistem berbasis rules. Berikut penjelasan dari masing-masing opsi dalam `defineConfig`:

- **define**
  Digunakan untuk mendefinisikan komponen. `root` dan `components` adalah properti wajib.

- **use**
  Memberikan fleksibilitas untuk menambahkan event handler eksternal.

- **autoCompile**
  Secara default bernilai `true`. Jika disetel ke `false`, kamu dapat melakukan perbaikan atau pengujian manual. Saat ini belum mendukung mode maintenance otomatis, tetapi bisa saja hadir di versi mendatang jika `autoCompile` = `false`.

- **devMode**
  Fitur yang sangat berguna untuk pengembang karena membuka akses penuh ke seluruh fitur `defineConfig`.

- **clone**
  Melakukan cloning terhadap komponen berdasarkan `id`, contoh: `clone: "title"`.

- **spawn**
  Membuat beberapa komponen secara dinamis. Contoh:

```ts
spawn: {
  id: "buttonGroups",
  config: {
    count: 5,
    design: {
      type: 'button',
    },
    randomId: false,
    contents: ['one', 'two', 'three', 'four', 'five'],
    map(el, index) {
      return {
        ...el,
        design: {
          ...el.design,
          className: index === 0 ? 'btn-blue-500' : 'btn-green-500',
        },
      }
    }
  }
}
```

- **connect**
  Setiap komponen memiliki `components[name].data`, yang bisa kamu kontrol melalui fungsi ini. Contoh:

```ts
connect: (rupa) => {
  rupa('test', async (db) => {
    await db.add({ name: 'Alex' })
  })
},
```

`connect` menggunakan format `rupa(id, callback)`, di mana `id` adalah nama komponen dan `callback` memberikan akses ke fungsi `add`, `update`, `remove`, `get`, dan `reset`.

## Contoh penggunaan rupa

```ts
rupa("test", async (db) => {
  await db.add([{ name: 'Alex' }, { name: 'Bob' }])
  // Ganti Alex menjadi Joe
  await db.update('test.1', () => {
    return {
      name: 'Joe',
    }
  })

  await db.remove('test.2') // hapus Bob
  await db.reset() // reset
  await db.get() // Mengambil semua data tanpa filter
  awaif db.get({
    select: {
      name: true
    }
  }) // Mengambil data dengan filter
})
```

- **remove**
  Menghapus komponen tertentu berdasarkan namanya. Contoh: `remove: "test"`

- **sort**
  Mengatur ulang urutan komponen. Contoh:

```ts
sort: {
  from: "title",
  to: "description"
}
```

2. src/rules/core/test.ts

```ts
import type { RuleEvent } from '@aidomx/core'

export const onClick = (event: RuleEvent) => {
  // console.log(event)
  alert('Hai, Aidomx!!!')
}
```

3. src/rules/components/dashboard.ts

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

---

4. src/app/about/About.tsx

```tsx
'use client'

import { Aidomx } from '@aidomx/react'
import dashboard from '@/rules/components/dashboard'

export default function About() {
  return <Aidomx name="container" scope={['title']} />
}
```

`<Aidomx name="container" scope={["title"]} />` hanya satu baris kode, tetapi mampu menghasilkan banyak komponen.

- `name` mengacu pada root utama yang telah didefinisikan di defineConfig.

- `scope` berupa array yang berfungsi sebagai filter untuk menentukan komponen mana yang akan ditampilkan.

## Contohnya:

Halaman Home dan About tentu menampilkan konten berbeda.

Semua komponen didefinisikan secara global melalui defineConfig.

Kemudian scope menyaring dan menampilkan hanya komponen yang relevan untuk halaman tertentu.

Pendekatan ini akan sangat berguna saat proyek mulai berkembang dan membutuhkan halaman seperti register, login, atau dashboard.

---

5. Provider Integrasi

```tsx
// src/app/providers.tsx
'use client'

import { ReactNode } from 'react'
import { rules } from '../rules'
import { AidomxProvider } from '@aidomx/react'

export function Providers({ children }: { children: ReactNode }) {
  return <AidomxProvider value={rules}>{children}</AidomxProvider>
}
```

```tsx
// src/app/layout.tsx
import './globals.css'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

---

# Arsitektur & Integrasi

Aidomx terdiri dari dua bagian utama:

- @aidomx/core – bertanggung jawab atas definisi aturan, struktur, dan logika UI secara terpusat.

- @aidomx/react – bertugas untuk merender dan mengintegrasikan UI ke dalam aplikasi React.

---

# Rules secret key intregasi

Pastikan menambahkan `RULES_SECRET_KEY` ke dalam file .env atau .env.local, terutama jika halaman tampak kosong (blank) meskipun konfigurasi dirasa sudah benar.

Aidomx secara bawaan menyediakan nilai default untuk menghindari halaman kosong, tetapi lebih baik jika kamu menetapkan sendiri.

```bash
# .env or .env.local
RULES_SECRET_KEY="secret"
```

---

# Roadmap

[x] Pemisahan antara core dan react

[x] Dukungan scope dan data dinamis

[x] Skeleton loading bawaan

[ ] Plugin resmi untuk Svelte, Vue, Solid

---

# Lisensi

MIT © 2025 @aidomx

---

> Dibuat untuk mendorong pemisahan logika dan tampilan secara eksplisit — scalable, predictable, composable.
