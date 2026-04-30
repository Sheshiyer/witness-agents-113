import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  publicDir: 'public',
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: new URL('./index.html', import.meta.url).pathname,
        reading: new URL('./reading.html', import.meta.url).pathname
      },
      output: {
        manualChunks: {
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/Flip', 'gsap/CustomEase'],
          lenis: ['lenis']
        }
      }
    }
  },
  server: {
    port: 5113,
    strictPort: false,
    open: false
  },
  preview: {
    port: 5113
  }
});
