import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import iris from '../assets/iris.png';
import heitech from '../assets/heitech.png';

const Info = () => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <motion.p 
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-24 text-secondary text-[13px] max-w-[90%] mx-auto px-5 lg:ml-10'
        style={{
          wordWrap: 'break-word',
          textAlign: 'center',
        }}
      >
        Hi there! I am currently working as a full-stack developer specializing in Java and C#. <br />
        This project serves as a showcase for my learning journey in React.js and other technologies. <br /> 
        I aim to turn it into a long-term project by continuously updating it with new features and design tweaks.
      </motion.p>
      <motion.div 
        variants={textVariant()}
        className='flex flex-col lg:flex-row justify-between w-full px-5 pt-20 lg:pt-40 lg:absolute'
      >
        <div className='flex flex-col items-start mb-10 lg:mb-0'>
          <p className='text-secondary text-[15px]'>Worked at</p>
          <div className='flex items-center'>
            <img src={iris} alt="IRIS logo" className='w-16 h-16 lg:w-24 lg:h-24 object-contain mr-5' />
            <img src={heitech} alt="Heitech logo" className='w-16 h-16 lg:w-24 lg:h-24 object-contain' />
          </div>
        </div>
        <div className='flex flex-col items-start lg:items-end'>
          <p className='text-secondary lg:mr-[130px] mt-[10px]'>Design</p>
          <div className='text-white text-left lg:text-right' style={{ marginTop: '-20px' }}>
            <p>Figma</p>
            <p>Photoshop</p>
          </div>
          <br/>
          <p className='text-secondary lg:mr-[120px] mt-[10px]'>Programming</p>
          <div className='text-white text-[13px] text-left lg:text-right' style={{ marginTop: '-20px' }}>
            <p>HTML / CSS</p>
            <p>Java</p>
            <p>React.js</p>
            <p>three.js</p>
            <p>node.js</p>
            <p>sql</p>
            <p>C#</p>
            <p>C++</p>
            <p>Kotlin</p>
            <p>swift</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={textVariant()}
        className='w-full flex justify-center items-center mt-10 lg:mt-40 pt-10 lg:pt-60 absolute bottom-0'
      >
        <h2 className="haniff-title text-center">
          Haniff Hamdan
        </h2>
      </motion.div>
    </div>
  );
}

export default Info;
