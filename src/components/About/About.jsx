import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import laptopImg from "/src/assets/about.png"; // Adjust the path as needed

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={laptopImg}
              isBlog={false}
              title="Project Title"
              description="Project Description"
              link="#"
            />
          </Col>
          {/* Add more <Col> elements with <ProjectCard> components as needed */}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
