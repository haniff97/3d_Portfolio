import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCards';
import projects from '../../data/projects.json';
import { projectImage } from '../../data/projectImages';

export default function Projects() {
  return <Container fluid className="project-section">
    <Container>
      <h1 className="project-heading">Things I’ve built<span className="accent-dot">.</span></h1>
      <p className="text-secondary">A collection of experiments, useful tools, and lessons learned along the way.</p>
      {import.meta.env.DEV && <Link className="button button-dark" to="/manage-projects">Manage projects</Link>}
      <Row>
        {projects.map(project => <Col key={project.id} xs={12} sm={6} md={4} className="project-card">
          <ProjectCard {...project} imgPath={projectImage(project.image)} />
        </Col>)}
      </Row>
    </Container>
  </Container>;
}
