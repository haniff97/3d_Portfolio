import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { BLOG_URL } from '../../siteConfig';

const toolkit = [
  ['Software engineering', ['Java / Spring Boot', 'C# / .NET / ASP.NET', 'Python / FastAPI', 'PHP / Laravel', 'JavaScript / TypeScript', 'React / Vue', 'Node.js / NestJS', 'REST APIs']],
  ['Cloud & infrastructure', ['AWS', 'Google Cloud', 'Terraform', 'Docker', 'Kubernetes / K3s', 'Helm', 'GitHub Actions', 'Linux / NGINX']],
  ['Data, observability & AI', ['PostgreSQL', 'MySQL / MariaDB', 'DB2', 'DynamoDB', 'Prometheus / Grafana', 'Loki / CloudWatch', 'MQTT / IoT', 'DeepSeek / Gemini APIs', 'Human-in-the-loop automation']],
];
const experience = [
  { date: 'Sep 2023 – Present', role: 'Full-Stack Developer', company: 'HeiTech Padu Bhd', description: 'Build and maintain Java/Spring Boot services for JPJ vehicle registration and licensing workflows, optimize DB2 queries, and develop API integration tests. For the KPDRM revamp, modernized legacy components with C#/.NET and REST APIs, improved data retrieval time by approximately 30%, and contributed to a 20% reduction in production defects through UAT.' },
  { date: 'Jun 2023 – Sep 2023', role: 'System Developer', company: 'IRIS Corporation Bhd · NIISE', description: 'Engineered C# and ASP.NET APIs for real-time biometric data, integrated hardware authentication with web applications, and re-engineered immigration modules for scalability and maintainability.' },
  { date: 'Jul 2022 – Jan 2023', role: 'Software Developer Intern', company: 'Bravonet Sdn Bhd', description: 'Developed responsive web interfaces using JavaScript, Bootstrap, and CSS, and supported CI/CD build, test, and deployment workflows.' },
];

export default function About() {
  return <section className="page-shell">
    <p className="eyebrow">BEHIND THE WORK · PUTRAJAYA, MALAYSIA</p>
    <h1>A software engineer.<br /><span>Curious beyond the code.</span></h1>
    <div className="about-grid">
      <div className="about-prose">
        <h2>Hi, I’m Haniff Hamdan.</h2>
        <p>I’m a software engineer with 3+ years of enterprise application development experience, building backend and web systems with Java/Spring Boot and C#/.NET. My work spans REST APIs, database optimization, integration testing, and software delivery.</p>
        <p>Outside my enterprise work, I build and operate cloud and containerized systems using AWS, GCP, Terraform, Docker, and K3s. My homelab is where I explore observability, connected devices, and the practical details of running applications.</p>
        <p>I’m especially interested in cloud-native web applications that use AI for monitoring, operational insights, and controlled automation. My infrastructure monitoring agent combines live telemetry with LLM APIs, with human approval before infrastructure actions execute.</p>
        <div className="button-row"><Link to="/resume" className="button button-dark">View résumé <FiArrowUpRight /></Link><a href={BLOG_URL} className="text-link">Read my blog <FiArrowUpRight /></a></div>
      </div>
      <aside className="about-note"><p className="eyebrow">WHAT I’M BUILDING</p><h2>Reliable systems.<br />Useful intelligence.<br />People in control.</h2><p>From HelmDeck, my internal homelab platform, to an edge-to-cloud IoT pipeline and a human-in-the-loop monitoring agent: independent projects that turn ideas into working systems.</p><Link to="/projects" className="text-link">Explore the projects <FiArrowUpRight /></Link></aside>
    </div>
    <section className="career-section" aria-labelledby="experience-heading"><p className="eyebrow">THE JOURNEY SO FAR</p><h2 id="experience-heading">Experience</h2><div className="career-list">{experience.map(job => <article className="career-item" key={job.company}><time>{job.date}</time><div><h3>{job.role}</h3><p className="company">{job.company}</p><p>{job.description}</p></div></article>)}</div></section>
    <section className="skills-section" aria-labelledby="skills-heading"><p className="eyebrow">THE TOOLKIT</p><h2 id="skills-heading">Technologies I work with</h2>{toolkit.map(([category, skills]) => <div key={category}><h3>{category}</h3><div className="skill-tags">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</section>
    <div className="credentials-grid"><section><h3>Education</h3><p><strong>Bachelor of Engineering Technology, Electronic (Computer System)</strong><br />Universiti Malaysia Pahang · 2019–2023</p><p><strong>Diploma, Electronic Engineering (Communication System)</strong><br />Politeknik Kota Bharu · 2015–2018</p></section><section><h3>Certifications</h3><ul><li>AWS Certified Cloud Practitioner (CLF-C02)</li><li>AWS re/Start Graduate</li><li>DevOps Foundation Certification</li><li>JavaScript Algorithms and Data Structures</li></ul></section></div>
  </section>;
}
