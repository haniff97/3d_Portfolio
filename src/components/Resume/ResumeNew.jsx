import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Make sure to use the correct version for the workerSrc
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;  // or the updated version

function ResumeNew() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pdfFile = "/Haniff-Resume.pdf";

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />

        <Row className="resume">
          <Document
            file={pdfFile}
            className="d-flex justify-content-center"
            onLoadError={(error) => console.error("Error while loading PDF: ", error)}
          >
            <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
        </Row>

      <Row style={{ justifyContent: "center", position: "relative" }}>
      <Button
          variant="primary"
          href="/Haniff-Resume.pdf"  // Ensure this is the correct path
          target="_blank"
          style={{
            maxWidth: "162px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <AiOutlineDownload />
          <span>Download CV</span>
        </Button>
        
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
