import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import projectEditor from './server/projectEditor.js';

export default defineConfig({
  plugins: [react(), projectEditor()],
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
