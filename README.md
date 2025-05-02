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

# Contoh Penggunaan

1. src/rules/index.ts

```ts
import { defineRules } from '@aidomx/core'

export const rules = defineRules({
  root: 'container',
  components: [],
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
  )
}
```

---

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
