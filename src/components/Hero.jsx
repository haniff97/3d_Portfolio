import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi';
import LakeShimmer from './LakeShimmer';
import putrajaya from '../assets/putrajaya-hero.jpeg';

export default function Hero() {
  return <section className="hero landscape-hero">
    <img className="landscape-background" src={putrajaya} alt="Putrajaya architecture and greenery beside the lake" />
    <div className="landscape-wash" aria-hidden="true" />
    <LakeShimmer />
    <div className="landscape-content page-width">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER · BACKEND · CLOUD · AI</p>
      <h1>Thoughtful code.<br /><span>Useful things.</span></h1>
      <p className="hero-intro">Hi, I’m Haniff. A software engineer based in Putrajaya.</p>
      <p className="hero-description">I build backend and web systems with Java and C#, and explore cloud infrastructure and AI-powered automation. Three years of enterprise engineering, and always more to learn.</p>
      <div className="button-row"><Link to="/projects" className="button button-dark">Explore my work <FiArrowUpRight /></Link><Link to="/about" className="text-link">A little about me <FiArrowUpRight /></Link></div>
    </div>
    <div className="hero-bottom"><span>PUTRAJAYA, MALAYSIA · A LITTLE PERSPECTIVE</span><a href="#info">Keep exploring <FiArrowDown /></a></div>
    </div>
  </section>;
}
