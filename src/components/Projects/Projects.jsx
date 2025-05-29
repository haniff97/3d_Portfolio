import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import myCoffee from '../../assets/Projects/myCoffee.png';
import Robot from "../../assets/Projects/Robot.png";
import ecommerce from "../../assets/Projects/ecommerce.png";
import Figma from "../../assets/Projects/Figma.png";
import iOS from "../../assets/Projects/iOS.png";
import Android from "../../assets/Projects/Android.png";
// import suicide from "../../assets/Projects/suicide.png";
// import bitsOfCode from "../../assets/Projects/blog.png";
import 'bootstrap/dist/css/bootstrap.min.css';

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white", textAlign: "center" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={myCoffee}
              isBlog={false}
              title="Ins"
              description="Personal Chat Room or Workspace to share resources and hangout with friends build with react.js, Material-UI, and Firebase. Have features which allows user for realtime messaging, image sharing as well as supports reactions on messages."
              ghLink="https://github.com/haniff97/GPS-and-GSM-with-thingsboard.git"
              demoLink="https://chatify-49.web.app/"
            />
          </Col> */}

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Robot}
              isBlog={false}
              title="Inspection Robot"
              description="This is my FYP project which is building a 'Inspection Pipe Robot'. The robot can expand and shrink automaticly using obsorber from rc car. Its feature a gps, camera with 6 led, and timing belt to better griped in pipe. The whole body is fabricated using 3D print.."
              ghLink="https://github.com/haniff97/GPS-and-GSM-with-thingsboard.git"
              // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ecommerce}
              isBlog={false}
              title="E-Commerce"
              description="While building it, i learned about xampp and wordpress plug in for e-commerce applications. Such as woocommerce, domain, and the tool for ui design."
              // ghLink="https://github.com/soumyajit4419/Editor.io"
              // demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Figma}
              isBlog={false}
              title="Figma Design"
              description="This project is to understand and simplyfly NFT market app. Inspired by 'Opensea' website and dark mood feature trend. The UI is easy for new people to try enter in NFT world."
              // ghLink="https://github.com/soumyajit4419/Plant_AI"
              // demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

            <Col md={4} className="project-card">
            <ProjectCard
              imgPath={iOS}
              isBlog={false}
              title="iOS Project"
              description="A showcase of iOS applications built with Swift, featuring clean UI/UX, local database integration, and responsive design. Developed as part of my journey to become a mobile developer."
              notionLink="https://www.notion.so/iOS-Project-1fb4bc74dab480a5bf4ada90211d0ba8"
              // demoLink="https://blogs.soumya-jit.tech/"     
            />
          </Col> 

            <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Android}
              isBlog={false}
              title="Android Project"
              description="A set of Android applications developed during my journey into mobile development, showcasing UI design, local data handling, and modern Android practices"
              notionLink="https://www.notion.so/Android-Project-1ff4bc74dab480369ccaefd33e7bca46?pvs=4"
              // demoLink="https://blogs.soumya-jit.tech/"     
            />
          </Col>

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="AI For Social Good"
              description="Using 'Natural Language Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace and thus helping in suicide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" 
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using the 'FER-2013 dataset' with Keras and TensorFlow backend. The classifier successfully predicted various types of emotions of humans. The highest accuracy obtained with the model was 60.1%. Then used OpenCV to detect the face in an image and then pass the face to the classifier to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"     
            />
          </Col> */}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
