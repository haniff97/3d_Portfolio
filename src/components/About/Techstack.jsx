import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import { TbBrandCSharp } from "react-icons/tb";
import { SiExpress, SiFlutter, SiKotlin } from "react-icons/si";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
  DiMysql,
  DiDocker
} from "react-icons/di";
import {
  SiFirebase,
  SiNextdotjs,
  SiSolidity,
  SiPostgresql,
  SiPrometheus,
} from "react-icons/si";

function Techstack() {
  return (
    <Row className="center tech-row text-center justify-content-center" style={{ paddingBottom: "50px" }}>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <TbBrandCSharp />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <CgCPlusPlus />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiJavascript1 />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiNodejs />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiExpress />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiReact />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiSolidity />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiMongodb />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiNextdotjs />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiKotlin />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiFlutter />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiGit />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiFirebase />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiPostgresql />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiPython />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiJava />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiMysql />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <DiDocker />
        </div>
      </Col>
      <Col xs={4} sm={3} md={2} className="mb-3 d-flex justify-content-center">
        <div className="tech-icons">
          <SiPrometheus />
        </div>
      </Col>
    </Row>
  );
}

export default Techstack;
