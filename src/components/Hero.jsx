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
          <div className="w-1 sm:h-80 h-40 bg-[#5e84ff]" />
        </div>
        <div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${styles.heroSubText} hero-sub-text mt-5 text-white-100`}
          >
            I ✍🏻 stuff
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${styles.heroHeadText} hero-head-text text-white`}
          >
            Your Friendly <span className="text-[#5e84ff]">Neighborhood</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="typewriter-text"
          >
            <Typewriter
              options={{
                strings: [
                  'Full-Stack Developer',
                  'Systems Engineer', 
                  'Mobile Developer',
                  'UI/UX Designer',
                  'Problem Solver'
                ],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
                cursor: '|',
              }}
            />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="custom-paragraph mt-4 max-w-2xl"
          >
            Currently possess extensive experience as a full-stack developer and systems engineer,
            <span className="line-break"> specialising in designing, implementing, and maintaining software solutions.</span><br/>
            <span> Pursues blog-writing as a hobby.</span>
          </motion.p>
          
          {/* Call to Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 mt-6 hero-buttons"
          >
            <a href="/projects" className="px-6 py-3 bg-[#5e84ff] text-white rounded-lg hover:bg-[#4a6fd8] transition-colors duration-300">
              View Projects
            </a>
            <a href="/about" className="px-6 py-3 border border-[#5e84ff] text-[#5e84ff] rounded-lg hover:bg-[#5e84ff] hover:text-white transition-all duration-300">
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
      <PWave />
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <motion.a 
          href="#info"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className='scroll-arrow'>
          </div>
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;