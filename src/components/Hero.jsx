import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi';
import profile from '../data/profile.json';

export default function Hero() {
  return <section className="editorial-hero page-width">
    <div className="hero-meta"><span>{profile.role}</span><span>{profile.location} · GMT+8</span></div>
    <h1>{profile.headline}<br /><span>{profile.headlineAccent}</span></h1>
    <div className="editorial-intro"><div><p className="hero-intro">{profile.intro}</p><p className="hero-description">{profile.summary}</p></div><div className="button-row"><Link to="/projects" className="button button-dark">Explore my work <FiArrowUpRight /></Link><Link to="/about" className="text-link">About me <FiArrowUpRight /></Link></div></div>
    <div className="hero-bottom"><span>BACKEND / CLOUD / AI INTEGRATION</span><a href="#info">Keep exploring <FiArrowDown /></a></div>
  </section>;
}
