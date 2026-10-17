import { FiArrowUpRight } from 'react-icons/fi';
import profile from '../data/profile.json';
export default function ContactSection() {
  return <section id="contact" className="contact-section page-shell" aria-labelledby="contact-heading">
    <p>{profile.contactIntro}</p>
    <h1 id="contact-heading"><a href={`mailto:${profile.email}`}>{profile.contactTitle} <FiArrowUpRight /></a></h1>
    <div className="contact-bottom"><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a><a className="button button-dark" href="https://www.linkedin.com/in/haniffhamdan97/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <FiArrowUpRight /></a></div>
  </section>;
}
