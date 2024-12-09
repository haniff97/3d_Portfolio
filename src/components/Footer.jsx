import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row className="align-items-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Col md="4" className="footer-copywright">
          <p>Haniff Hamdan</p>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons" style={{ display: 'flex', justifyContent: 'flex-end', listStyleType: 'none', padding: 0, margin: 0 }}>
            <li className="social-icons" style={{ margin: '0 10px' }}>
              <a
                href="https://github.com/haniff97"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons" style={{ margin: '0 10px' }}>
              <a
                href="https://x.com/H4nif5"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="social-icons" style={{ margin: '0 10px' }}>
              <a
                href="https://www.linkedin.com/in/haniffhamdan97/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons" style={{ margin: '0 10px' }}>
              <a
                href="https://www.instagram.com/han.1ff/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
