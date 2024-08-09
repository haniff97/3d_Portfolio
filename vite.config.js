import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@react-three/fiber',
      '@react-three/drei',
      'maath',
      'react-tilt',
      'react-vertical-timeline-component',
      '@emailjs/browser',
      'framer-motion',
      'react-router-dom'
    ],
  },
});
