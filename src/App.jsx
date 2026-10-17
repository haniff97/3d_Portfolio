import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const ProjectEditor = import.meta.env.DEV ? lazy(() => import('./components/Projects/ProjectEditor')) : null;
const ProfileEditor = import.meta.env.DEV ? lazy(() => import('./components/ProfileEditor')) : null;
const GalleryEditor = import.meta.env.DEV ? lazy(() => import('./components/GalleryEditor')) : null;
import RibbonBackground from './components/RibbonBackground';
import PersonalPhoto from './components/PersonalPhoto';
import ContactSection from './components/ContactSection';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Info from './components/Info';
import Footer from './components/Footer';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Resume from './components/Resume/ResumeNew';

export default function App() {
  return <BrowserRouter>
    <RibbonBackground />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <main id="main-content">
      <Routes>
        {import.meta.env.DEV && <Route path="/manage-photos" element={<Suspense fallback={<p className="page-shell">Loading gallery…</p>}><GalleryEditor /></Suspense>} />}
        {import.meta.env.DEV && <Route path="/manage-profile" element={<Suspense fallback={<p className="page-shell">Loading editor…</p>}><ProfileEditor /></Suspense>} />}
        {import.meta.env.DEV && <Route path="/manage-projects" element={<Suspense fallback={<p className="page-shell">Loading editor…</p>}><ProjectEditor /></Suspense>} />}
        <Route path="/" element={<><Hero /><Info /></>} />
        <Route path="/hero" element={<><Hero /><Info /></>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/personal-photo" element={<PersonalPhoto />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<section className="page-shell"><p className="eyebrow">404</p><h1>Nothing here just yet.</h1><Link className="button button-dark" to="/">Back to home</Link></section>} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>;
}
