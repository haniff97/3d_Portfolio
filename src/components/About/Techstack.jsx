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
  DiMysql
} from "react-icons/di";
import {
  SiRedis,
  SiFirebase,
  SiNextdotjs,
  SiSolidity,
  SiPostgresql,
} from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";

function Techstack() {
  return (
    <Row className="center tech-row text-center justify-content-center" style={{ paddingBottom: "50px" }}>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <TbBrandCSharp />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <CgCPlusPlus />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <DiJavascript1 />
      </Col>
      {/* <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <TbBrandGolang />
      </Col> */}
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <DiNodejs />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiExpress />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <DiReact />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiSolidity />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <DiMongodb />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiNextdotjs />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiKotlin />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiFlutter />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <DiGit />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiFirebase />
      </Col>
      {/* <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiRedis />
      </Col> */}
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <SiPostgresql />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <DiPython />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <DiJava />
      </Col>
      <Col xs={4} sm={3} md={2} className="tech-icons mb-3">
        <DiMysql />
      </Col>
    </Row>
  );
}

export default Techstack;
