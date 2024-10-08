import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas, Works, PWave, Footer } from './components';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Resume from './components/Resume/ResumeNew';
import Info from './components/Info'; // Assuming you have an Info component

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-dark-grey min-h-screen flex flex-col justify-between">
        {/* Navbar Section */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <Hero />
              <Info />
            </div>
          } />
          <Route path="/hero" element={<><Hero /><Info /></>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>

        {/* Footer Section */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;