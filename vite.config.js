import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    // Target modern browsers for smaller, faster output
    target: 'esnext',

    // Raise chunk size warning threshold (suppress noisy warnings)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Manual chunk splitting: isolates large libraries so they are cached independently
        manualChunks(id) {
          // Animation libraries
          if (id.includes('framer-motion')) return 'vendor-framer';
          if (id.includes('gsap') || id.includes('@studio-freight/lenis')) return 'vendor-gsap';
          // UI icons
          if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons';
          // React ecosystem
          if (id.includes('react-router') || id.includes('react-dom')) return 'vendor-react';
          // Data fetching
          if (id.includes('@tanstack') || id.includes('axios')) return 'vendor-data';
        },
      },
    },

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Minify with oxc (Vite 8 native, fastest)
    minify: 'oxc',

    // Source maps only in development
    sourcemap: false,
  },

  // Optimize dev server
  server: {
    warmup: {
      clientFiles: [
        './src/main.jsx',
        './src/App.jsx',
        './src/components/Navbar.jsx',
        './src/components/Hero.jsx',
        './src/pages/Home.jsx',
      ],
    },
  },

  // Pre-bundle heavy dependencies to avoid waterfalling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'axios',
      'framer-motion',
      'gsap',
      '@studio-freight/lenis',
      'lucide-react',
    ],
    // Prevent double-bundling
    exclude: [],
  },
});
