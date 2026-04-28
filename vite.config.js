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
