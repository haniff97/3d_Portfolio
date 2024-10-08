import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Haniff Hamdan </span>
            <br />
            I am currently employed as a software developer.
            <br />
            I have completed Electronic (Computer Systems) Engineering at
            Universiti Malaysia Pahang (UMP).
            <br />
          </p>
          <br/>
          <footer className="blockquote-footer">Haniff</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
