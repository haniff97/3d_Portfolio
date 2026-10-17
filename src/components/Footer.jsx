import { Link } from 'react-router-dom';
import profile from '../data/profile.json';
import { FiArrowUpRight } from 'react-icons/fi';
export default function Footer() {
  return <footer className="site-footer page-width"><div><a className="wordmark" href="/">{profile.name}<span>.</span></a><p>Always learning. Always building.</p>{import.meta.env.DEV && <div className="local-tools"><Link to="/manage-profile">Edit profile & photo</Link><Link to="/manage-projects">Manage projects</Link><Link to="/manage-photos">Manage photos</Link></div>}</div><div className="footer-right"><div className="footer-links"><a href="https://github.com/haniff97" target="_blank" rel="noopener noreferrer">GitHub <FiArrowUpRight /></a><a href="https://www.linkedin.com/in/haniffhamdan97/" target="_blank" rel="noopener noreferrer">LinkedIn <FiArrowUpRight /></a><a href="https://x.com/H4nif5" target="_blank" rel="noopener noreferrer">X <FiArrowUpRight /></a><a href="https://www.instagram.com/han.1ff/" target="_blank" rel="noopener noreferrer">Instagram <FiArrowUpRight /></a></div><p>© {new Date().getFullYear()} {profile.name}</p></div></footer>;
}
