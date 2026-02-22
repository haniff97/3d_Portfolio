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
    <Row className="center tech-row justify-content-center" style={{ paddingBottom: "50px" }}>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiMacos />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiVisualstudiocode />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiPostman />
        </div>
      </Col>
      {/* <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiSlack />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiVercel />
        </div>
      </Col> */}
    </Row>
  );
}

export default Techstack;
