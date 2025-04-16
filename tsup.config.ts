import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'es2020',
  outDir: 'dist',
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  shims: true,
  external: ['react', 'react-dom'],
})
