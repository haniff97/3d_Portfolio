import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import projects from '../data/projects.json';
import { projectImage } from '../data/projectImages';

const featured = ['helmdeck-git-monitor', 'iot-switch'];
const slides = [...projects.filter(project => featured.includes(project.id)).sort((a, b) => featured.indexOf(a.id) - featured.indexOf(b.id)), ...projects.filter(project => !featured.includes(project.id))];
const number = value => String(value).padStart(2, '0');

export default function ProjectCarousel() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const go = index => {
    const element = track.current;
    const card = element.children[index];
    element.scrollTo({ left: card.offsetLeft - element.children[0].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const sync = () => {
    const element = track.current;
    const first = element.children[0].offsetLeft;
    let closest = 0;
    Array.from(element.children).forEach((card, index) => {
      if (Math.abs(card.offsetLeft - first - element.scrollLeft) < Math.abs(element.children[closest].offsetLeft - first - element.scrollLeft)) closest = index;
    });
    setActive(closest);
  };
  if (!slides.length) return null;
  return <section className="selected-section page-width work-carousel" aria-labelledby="selected-work-heading" aria-roledescription="carousel">
    <div className="section-heading"><div><p className="eyebrow">IDEAS INTO PRACTICE</p><h2 id="selected-work-heading">Selected work<span className="accent-dot">.</span></h2></div><Link className="text-link" to="/projects">All projects <FiArrowUpRight /></Link></div>
    <div className="work-carousel-toolbar"><p>Experiments. Systems. Things that work.</p><div className="work-carousel-controls"><span aria-live="polite" aria-atomic="true">{number(active + 1)} <span className="carousel-total">/ {number(slides.length)}</span></span><button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project" aria-controls="work-track"><FiArrowLeft /></button><button type="button" onClick={() => go(active + 1)} disabled={active === slides.length - 1} aria-label="Next project" aria-controls="work-track"><FiArrowRight /></button></div></div>
    <div className="work-track" id="work-track" ref={track} onScroll={sync} tabIndex={0} aria-label="Projects. Swipe or use left and right arrow keys." onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(Math.max(0, Math.min(slides.length - 1, active + (event.key === 'ArrowRight' ? 1 : -1)))); }
    }}>
      {slides.map((project, index) => <article className={`work-slide work-tone-${index % 3}`} key={project.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${project.title}`}>
        <div className="work-preview"><span className="work-index">PROJECT {number(index + 1)}</span><img src={projectImage(project.image)} alt={`${project.title} preview`} loading="lazy" /></div>
        <div className="work-details"><div><h3>{project.title}</h3><p>{project.description}</p></div>{project.demoLink || project.notionLink || project.ghLink ? <a className="work-open" href={project.demoLink || project.notionLink || project.ghLink} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title}`}>Explore <FiArrowUpRight /></a> : <Link className="work-open" to="/projects">View projects <FiArrowUpRight /></Link>}</div>
      </article>)}
    </div>
    <div className="work-progress" aria-hidden="true"><span style={{ width: `${100 / slides.length}%`, transform: `translateX(${active * 100}%)` }} /></div>
  </section>;
}
