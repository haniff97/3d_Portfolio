import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import galleryEditor from './server/galleryEditor.js';
import profileEditor from './server/profileEditor.js';
import projectEditor from './server/projectEditor.js';

export default defineConfig({
  plugins: [react(), projectEditor(), profileEditor(), galleryEditor()],
  server: { proxy: { '/api/chat': 'http://127.0.0.1:3001', '/api/health': 'http://127.0.0.1:3001' } },
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
