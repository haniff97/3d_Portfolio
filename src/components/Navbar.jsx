import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import profile from '../data/profile.json';
import { BLOG_URL } from '../siteConfig';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <nav className="nav-inner" aria-label="Main navigation">
        <Link className="wordmark" to="/" aria-label="Haniff home">{profile.name}<span>.</span></Link>
        <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
        <div id="main-menu" className={`nav-links ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => isActive || pathname === '/hero' ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/personal-photo">Personal photo</NavLink>
          <a href={BLOG_URL}>Blog <FiArrowUpRight /></a>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink className={({ isActive }) => `resume-link ${isActive ? 'active' : ''}`} to="/resume">Résumé <FiArrowUpRight /></NavLink>
        </div>
      </nav>
    </header>
  );
}
