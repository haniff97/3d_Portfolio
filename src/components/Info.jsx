import ProfilePortrait from './ProfilePortrait';
import profile from '../data/profile.json';
import iris from '../assets/iris.png';
import heitech from '../assets/heitech.png';
import ProjectCarousel from './ProjectCarousel';

export default function Info() {
  return <>
    <section id="info" className="intro-section page-width">
      <div><ProfilePortrait /><p className="eyebrow">A BUILDER AT HEART</p><h2>Curiosity drives the work.<br /><span>Care shapes the details.</span></h2></div>
      <div><p>{profile.homeAbout}</p><div className="experience-logos"><span>EXPERIENCE WITH</span><img src={iris} alt="IRIS" /><img src={heitech} alt="HeiTech" /></div></div>
    </section>
    <ProjectCarousel />
  </>;
}
