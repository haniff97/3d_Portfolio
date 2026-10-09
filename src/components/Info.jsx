import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import iris from '../assets/iris.png';
import heitech from '../assets/heitech.png';
import helmdeck from '../assets/Projects/helmdeck.jpeg';
import iot from '../assets/Projects/iot.jpeg';

export default function Info() {
  return <>
    <section id="info" className="intro-section page-width">
      <div><p className="eyebrow">A BUILDER AT HEART</p><h2>Curiosity drives the work.<br /><span>Care shapes the details.</span></h2></div>
      <div><p>I’m a software engineer with 3+ years of enterprise application experience using Java/Spring Boot and C#/.NET. At HeiTech Padu, I build backend services and modernize government systems. Outside work, I explore AWS, self-hosted infrastructure, and AI monitoring tools that keep people in control.</p><div className="experience-logos"><span>EXPERIENCE WITH</span><img src={iris} alt="IRIS" /><img src={heitech} alt="HeiTech" /></div></div>
    </section>
    <section className="selected-section page-width"><div className="section-heading"><div><p className="eyebrow">IDEAS INTO PRACTICE</p><h2>Selected work<span className="accent-dot">.</span></h2></div><Link className="text-link" to="/projects">All projects <FiArrowUpRight /></Link></div>
      <div className="selected-grid">
        <Link to="/projects" className="selected-card"><div className="selected-image"><img src={helmdeck} alt="HelmDeck Git Monitor interface" loading="lazy" /></div><div className="selected-caption"><div><p>DEVELOPER TOOLS</p><h3>HelmDeck Git Monitor</h3></div><FiArrowUpRight /></div></Link>
        <Link to="/projects" className="selected-card"><div className="selected-image"><img src={iot} alt="IoT switch project" loading="lazy" /></div><div className="selected-caption"><div><p>CONNECTED SYSTEMS</p><h3>IoT Switch</h3></div><FiArrowUpRight /></div></Link>
      </div>
    </section>
  </>;
}
