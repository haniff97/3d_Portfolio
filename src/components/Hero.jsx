import React from 'react';
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { ComputersCanvas, PWave } from './canvas';
import Typewriter from 'typewriter-effect';


const Hero = () => {

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#5e84ff]" />
          <div className="w-1 sm:h-80 h-40 blue-gradient" />
        </div>
        <div>
          <p className={`${styles.heroSubText} mt-5 text-white-100`}>
            I ✍🏻 stuff
          </p>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Your Friendly <span className="text-[#5e84ff]">Neighborhood</span>
          </h1>
          <div className="typewriter-text">
          <Typewriter
            options={{
              strings: ['Coder', 'Designer', 'Photographer'],
              autoStart: true,
              loop: true,
              delay: 50, // Typing speed
              deleteSpeed: 50, // Deleting speed
            }}
          />
        </div>
          <p className="custom-paragraph mt-2">
            Currently possess extensive experience as a full-stack developer and systems engineer,
            <span className="line-break"> specialising in designing, implementing, and maintaining software solutions.</span><br/>
            <span> Pursues blog-writing as a hobby.</span>
          </p>
        </div>
      </div>
      <PWave />
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href="Info">
          <div className='scroll-arrow'>
          </div>
        </a>
      </div>
    </section>
  );
}

export default Hero;