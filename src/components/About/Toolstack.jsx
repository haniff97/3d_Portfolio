import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiMacos,
} from "react-icons/si";
function Techstack() {
  return (
    <Container>
      <Row className="center tech-row justify-content-center" style={{ paddingBottom: "50px" }}>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiMacos />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiPostman />
      </Col>
      {/* <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiSlack />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiVercel />
      </Col> */}
      </Row>
    </Container>
  );
}

export default Techstack;
