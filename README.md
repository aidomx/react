# Aidomx React

**Lightweight, reactive, and DOM-first React integration**

**Aidomx React** adalah integrasi React dari library [aidomx](https://github.com/wadahkode/aidomx) — sebuah alat ringan untuk manipulasi DOM yang berfokus pada performa, fleksibilitas, dan kesederhanaan.

Aidomx React memberikan API yang intuitif dan reaktif untuk menghubungkan komponen React dengan behavior DOM secara dinamis, tanpa mengorbankan kontrol penuh terhadap elemen HTML.            

## Fitur Utama

- Integrasi seamless antara React dan DOM melalui aidomx  
- Minimalis dan ringan  
- Cocok untuk framework seperti Next.js, Vite, atau CRA

## Instalasi

```bash
npm install aidomx aidomx-react
```

## Penggunaan

Contoh penggunaan dasar:

```tsx
import { AidomxProvider, defineRules } from 'aidomx-react'

const rules = defineRules({
  // Root element hanya digunakan untuk identitas
  root: 'container',
  // Components dalam bentuk object[]
  components: [
    {
      // name digunakan untuk identitas dari v-ai="brand"
      name: 'brand',
      // className support tailwindcss atau yang lain.
      className: 'font-bold text-4xl',
      // Atau tulis dengan gaya klasik
      // style: {...},
      // Support position
      posAfter: 'identitas',
      postBefore: 'identitas',
      // Event listeners bisa diterapkan disini.
      onClick: () => {
        alert('You click me!')
      },
    },
  ],
  // Semua dukungan pada components bisa digunakan diroot.
  className: 'bg-gray-100',
})

export default function App() {
  return (
    <AidomxProvider value={rules}>
      <div v-ai="container">
        <h1 v-ai="brand">Brand</h1>
      </div>
    </AidomxProvider>
  )
}
```

## Fitur

- Integrasi seamless dengan React Context
- Dukungan SSR-ready
- Kompatibel dengan aidomx DOM hooks
- Dukungan penggunaan tanpa root element secara eksplisit

## Lisensi

MIT © 2025 [@wadahkode](https://github.com/wadahkode)

---

Aidomx dibuat dan dikembangkan oleh [@wadahkode](https://github.com/wadahkode)

> "DOM bisa fleksibel dan reaktif tanpa perlu kompleks. Aidomx menghadirkan itu."


