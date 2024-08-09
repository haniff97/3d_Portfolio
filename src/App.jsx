import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Info, Contact, Experience, Feedbacks, Hero, Navbar, Tech, StarsCanvas, Works, PWave, Footer } from './components';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Resume from './components/Resume/ResumeNew';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary min-h-screen flex flex-col justify-between">
        {/* Hero Section */}
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
          <Info />
        </div>
        
        {/* Routes Section */}
        <Routes>
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
